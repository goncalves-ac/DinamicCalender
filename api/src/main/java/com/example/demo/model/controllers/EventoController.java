package com.example.demo.model.controllers;

import com.example.demo.exception.UnauthorizedException;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.repositories.EventoRepository;
import com.example.demo.service.CreateEventService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "eventos")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;
    
    @Autowired
    private CreateEventService createEventService;
    
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    @ResponseBody
    public Set<Evento> getEventos(Authentication auth) {
    	UUID authUserId = UUID.fromString(auth.getPrincipal().toString().split(" ")[1]);
    	
    	return eventoRepository.findByFkIdDono(authUserId);
    }
    
    @GetMapping("/dono")
    @ResponseBody
    public Set<Evento> getEventos(@RequestParam UUID id) {
         return eventoRepository.findByFkIdDono(id);
    }

    @GetMapping("/{id}")
    public Optional<Evento> getById(@PathVariable UUID id){
        return eventoRepository.findById(id);
    }

    @PostMapping()
    public Evento addEvento(@RequestBody Evento evento, Authentication auth) throws Exception {
    	UUID authUserId = UUID.fromString(auth.getPrincipal().toString().split(" ")[1]);
    	
    	if (authUserId == null) {
    		throw new UnauthorizedException();
    	}
    	
        try {
        	evento.setFkIdDono(authUserId);
        	Evento e = createEventService.createEvent(evento);
        	return e;        	
        } catch (Exception e) {
        	throw e;
        }
    }

    @PutMapping("/{idEvento}")
    public Evento updateEvento(@PathVariable UUID idEvento, @RequestBody Evento dadosEvento) throws Exception{
        Evento e = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new IllegalArgumentException());

        if (dadosEvento.getInicio() != e.getInicio()) {
        	e.setInicio(dadosEvento.getInicio());
        }
        
        if (dadosEvento.getFim() != e.getFim()) {
        	e.setFim(dadosEvento.getFim());
        }
        
        if (dadosEvento.getTitulo() != e.getTitulo()) {
        	e.setTitulo(dadosEvento.getTitulo());
        }
        
        if (dadosEvento.getDescricao() != e.getDescricao()) {
        	e.setDescricao(dadosEvento.getDescricao());
        }
        
        if (dadosEvento.getPrivacidade() != e.getPrivacidade()) {
        	e.setPrivacidade(dadosEvento.getPrivacidade());
        }
        
        if (dadosEvento.getCorDeFundo() != e.getCorDeFundo()) {
        	e.setCorDeFundo(dadosEvento.getCorDeFundo());
        }
        
        return eventoRepository.save(e);
    }

    @DeleteMapping("/{id}")
    public void deleteEvento(@PathVariable UUID id) {
        eventoRepository.deleteById(id);
    }

}
