package com.example.demo.model.entities;

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

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="evento")
@Getter
@Setter
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_evento;

    @Column(name="fk_id_dono")
    private UUID fkIdDono;
    
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
    @JsonIgnoreProperties(value= {"eventos_alheios", "senha", "email", "genero", "amigos_requisitados"
    		, "requisicoes_amigos", "eventos_proprios"})
    private Set<Usuario> usuariosConvidados;

	public Evento() { }

    public Evento(UUID id_dono, String titulo, String descricao, Date inicio, Date fim, String corDeFundo, String privacidade) {
    	this.fkIdDono = id_dono;
        this.titulo = titulo;
        this.descricao = descricao;
        this.inicio = inicio;
        this.fim = fim;
        this.corDeFundo=corDeFundo;
        this.privacidade=privacidade;
    }

}
