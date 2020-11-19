package com.example.demo.model.controllers;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.NovaSenhaRequestDTO;
import com.example.demo.dto.UpdateUserReturnDTO;
import com.example.demo.dto.UsuarioRequestDTO;
import com.example.demo.dto.UsuarioResponseDTO;
import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.services.JwtUserDetailsService;
import com.example.demo.services.UserService;
import com.example.demo.upload.utils.FileUploadUtil;
import com.example.demo.upload.utils.JwtCookieUtil;
import com.example.demo.upload.utils.JwtTokenUtil;
import com.example.demo.upload.utils.OldNewImgFileState;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "usuario")
public class UsuarioController {
        
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUserDetailsService userDetailsService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @GetMapping("/{id}")
    public UsuarioResponseDTO getUsuarioById(@PathVariable int id) throws Exception {
    		try {
    			Usuario u = userService.findUserById(id);
				return new UsuarioResponseDTO(u);
    		} catch(Exception e) {
    			throw e;
    		}      
    }
    
    @GetMapping()
    public Set<UsuarioResponseDTO> getUsuarioByNome(@RequestParam(required=false) String nome, Authentication auth) throws Exception {
    	
    	if (nome==null) {
    		try {
    	    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    			Usuario u = userService.findUserById(authUserId);
    			Set<UsuarioResponseDTO> usuarioSet = new HashSet<UsuarioResponseDTO>();
    			usuarioSet.add(new UsuarioResponseDTO(u));
    			return usuarioSet;
    		} catch (Exception e) {
    			throw e;
    		}
    	}
    	
    	try {
    			Set<Usuario> u = userService.findUsersByNome(nome);
    			Set<UsuarioResponseDTO> usuariosDTO = u.stream().map
    					(usuario -> new UsuarioResponseDTO(usuario)).collect(Collectors.toSet());
				return usuariosDTO;
    		} catch(Exception e) {
    			throw e;
    		}      
    }

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public UsuarioResponseDTO addUsuario(@RequestBody UsuarioRequestDTO usuarioRequestDTO) throws Exception {
    	
    	Usuario usuario = usuarioRequestDTO.toUsuario();
    	
    	try {
    		Usuario u = userService.createUser(usuario);
    		return new UsuarioResponseDTO(u);
    	} catch(Exception e) {
    		throw e;
    	}
    }
    
    @PutMapping(value="/{idUsuario}", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @PreAuthorize("#idUsuario == authentication.principal.idUsuario")
    public ResponseEntity<?> updateUsuario(@PathVariable int idUsuario, @ModelAttribute UsuarioRequestDTO usuarioRequestDTO) throws Exception{       
    	boolean success = false;
    	Usuario dadosUsuario = usuarioRequestDTO.toUsuario();
		MultipartFile avatarImg = usuarioRequestDTO.getAvatarImg();
		OldNewImgFileState state = new OldNewImgFileState();
		if (avatarImg!=null) {
			try {
				state = userService.changeUserAvatarImg(idUsuario, avatarImg);
				dadosUsuario.setAvatarUrl(state.getNewImgUri());
			} catch (Exception e) {
				throw e;
			}
		}
		

    	try {
    		UpdateUserReturnDTO dto = userService.updateUser(idUsuario, dadosUsuario);
    		Usuario u = dto.getUsuario();
    		success = true;
    		if (dto.isHasChangedEmail()) {
    			final UserDetails userDetails = userDetailsService
    					.loadUserByUsername(u.getEmail());
    			String newJwtToken = jwtTokenUtil.generateToken(userDetails);
    			String jwtCookie = JwtCookieUtil.getCookieForToken(newJwtToken);
    			return ResponseEntity.ok()
    					.header(HttpHeaders.SET_COOKIE, jwtCookie)
    					.body(new UsuarioResponseDTO(u));
    		}
    		return ResponseEntity.ok(new UsuarioResponseDTO(u));
    	} catch (ConstraintViolationException e) {
    		throw new BadRequestException(e.getMessage());
    	} catch (Exception e) {;
    		throw e;
    	} finally {
    		if (!success) {
    			FileUploadUtil.rollback(state);
    		}
    	}
    }
    
    @PatchMapping("/{idUsuario}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @PreAuthorize("#idUsuario == authentication.principal.idUsuario")
    public UsuarioResponseDTO changeUsuarioPassword(@PathVariable int idUsuario, @RequestBody NovaSenhaRequestDTO novaSenhaDTO) throws Exception{       
    	try {
    		Usuario u = userService.changeUserPassword(idUsuario, novaSenhaDTO);
    		return new UsuarioResponseDTO(u);
    	} catch (Exception e) {
    		throw e;
    	}
    }

    @DeleteMapping("/{idUsuario}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    @PreAuthorize("#idUsuario == authentication.principal.idUsuario")
    public void deleteUsuario(@PathVariable int idUsuario) throws Exception{

    	try {
    		userService.deleteUserById(idUsuario);
    	} catch (Exception e) {
    		throw new ResourceNotFoundException("Usuário não pode ser encontrado");
    	}
        
    }

}
