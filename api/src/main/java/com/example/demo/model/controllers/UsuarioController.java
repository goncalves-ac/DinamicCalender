package com.example.demo.model.controllers;

import com.example.demo.dto.UsuarioDTO;
import com.example.demo.exception.DuplicateEmailException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;
import com.example.demo.service.CreateUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(path = "usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
        
    @Autowired
    CreateUserService createUserService;

    @GetMapping("/{id}")
    public UsuarioDTO getUsuarioById(@PathVariable UUID id) throws Exception {

        	Usuario u = usuarioRepository.findById(id)
        			.orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
        	return new UsuarioDTO(u);
              
    }

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public UsuarioDTO addUsuario(@RequestBody Usuario usuario) throws Exception {
    	try {
    		Usuario u = createUserService.createUserAccount(usuario);
    		return new UsuarioDTO(u);
    	} catch(Exception e) {
    		throw e;
    	}
    }

    @PutMapping("/{idUsuario}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public UsuarioDTO updateUsuario(@PathVariable UUID idUsuario, @RequestBody Usuario dadosUsuario, Authentication auth) throws Exception{       
    	
    	UUID authUserId = UUID.fromString(auth.getPrincipal().toString().split(" ")[1]);
    	if (!authUserId.equals(idUsuario)) {
    		throw new UnauthorizedException();
    	}
    	
    	Usuario u = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
    	    	
    	if (dadosUsuario.getEmail() != null && dadosUsuario.getEmail()!=u.getEmail()) {
    		if (usuarioRepository.findByEmail(dadosUsuario.getEmail()) != null) {
    			throw new DuplicateEmailException(dadosUsuario.getEmail());
    		}
    		
    		u.setEmail(dadosUsuario.getEmail());
    	}
    	
    	if (dadosUsuario.getNome() != null && dadosUsuario.getNome() != u.getNome()) {
    		u.setNome(dadosUsuario.getNome());
    	}
    	
    	if (dadosUsuario.getSobrenome() != null && dadosUsuario.getSobrenome() != u.getSobrenome()) {
    		u.setSobrenome(dadosUsuario.getSobrenome());
    	}
    	
    	if (dadosUsuario.getNascimento() != null && dadosUsuario.getNascimento() != u.getNascimento()) {
    		u.setNascimento(dadosUsuario.getNascimento());
    	}
    	
    	if (dadosUsuario.getGenero() != null && dadosUsuario.getGenero() != u.getGenero()) {
    		u.setGenero(dadosUsuario.getGenero());
    	}

        usuarioRepository.save(u);
        return new UsuarioDTO(u);
    }

    @DeleteMapping("/{idUsuario}")
    @ResponseStatus(code = HttpStatus.OK)
    public void deleteUsuario(@PathVariable UUID idUsuario, Authentication auth) throws Exception{
    	UUID authUserId = UUID.fromString(auth.getPrincipal().toString().split(" ")[1]);
    	if (!authUserId.equals(idUsuario)) {
    		throw new UnauthorizedException();
    	}

    	try {
    		usuarioRepository.deleteById(idUsuario);
    	} catch (Exception e) {
    		throw new ResourceNotFoundException("Usuário não pode ser encontrado");
    	}
        
    }

}
