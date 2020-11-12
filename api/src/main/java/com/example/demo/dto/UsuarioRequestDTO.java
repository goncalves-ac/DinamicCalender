package com.example.demo.dto;

import java.io.File;

import com.example.demo.model.entities.Usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequestDTO extends Usuario {
	
	private File avatarImg;
	
	public Usuario toUsuario() {
		return new Usuario(
				this.getNome(),
				this.getSobrenome(),
				this.getNascimento(),
				this.getGenero(),
				this.getEmail(),
				this.getSenha()
				);
	}
	
}
