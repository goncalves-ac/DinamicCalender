package com.example.demo.model.repositories;

import com.example.demo.model.entities.Evento;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface EventoRepository extends CrudRepository<Evento, UUID> {
    // Metodos
    Evento findByTitulo(String titulo);
    
    Evento findByInicio(Date data);

    Set<Evento> findByFkIdDono(@Param("id") UUID id);

}
