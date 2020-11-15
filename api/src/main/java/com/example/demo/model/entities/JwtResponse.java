
package com.example.demo.model.entities;
import java.io.Serializable;
import java.util.Date;

import com.example.demo.dto.UsuarioResponseDTO;

import lombok.Getter;

@Getter
public class JwtResponse implements Serializable {

private static final long serialVersionUID = -8091879091924046844L;
private final String jwttoken;
private final UsuarioResponseDTO infoUsuario;
private final Date expiresAt;

public JwtResponse(String jwttoken, UsuarioResponseDTO infoUsuario, Date expiresAt) {
	this.jwttoken = jwttoken;
	this.infoUsuario = infoUsuario;
	this.expiresAt = expiresAt;
}
}