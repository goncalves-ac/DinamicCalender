package com.example.demo.model.entities;

/* Bibliotecas */
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class AuthSSO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_sso;

    @OneToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties("sso")
    private Usuario usuario;
    private String uuid_externo;

    public AuthSSO() { }

    public AuthSSO(int id_sso, Usuario usuario, String uuid_externo) {
        this.id_sso = id_sso;
        this.usuario = usuario;
        this.uuid_externo = uuid_externo;
    }

    public int getId_sso() {
        return id_sso;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getUuid_externo() {
        return uuid_externo;
    }

    public void setUuid_externo(String uuid_externo) {
        this.uuid_externo = uuid_externo;
    }
}
