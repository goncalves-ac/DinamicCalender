package com.example.demo.config;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetail extends User{

	private static final long serialVersionUID = -127653421684538888L;
	private int idUsuario;

	public UserDetail(int id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.idUsuario = id;
	}
	
	@Override
	public String toString() {
		return "idUsuario: " + this.getIdUsuario();
	}

}
