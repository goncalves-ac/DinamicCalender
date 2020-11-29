package com.example.demo.dto;

import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

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
	
	@Nullable
	private MultipartFile avatarImg;
	
	public Usuario toUsuario() {
		Usuario u = new Usuario(
				this.getNome(),
				this.getSobrenome(),
				this.getNascimento(),
				this.getGenero(),
				this.getEmail(),
				this.getSenha(),
				this.getDescricao()
				);
		if (this.getAvatarUrl() != null) {
			u.setAvatarUrl(this.getAvatarUrl());
		}
		return u;
	}
	
}
