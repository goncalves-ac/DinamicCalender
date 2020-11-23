package com.example.demo.model.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EventoRequestDTO;
import com.example.demo.exceptions.ForbiddenActionException;
import com.example.demo.model.entities.ConviteEvento;
import com.example.demo.model.entities.Evento;
import com.example.demo.services.EventInviteService;
import com.example.demo.services.EventService;

@CrossOrigin
@RestController
@RequestMapping(path = "eventos")
public class EventoController {
    
    @Autowired
    private EventService eventService;
    
    @Autowired
    private EventInviteService eventInviteService;

    @GetMapping()
    @ResponseBody
    public Set<Evento> getEventosByAuthenticatedUser(Authentication auth, @RequestParam(required=false) boolean recent, @RequestParam(required=false) Integer limit) throws Exception {
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	System.out.println(recent);

    	
    	try {
    		if (recent) {
        		if (limit == null) {
        			limit = 3;
        		}
        		return eventService.findNextRecentEventsByUserId(authUserId, limit);
        	}
    		return eventService.findEventsByUserId(authUserId);
        } catch (Exception e) {
        	throw e;
        }
    }
    	
    
    @GetMapping("/dono")
    @ResponseBody
    public Set<Evento> getEventosByDono(@RequestParam int id, @RequestParam(required=false) boolean recent, @RequestParam(required=false) Integer limit) throws Exception{
    	try {
    		if (recent) {
        		if (limit == null) {
        			limit = 3;
        		}
        		return eventService.findNextRecentEventsByUserId(id, limit);
        	}
    		return eventService.findEventsByUserId(id);
    	} catch (Exception e) {
    		throw e;
    	}  
    }

    @GetMapping("/{id}")
    public Evento getEventoById(@PathVariable int id) throws Exception {
    	try {
    		return eventService.findEventsByEventId(id);
    	} catch (Exception e) {
    		throw e;
    	}   
    }
    
    @GetMapping("/convites")
    @ResponseBody
    public Set<ConviteEvento> getInvitesByUserId(@RequestParam Integer idUser) throws Exception {
    	try {
    		return eventInviteService.getEventInvitesByUser(idUser);
    	} catch (Exception e) {
    		throw e;
    	}
    }
    
    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Evento addEvento(@RequestBody EventoRequestDTO eventoDTO, Authentication auth) throws Exception {
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	Set<Integer> idsConvidados = eventoDTO.getConvites();
    	if (!idsConvidados.isEmpty()) {
    		if (idsConvidados.contains(authUserId)) {
    			throw new ForbiddenActionException("Usuário não pode convidar a si mesmo");
    		}
    	}
    	
        try {
        	eventoDTO.setFkIdDono(authUserId);
        	Evento e = eventService.createEvent(eventoDTO);
        	return e;        	
        } catch (Exception e) {
        	throw e;
        }
    }
    
    @PutMapping("/{idEvento}")
    @ResponseStatus(code = HttpStatus.OK)
    public Evento updateEvento(@PathVariable int idEvento, @RequestBody EventoRequestDTO eventoDTO, Authentication auth) throws Exception{
		Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
		
    	Set<Integer> idsConvidados = eventoDTO.getConvites();
    	if (!idsConvidados.isEmpty()) {
    		if (idsConvidados.contains(authUserId)) {
    			throw new ForbiddenActionException("Usuário não pode convidar a si mesmo");
    		}
    	}
    	
    	try {
        	return eventService.updateEvent(authUserId, idEvento, eventoDTO);
        } catch(Exception e) {
        	throw e;
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteEvento(@PathVariable int id, Authentication auth) throws Exception {
    	Integer authUserId = Integer.parseInt(auth.getPrincipal().toString().split(" ")[1]);
    	
    	try {
    		eventService.deleteEventById(authUserId, id);
    	} catch (Exception e) {
    		throw e;
    	}
        
    }

}
