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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_sso;

    @OneToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties("sso")
    private Usuario usuario;
    private String uuid_externo;

    public AuthSSO() { }

    public AuthSSO(UUID id_sso, Usuario usuario, String uuid_externo) {
        this.id_sso = id_sso;
        this.usuario = usuario;
        this.uuid_externo = uuid_externo;
    }
}
