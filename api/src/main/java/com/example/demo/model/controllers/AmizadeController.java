package com.example.demo.model.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.BadRequestException;
import com.example.demo.model.entities.Amizade;
import com.example.demo.services.FriendshipService;

@CrossOrigin
@RestController
@RequestMapping(path = "amigos")
public class AmizadeController {

	@Autowired
	FriendshipService friendshipService;
	
    @GetMapping()
    public Set<Amizade> getConvites(@RequestParam(required=false) Integer idUsuario, Authentication auth) throws Exception {
		if (auth == null && idUsuario == null) {
			throw new BadRequestException(
					"O parâmetro idUsuario deve existir, ou você deve estar autenticado");
		}
		
    	if (idUsuario==null) {
        	try {
        		Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
        		return friendshipService.findInvites(authUserId);
            } catch (Exception e) {
            	throw e;
            }
    	}
    	
    	try {
    		return friendshipService.findInvites(idUsuario);
    	} catch (Exception e) {
    		throw e;
    	}
    	

    }

    @PostMapping("/convites")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Amizade criarConvite(@RequestParam int idUsuarioReq, Authentication auth) throws Exception {
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		return friendshipService.createInvite(authUserId, idUsuarioReq);
    	} catch (Exception e) {
    		throw e;
    	}
    }

    @PatchMapping("/convites")
    @ResponseStatus(code = HttpStatus.OK)
    public Amizade aceitarAmigo(@RequestParam int idUsuarioReq, Authentication auth) throws Exception {
		Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		return friendshipService.acceptInvite(authUserId, idUsuarioReq);
    	} catch (Exception e) {
    		throw e;
    	}
    }

    @DeleteMapping("/convites")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void recusarAmigo(@RequestParam int idUsuarioReq, Authentication auth) throws Exception {
		Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		friendshipService.declineInvite(authUserId, idUsuarioReq);
    	} catch (Exception e) {
    		throw e;
    	}
    }

}
