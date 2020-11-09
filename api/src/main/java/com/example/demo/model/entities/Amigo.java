package com.example.demo.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Amigo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_amizade;

    @ManyToOne
    @JoinColumn(name = "fk_id_usuario")
    @JsonIgnoreProperties("amigos")
    private Usuario usuario_1;
    private Usuario usuario_2;
    private int status;

    public Amigo() { }

    public int getId_amizade() {
        return id_amizade;
    }

    public Usuario getUsuario_1() {
        return usuario_1;
    }

    public Usuario getUsuario_2() {
        return usuario_2;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
