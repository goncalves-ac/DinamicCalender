package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class DuplicateEntryException extends Exception {
	private static final long serialVersionUID = -2534844754484263972L;
	
	public DuplicateEntryException(String msg) {
		super(msg);
	}

}
