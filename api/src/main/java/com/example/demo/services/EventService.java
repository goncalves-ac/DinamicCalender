package com.example.demo.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.EventoRequestDTO;
import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.ForbiddenActionException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.repositories.EventoRepository;

@Service
public class EventService {

	@Autowired
	private EventoRepository eventRepository;
	
	@Autowired
	private EventInviteService eventInviteService;
	
	@Autowired
	private EntityManager em;
		
	public EventService() {	
	}
	
	@Transactional
	public Evento createEvent(EventoRequestDTO eventoDTO) throws Exception {
		Date today = Date.valueOf(LocalDate.now());
		
		if (eventoDTO.getInicio().before(today) || eventoDTO.getFim().before(today)) {
			throw new BadRequestException("Evento com data inválida.");
		}
		
			Evento evento = eventoDTO.toEvent();
			Evento eventoSalvo = eventRepository.save(evento);
			Set<Integer> idsConvidados = eventoDTO.getConvites();
			eventInviteService.createEventInvites(eventoSalvo.getId_evento(), idsConvidados);
			em.refresh(eventoSalvo);
			return eventoSalvo;
		

	}
	
	@Transactional(readOnly = true)
	public Set<Evento> findEventsByUserId(Integer idUsuario) throws Exception{
		return eventRepository.findByFkIdDono(idUsuario);
	}
	
	@Transactional(readOnly = true)
	public Evento findEventsByEventId(Integer idEvento) throws Exception {
		return eventRepository.findById(idEvento).get();
	}
	
	@Transactional
	public Evento updateEvent(Integer authUserId, Integer idEvento, EventoRequestDTO dadosEvento) throws Exception{
		Evento e = eventRepository.findById(idEvento)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não foi encontrado"));
		
		if (e.getFkIdDono() != authUserId) {
			throw new ForbiddenActionException("Evento não pertence ao usuário");
		}

        if (dadosEvento.getInicio() != null && dadosEvento.getInicio() != e.getInicio()) {
        	e.setInicio(dadosEvento.getInicio());
        }
        
        if (dadosEvento.getInicio() != null && dadosEvento.getFim() != e.getFim()) {
        	e.setFim(dadosEvento.getFim());
        }
        
        if (dadosEvento.getInicio() != null && dadosEvento.getTitulo() != e.getTitulo()) {
        	e.setTitulo(dadosEvento.getTitulo());
        }
        
        if (dadosEvento.getInicio() != null && dadosEvento.getDescricao() != e.getDescricao()) {
        	e.setDescricao(dadosEvento.getDescricao());
        }
        
        if (dadosEvento.getInicio() != null && dadosEvento.getPrivacidade() != e.getPrivacidade()) {
        	e.setPrivacidade(dadosEvento.getPrivacidade());
        }
        
        if (dadosEvento.getInicio() != null && dadosEvento.getCorDeFundo() != e.getCorDeFundo()) {
        	e.setCorDeFundo(dadosEvento.getCorDeFundo());
        }
        
        eventInviteService.updateEventInvites(idEvento, dadosEvento.getConvites());
        em.refresh(e);
        
        return eventRepository.save(e);
	}
	
	@Transactional
	public void deleteEventById(Integer authUserId, Integer idEvento) throws Exception{
		Evento eventoExiste = eventRepository.findById(idEvento)
				.orElseThrow(() -> new ResourceNotFoundException("Evento não foi encontrado"));
		
		if (eventoExiste.getFkIdDono() != authUserId) {
			throw new ForbiddenActionException("Evento não pertence ao usuário");
		}
		
		eventRepository.deleteById(idEvento);
	}

	
}

