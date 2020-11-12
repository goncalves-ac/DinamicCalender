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
@Table(name="amigo")
@Getter
@Setter
public class Amizade {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_amizade")
	private int idAmizade;
	
	@Column(name="id_usuario_1")
	private int idUsuario1;
	
	@Column(name="id_usuario_2")
	private int idUsuario2;

	@Column(name="status")
	private String status = "PENDING";
	
	public Amizade() {
		
	}
	
	public Amizade(int idUsuario1, int idUsuario2, String status) {
		this.idUsuario1=idUsuario1;
		this.idUsuario2=idUsuario2;
		this.status = status;
	}
	
	public Amizade(int idUsuario1, int idUsuario2) {
		this.idUsuario1=idUsuario1;
		this.idUsuario2=idUsuario2;
	}
	

}
