package com.example.demo.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_evento;

    private String titulo;
    private String descricao;
    /* Colocar DateTime (pesquisar como) */
    private Date inicio;
    private Date fim;
    private Date criado_em;
    private Date ultima_edicao;
    private String propriedade;
    private String privacidade;

    public Evento() { }

    public Evento(String titulo, String descricao, Date inicio, Date fim) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.inicio = inicio;
        this.fim = fim;
    }

    public int getId_evento() {
        return id_evento;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getInicio() {
        return inicio;
    }

    public void setInicio(Date inicio) {
        this.inicio = inicio;
    }

    public Date getFim() {
        return fim;
    }

    public void setFim(Date fim) {
        this.fim = fim;
    }

    public Date getCriado_em() {
        return criado_em;
    }

    public void setCriado_em(Date criado_em) {
        this.criado_em = criado_em;
    }

    public Date getUltima_edicao() {
        return ultima_edicao;
    }

    public void setUltima_edicao(Date ultima_edicao) {
        this.ultima_edicao = ultima_edicao;
    }

    public String getPropriedade() {
        return propriedade;
    }

    public void setPropriedade(String propriedade) {
        this.propriedade = propriedade;
    }

    public String getPrivacidade() {
        return privacidade;
    }

    public void setPrivacidade(String privacidade) {
        this.privacidade = privacidade;
    }
}
