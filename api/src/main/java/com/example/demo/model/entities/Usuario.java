package com.example.demo.model.entities;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usuario")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_usuario")
    private int idUsuario;

    private String nome;
    private String sobrenome;
    private Date nascimento;
    private String email;
    private String senha;
    private String genero;
    
    @Column(name="avatar_url")
    private String avatarUrl;

 
    @ManyToMany
    @JoinTable(
    		name="amigo",
    		joinColumns = @JoinColumn(name="id_usuario_1", referencedColumnName = "id_usuario"),
    		inverseJoinColumns = @JoinColumn(name="id_usuario_2", referencedColumnName = "id_usuario")
    )
    private Set<Usuario> amigosRequisitados;
    
    @ManyToMany(mappedBy="amigosRequisitados")
    private Set<Usuario> requisicoesAmigos;
    
    @ManyToMany
    @JoinTable(
    		name="usuario_evento",
    		joinColumns = @JoinColumn(name="fk_id_usuario", referencedColumnName = "id_usuario"),
    		inverseJoinColumns = @JoinColumn(name="fk_id_evento", referencedColumnName = "id_evento")
    )
    private Set<Evento> eventosAlheios;
    
    @OneToMany(mappedBy="fkIdDono")
    private Set<Evento> eventosProprios;


    public Usuario() { }

    public Usuario(String nome, String sobrenome, Date nascimento, String genero, String email, String senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.nascimento = nascimento;
        this.genero = genero;
        this.email = email;
        this.senha = senha;
    }
}
