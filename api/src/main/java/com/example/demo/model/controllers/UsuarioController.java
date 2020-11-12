package com.example.demo.model.controllers;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NovaSenhaRequestDTO;
import com.example.demo.dto.UsuarioRequestDTO;
import com.example.demo.dto.UsuarioResponseDTO;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.services.UserService;


@RestController
@RequestMapping(path = "usuario")
public class UsuarioController {
        
    @Autowired
    UserService userService;

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
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	if (nome==null) {
    		try {
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
    	try {
    		Usuario u = userService.createUser(usuarioRequestDTO.toUsuario());
    		return new UsuarioResponseDTO(u);
    	} catch(Exception e) {
    		throw e;
    	}
    }

    @PutMapping("/{idUsuario}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @PreAuthorize("#idUsuario == authentication.principal.idUsuario")
    public UsuarioResponseDTO updateUsuario(@PathVariable int idUsuario, @RequestBody UsuarioRequestDTO usuarioRequestDTO) throws Exception{       
    	try {
    		Usuario u = userService.updateUser(idUsuario, usuarioRequestDTO.toUsuario());
    		return new UsuarioResponseDTO(u);
    	} catch (Exception e) {
    		throw e;
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
