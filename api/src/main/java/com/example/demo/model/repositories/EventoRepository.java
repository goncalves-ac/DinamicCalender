package com.example.demo.model.repositories;

import com.example.demo.model.entities.Evento;
import org.springframework.data.repository.CrudRepository;

public interface EventoRepository extends CrudRepository<Evento, Integer> {
    // Metodos
    Evento findByTitulo(String titulo);
}
