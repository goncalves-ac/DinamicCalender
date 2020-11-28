package com.example.demo.model.controllers;

import com.example.demo.dto.AuthSsoDTO;
import com.example.demo.dto.UsuarioResponseDTO;
import com.example.demo.model.entities.JwtResponse;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;
import com.example.demo.services.AuthSsoService;
import com.example.demo.services.JwtUserDetailsService;
import com.example.demo.services.UserService;
import com.example.demo.utils.JwtCookieUtil;
import com.example.demo.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "sso")
public class AuthSSOController {
    @Autowired
    AuthSsoService authSsoService;

    @Autowired
    UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping()
    public ResponseEntity<?> authSso(@RequestBody AuthSsoDTO authSsoDTO) throws Exception{
        Usuario usuario = findSsoUser(authSsoDTO);

        //Usuário precisa ser cadastrado
        if(usuario == null){
            return ResponseEntity.noContent()
                    .header(HttpHeaders.SET_COOKIE, JwtCookieUtil.clearCookieForToken())
                    .build();

        // Usuário encontrado
        }else{
            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(usuario.getEmail());
            final String token = jwtTokenUtil.generateToken(userDetails);
            final Usuario userInfo = userDetailsService.loadUserByUserDetail(userDetails);
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, JwtCookieUtil.getCookieForToken(token))
                    .body(new JwtResponse(new UsuarioResponseDTO(userInfo),
                            jwtTokenUtil.getExpirationDateFromToken(token)));
        }

    }

    private Usuario findSsoUser(AuthSsoDTO authSsoDTO){
        Usuario usuario = authSsoService.findUsuarioByUuidExterno(authSsoDTO.getUuid());
        if(usuario != null) return usuario;

        usuario = userService.findByEmail(authSsoDTO.getEmail());
        if(usuario != null){
            authSsoService.bindUsuario(usuario, authSsoDTO);
            return usuario;
        }

        //Solicitar complemento do cadastro
        return null;
    }
}