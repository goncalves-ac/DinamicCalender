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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

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
    
    @NotEmpty(message="Nome é obrigatório.")
    @Size(min=2, max=150, message="Nome deve ter entre 2 e 150 caractéres.")
    private String nome;
    
    @NotEmpty(message="Sobrenome é obrigatório.")
    @Size(min=2, max=150, message="Sobrenome deve ter entre 2 e 150 caractéres.")
    private String sobrenome;
        
    @NotNull(message="Data de nascimento é obrigatória.")
    @Past(message="Data de nascimento deve ser anterior ao dia de hoje.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date nascimento;
    
    @NotEmpty(message="Email é obrigatório.")
    @Size(min=2, max=240)
    @Pattern(regexp=
    "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
    message="Email deve ter um formato válido.")
    private String email;
    
    
    @NotEmpty(message="Senha é obrigatória e deve ter pelo menos 8 caractéres.")
    @Size(min=8, max=150, message="Senha deve ter entre 8 e 150 caractéres.")
    private String senha;
    
    @NotEmpty(message="Gênero é obrigatório.")
    @Pattern(regexp="[M|F|O]", message="Gênero deve ser M, F ou O")
    private String genero;
    
    @Column(name="avatar_url")
    @Size(min=10, message="Essa não parece ser uma URL válida.")
    private String avatarUrl;
    
    @Size(max=240, message="Descrição deve conter no máximo 240 caractéres.")
    private String descricao;

 
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

    public Usuario(String nome, String sobrenome, Date nascimento, String genero, String email, String senha, String descricao) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.nascimento = nascimento;
        this.genero = genero;
        this.email = email;
        this.senha = senha;
        this.descricao = descricao;
    }
}
