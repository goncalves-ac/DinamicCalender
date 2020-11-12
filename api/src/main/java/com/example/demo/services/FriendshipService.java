package com.example.demo.services;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.DuplicateEntryException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.entities.Amizade;
import com.example.demo.model.repositories.AmizadeRepository;

@Service
public class FriendshipService {
	
    @Autowired
    private AmizadeRepository amizadeRepository;
    
    @Transactional
    public Set<Amizade> findSelfFriendships(int id) throws Exception{
    	Set<Amizade> selfInvites = amizadeRepository.findInviteByUser1(id);
    	Set<Amizade> otherInvites = amizadeRepository.findInviteByUser2(id);
    	selfInvites.addAll(otherInvites);
    	return selfInvites;
    }
    
    @Transactional
    public Amizade createInvite(int idUsuario1, int idUsuario2) throws Exception{
    	Amizade a = new Amizade(idUsuario1, idUsuario2);
    	
    	boolean inviteExists = 
    			amizadeRepository.findSpecificInvite(idUsuario1, idUsuario2) != null ||
    			amizadeRepository.findSpecificInvite(idUsuario2, idUsuario1) != null;
    	
    	if (inviteExists) {
    		throw new DuplicateEntryException("Convite já existe.");
    	}
    	
    	return amizadeRepository.save(a);
    }
    
    @Transactional
    public Amizade acceptInvite(int idUsuario1, int idUsuario2) throws Exception{
    	Amizade a = amizadeRepository.findSpecificInvite(idUsuario2, idUsuario1);
    	
    	if (a==null) {
    		throw new ResourceNotFoundException("Convite não existe");
    	}
    	
    	a.setStatus("ACCEPTED");
    	amizadeRepository.save(a);
    	return a;
    }
    
    @Transactional
    public void declineInvite(int idUsuario1, int idUsuario2) throws Exception{
    	Amizade a = amizadeRepository.findSpecificInvite(idUsuario2, idUsuario1);
    	
    	if (a==null) {
    		throw new ResourceNotFoundException("Convite não existe");
    	}
    	
    	amizadeRepository.delete(a);
    }

}
