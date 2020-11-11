package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Data Inválida")
public class InvalidDateException extends Exception {
	private static final long serialVersionUID = -2534844754484263972L;

}
