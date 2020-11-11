package com.example.demo.dto;

import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserAuthDTO extends UserDetails {
	public UUID getIdUsuario();
	public void setIdUsuario();
}
