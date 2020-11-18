package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class BadRequestException extends Exception {
	
	private static final long serialVersionUID = -2534844754484263972L;
	
	public BadRequestException(String msg) {
		super(msg);
	}

}
