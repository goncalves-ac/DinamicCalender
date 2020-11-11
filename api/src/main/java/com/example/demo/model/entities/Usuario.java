package com.example.demo.model.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name="usuario")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_usuario")
    private UUID idUsuario;

    private String nome;
    private String sobrenome;
    private Date nascimento;
    private String email;
    private String senha;
    private String genero;

    @ManyToMany
    @JoinTable(
    		name="amigo",
    		joinColumns = @JoinColumn(name="id_usuario_1", referencedColumnName = "id_usuario"),
    		inverseJoinColumns = @JoinColumn(name="id_usuario_2", referencedColumnName = "id_usuario")
    )
    Set<Usuario> amigos_requisitados;
    
    @ManyToMany(mappedBy="amigos_requisitados")
    Set<Usuario> requisicoes_amigos;
    
    @ManyToMany
    @JoinTable(
    		name="usuario_evento",
    		joinColumns = @JoinColumn(name="fk_id_usuario", referencedColumnName = "id_usuario"),
    		inverseJoinColumns = @JoinColumn(name="fk_id_evento", referencedColumnName = "id_evento")
    )
    private Set<Evento> eventos_alheios;
    
    @OneToMany(mappedBy="fkIdDono")
    private Set<Evento> eventos_proprios;


    public Usuario() { }

    public Usuario(String nome, String sobrenome, Date nascimento, String genero, String email) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.nascimento = nascimento;
        this.genero = genero;
        this.email = email;
    }
}
