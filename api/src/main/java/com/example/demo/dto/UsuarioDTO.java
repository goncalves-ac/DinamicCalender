package com.example.demo.dto;

import java.util.Date;
import java.util.UUID;

import com.example.demo.model.entities.Usuario;

import lombok.Getter;

@Getter
public class UsuarioDTO {
	private UUID idUsuario;
	private String nome;
	private String sobrenome;
	private String email;
	private Date nascimento;
	private String genero;
	
	public UsuarioDTO(Usuario usuario) {
		this.idUsuario = usuario.getIdUsuario();
		this.nome=usuario.getNome();
		this.sobrenome=usuario.getSobrenome();
		this.email=usuario.getEmail();
		this.nascimento=usuario.getNascimento();
		this.genero=usuario.getGenero();
	}
	
}
