package com.example.demo.model.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="amigo")
@Getter
@Setter
public class Amigo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_amizade;

    private int id_usuario_1;

    private int id_usuario_2;
    
    private int status;

    public Amigo() { }

}
