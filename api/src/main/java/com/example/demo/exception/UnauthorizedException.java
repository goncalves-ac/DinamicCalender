package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason="Usuário não tem autorização para realizar essa ação.")
public class UnauthorizedException extends Exception{

	private static final long serialVersionUID = -7600297334496540492L;

	public UnauthorizedException() {}
}
