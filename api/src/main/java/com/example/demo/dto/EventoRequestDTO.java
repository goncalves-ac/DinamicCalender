package com.example.demo.dto;

import java.util.Set;

import com.example.demo.model.entities.Evento;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventoRequestDTO extends Evento {
	
	private Set<Integer> convites;
	
	public Evento toEvent() {
		return new Evento(this.getFkIdDono(), this.getTitulo(),
				this.getDescricao(), this.getInicio(),
				this.getFim(), this.getCorDeFundo(), this.getPrivacidade());
	}
	
}
