package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javassist.NotFoundException;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class ForbiddenActionException extends NotFoundException {

	private static final long serialVersionUID = -2310134323828801169L;

	public ForbiddenActionException(String msg) {
		super(msg);
	}

}
