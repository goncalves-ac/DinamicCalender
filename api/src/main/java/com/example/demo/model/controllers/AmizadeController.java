package com.example.demo.model.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.entities.Amizade;
import com.example.demo.services.FriendshipService;

@RestController
@RequestMapping(path = "amigos")
public class AmizadeController {

	@Autowired
	FriendshipService friendshipService;
	
    @GetMapping()
    public Set<Amizade> getConvites(Authentication auth) throws Exception {
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		return friendshipService.findSelfFriendships(authUserId);
        } catch (Exception e) {
        	throw e;
        }
    }

    @PostMapping("/convites")
    public Amizade criarConvite(@RequestParam int idUsuarioReq, Authentication auth) throws Exception {
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		return friendshipService.createInvite(authUserId, idUsuarioReq);
    	} catch (Exception e) {
    		throw e;
    	}
    }

    @PatchMapping("/convites")
    public Amizade aceitarAmigo(@RequestParam int idUsuarioReq, Authentication auth) throws Exception {
		Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		return friendshipService.acceptInvite(authUserId, idUsuarioReq);
    	} catch (Exception e) {
    		throw e;
    	}
    }

    @DeleteMapping("/convites")
    public void recusarAmigo(@RequestParam int idUsuarioReq, Authentication auth) throws Exception {
		Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		friendshipService.declineInvite(authUserId, idUsuarioReq);
    	} catch (Exception e) {
    		throw e;
    	}
    }

}
