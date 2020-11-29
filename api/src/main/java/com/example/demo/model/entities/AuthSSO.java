package com.example.demo.model.entities;

import java.util.UUID;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="sso")
@Getter
@Setter
public class AuthSSO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_sso;

    @OneToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties("sso")
    private Usuario usuario;
    private String uuid_externo;

    private int fk_id_usuario;

    public AuthSSO() { }

    public AuthSSO(Usuario usuario, String uuid_externo) {
        this.usuario = usuario;
        this.uuid_externo = uuid_externo;
        this.fk_id_usuario = usuario.getIdUsuario();
    }
}
