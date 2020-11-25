package com.example.demo.model.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.model.entities.Usuario;

import javax.transaction.Transactional;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
	
	@Query(value = "SELECT u from Usuario u where LOWER(nome) like :nome%")
	Set<Usuario> findByNome(String nome);

	Usuario findByEmail(String email);

}
