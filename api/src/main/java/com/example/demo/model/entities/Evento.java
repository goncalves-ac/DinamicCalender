package com.example.demo.model.entities;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="evento")
@Getter
@Setter
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_evento;

    @Column(name="fk_id_dono")
    private int fkIdDono;
    
    private String titulo;
    private String descricao;
    private Date inicio;
    private Date fim;
    private Date criado_em = java.sql.Date.valueOf(LocalDate.now());
    private Date ultima_edicao = java.sql.Date.valueOf(LocalDate.now());
    private String corDeFundo;
    private String privacidade = "PRIVATE";
    
    @ManyToMany
    @JoinTable(
    		name="usuario_evento",
    		joinColumns = @JoinColumn(name="fk_id_evento", referencedColumnName = "id_evento"),
    		inverseJoinColumns = @JoinColumn(name="fk_id_usuario", referencedColumnName = "id_usuario")
    )
    @JsonIgnoreProperties(value= {"eventosAlheios", "senha", "email", "genero", "amigosRequisitados"
    		, "requisicoesAmigos", "eventosProprios"})
    private Set<Usuario> usuariosConvidados;

	public Evento() { }

    public Evento(int id_dono, String titulo, String descricao, Date inicio, Date fim, String corDeFundo, String privacidade) {
    	this.fkIdDono = id_dono;
        this.titulo = titulo;
        this.descricao = descricao;
        this.inicio = inicio;
        this.fim = fim;
        this.corDeFundo=corDeFundo;
        this.privacidade=privacidade;
    }

}
