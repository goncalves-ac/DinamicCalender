package com.example.demo.model.entities;

import java.util.UUID;

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
public class Convite {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_usuario_evento;
	
	private UUID fk_id_usuario;
	
	private UUID fk_id_evento;
	
	private String status;
	
	
	

}
