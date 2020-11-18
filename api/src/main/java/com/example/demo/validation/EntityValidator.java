package com.example.demo.validation;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

public class EntityValidator<T> {
	
	private static final Validator validator =
			Validation.buildDefaultValidatorFactory().getValidator();
	
	public final Set<ConstraintViolation<T>> validate(T t) {
		return validator.validate(t);
		
	}

}
