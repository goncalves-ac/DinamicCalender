package com.example.demo.model.repositories;

import com.example.demo.model.entities.Usuario;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, UUID> {
	
	Usuario findByNome(String nome);

	Usuario findByEmail(String email);
    
}
