package com.example.demo.dto;

import java.util.Date;
import java.util.Set;

import com.example.demo.model.entities.Evento;
import com.example.demo.model.entities.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;

@Getter
public class UsuarioResponseDTO {
	private int idUsuario;
	private String nome;
	private String sobrenome;
	private String email;
	private Date nascimento;
	private String genero;
	private String avatarUrl;
	private String descricao;
	
	//private final static SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy");
	
	@JsonIgnoreProperties(value={"eventosAlheios", "senha", "email", "genero", "amigosRequisitados"
			, "requisicoesAmigos", "eventosProprios"})
	private Set<Usuario> amigosRequisitados;
    
	@JsonIgnoreProperties(value={"eventosAlheios", "senha", "email", "genero", "amigosRequisitados"
			, "requisicoesAmigos", "eventosProprios"})
    private Set<Usuario> requisicoesAmigos;
    
    private Set<Evento> eventosAlheios;

    private Set<Evento> eventosProprios;
	
	public UsuarioResponseDTO(Usuario usuario) {
		this.idUsuario = usuario.getIdUsuario();
		this.nome=usuario.getNome();
		this.sobrenome=usuario.getSobrenome();
		this.email=usuario.getEmail();
		this.nascimento=usuario.getNascimento();
		this.genero=usuario.getGenero();
		this.avatarUrl = usuario.getAvatarUrl();
		this.descricao = usuario.getDescricao();
		this.nascimento=usuario.getNascimento();
		this.genero=usuario.getGenero();
		this.amigosRequisitados = usuario.getAmigosRequisitados();
		this.requisicoesAmigos = usuario.getRequisicoesAmigos();
		this.eventosAlheios = usuario.getEventosAlheios();
		this.eventosProprios = usuario.getEventosProprios();
	}
	
}
