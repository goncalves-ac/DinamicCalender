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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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
    
    @NotEmpty(message="Título é obrigatório.")
    @Size(max=150, message="Título deve conter no máximo 150 caractéres.")
    private String titulo;
    
    @Size(max=240, message="Descrição deve conter no máximo 240 caractéres.")
    private String descricao;
    
    @NotEmpty(message="O evento deve ter um início.")
    private Date inicio;
    
    @NotEmpty(message="O evento deve ter um fim.")
    private Date fim;
    
    private Date criado_em = java.sql.Date.valueOf(LocalDate.now());
    private Date ultima_edicao = java.sql.Date.valueOf(LocalDate.now());
    
    @Pattern(regexp="#[A-Za-z]{6}", message="A cor de fundo deve estar no formato hexadecimal #CCCCCC")
    private String corDeFundo;
    
    @NotEmpty(message="A privacidade do evento deve ser PUBLIC ou PRIVATE")
    @Pattern(regexp="[PUBLIC|PRIVATE]", message="Privacidade deve ser PUBLIC ou PRIVATE")
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
