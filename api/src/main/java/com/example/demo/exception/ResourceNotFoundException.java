package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javassist.NotFoundException;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends NotFoundException {

	private static final long serialVersionUID = -2310134323828801169L;

	public ResourceNotFoundException(String msg) {
		super(msg);
	}

}
