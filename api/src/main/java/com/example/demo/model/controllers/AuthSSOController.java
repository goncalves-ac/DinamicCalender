package com.example.demo.model.controllers;

import com.example.demo.dto.AuthSsoDTO;
import com.example.demo.dto.UsuarioResponseDTO;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;
import com.example.demo.services.AuthSsoService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "sso")
public class AuthSSOController {
    @Autowired
    AuthSsoService authSsoService;

    @Autowired
    UserService userService;

    @PostMapping()
    public UsuarioResponseDTO authenticate(@RequestBody AuthSsoDTO authSsoDTO){
        Usuario usuario = authSsoService.findUsuarioByUuidExterno(authSsoDTO.getUuid());
        if(usuario != null) return new UsuarioResponseDTO(usuario);

        usuario = userService.findByEmail(authSsoDTO.getEmail());
        if(usuario != null){
            authSsoService.bindUsuario(usuario, authSsoDTO);
            return new UsuarioResponseDTO(usuario);
        }

        //Solicitar complemento do cadastro
        //userService.createFromSso(authSsoDTO.getEmail(), authSsoDTO.getNome());

        usuario = userService.findByEmail(authSsoDTO.getEmail());
        authSsoService.bindUsuario(usuario, authSsoDTO);
        return new UsuarioResponseDTO(usuario);

        //return new UsuarioResponseDTO(new Usuario());
    }
}