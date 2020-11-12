package com.example.demo.model.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usuario_evento")
@Getter
@Setter
public class ConviteEvento {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_usuario_evento")
	private int idUsuarioEvento;
	
	@Column(name="fk_id_evento")
	private int fkIdEvento;
	
	@Column(name="fk_id_usuario")
	private int fkIdUsuario;

	@Column(name="status")
	private String status = "PENDING";
	
	public ConviteEvento() {
		
	}
	
	public ConviteEvento(int fkIdEvento, int fkIdUsuario, String status) {
		this.fkIdEvento=fkIdEvento;
		this.fkIdUsuario=fkIdUsuario;
		this.status = status;
	}
	
	public ConviteEvento(int fkIdEvento, int fkIdUsuario) {
		this.fkIdEvento=fkIdEvento;
		this.fkIdUsuario=fkIdUsuario;
	}
	

}
