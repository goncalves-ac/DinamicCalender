package com.example.demo.validation;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import com.example.demo.model.entities.Evento;

public class EventoValidator {
	
	private static final Validator validator =
			Validation.buildDefaultValidatorFactory().getValidator();
	
	public static final Set<ConstraintViolation<Evento>> validate(Evento e) {
		return validator.validate(e);
		
	}
}
