package com.example.demo.config;

import java.util.Collection;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetail extends User{

	private static final long serialVersionUID = -127653421684538888L;
	private UUID idUsuario;

	public UserDetail(UUID id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.idUsuario = id;
	}
	
	@Override
	public String toString() {
		return "idUsuario: " + this.getIdUsuario();
	}

}
