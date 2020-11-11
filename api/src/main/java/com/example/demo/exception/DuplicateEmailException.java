package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Email já cadastrado.")
public class DuplicateEmailException extends Exception {
	private static final long serialVersionUID = -2534844754484263972L;
	private String email;
	
	public DuplicateEmailException(String email) {
		this.setEmail(email);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	

}
