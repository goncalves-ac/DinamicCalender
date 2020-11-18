package com.example.demo.validation;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import com.example.demo.model.entities.Usuario;

public class UsuarioValidator {
	private static final Validator validator =
			Validation.buildDefaultValidatorFactory().getValidator();
	
	public static final Set<ConstraintViolation<Usuario>> validate(Usuario u) {
		return validator.validate(u);
		
	}
}
