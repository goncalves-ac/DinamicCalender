package com.example.demo.services;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.validation.ConstraintViolation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.EventoRequestDTO;
import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.ForbiddenActionException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.repositories.EventoRepository;
import com.example.demo.validation.EntityValidator;

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
	
	private final EntityValidator<Evento> eventoValidator = new EntityValidator<Evento>();
	
	@Transactional
	public Evento createEvent(EventoRequestDTO eventoDTO) throws Exception {
		Evento evento = eventoDTO.toEvent();
		
		Set<ConstraintViolation<Evento>> constraintViolations = eventoValidator.validate(evento);

		if (!constraintViolations.isEmpty()) {
			throw new BadRequestException(constraintViolations.iterator().next().getMessage());
		}
		
		if (evento.getInicio().after(evento.getFim())) {
			throw new BadRequestException("O fim do evento deve ser após o início.");
		}
			
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
	
	@Transactional(readOnly=true)
	public Set<Evento> findNextRecentEventsByUserId(Integer idUsuario, Integer limit) {
		return eventRepository.findNextRecentEventsByUserId(idUsuario, limit);
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
        
        if (dadosEvento.getFim() != null && dadosEvento.getFim() != e.getFim()) {
        	e.setFim(dadosEvento.getFim());
        }
        
        if (dadosEvento.getTitulo() != null && dadosEvento.getTitulo() != e.getTitulo()) {
        	e.setTitulo(dadosEvento.getTitulo());
        }
        
        if (dadosEvento.getDescricao() != null && dadosEvento.getDescricao() != e.getDescricao()) {
        	e.setDescricao(dadosEvento.getDescricao());
        }
        
        if (dadosEvento.getPrivacidade() != null && dadosEvento.getPrivacidade() != e.getPrivacidade()) {
        	e.setPrivacidade(dadosEvento.getPrivacidade());
        }
        
        if (dadosEvento.getLocal() != null && dadosEvento.getLocal() != e.getLocal()) {
        	e.setLocal(dadosEvento.getLocal());
        }
        
        if (dadosEvento.getCorDeFundo() != null && dadosEvento.getCorDeFundo() != e.getCorDeFundo()) {
        	e.setCorDeFundo(dadosEvento.getCorDeFundo());
        }
        
        Set<ConstraintViolation<Evento>> constraintViolations = eventoValidator.validate(e);

		if (!constraintViolations.isEmpty()) {
			throw new BadRequestException(constraintViolations.iterator().next().getMessage());
		}
		
		Evento savedEvent = eventRepository.save(e);
		
        eventInviteService.updateEventInvites(idEvento, dadosEvento.getConvites());
        
        return savedEvent;
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

