package com.example.demo.dto;

import com.example.demo.model.entities.Usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserReturnDTO {
	
	private Usuario usuario;
	private boolean hasChangedEmail;

}
