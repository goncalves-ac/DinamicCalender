package com.example.demo.service;

import java.sql.Date;
import java.time.LocalDate;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.InvalidDateException;
import com.example.demo.model.entities.Evento;
import com.example.demo.model.repositories.EventoRepository;

@Service
public class CreateEventService {

	@Autowired
	private EventoRepository eventRepository;
	
	public CreateEventService() {	
	}
	
	@Transactional
	public Evento createEvent(Evento event) throws InvalidDateException{
		Date today = Date.valueOf(LocalDate.now());
		if (event.getInicio().before(today) || event.getFim().before(today)) {
			throw new InvalidDateException();
		}
		
		Evento savedEvent = eventRepository.save(event);
		
		return savedEvent;
	}
}
