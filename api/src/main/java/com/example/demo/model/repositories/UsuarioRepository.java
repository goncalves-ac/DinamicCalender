package com.example.demo.model.repositories;

import com.example.demo.model.entities.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    //Metodos
    Usuario findByNome(String nome);
}
