package com.example.demo.model.repositories;

import java.util.Date;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.entities.Evento;

public interface EventoRepository extends CrudRepository<Evento, Integer> {

	Evento findByTitulo(String titulo);
    
    Evento findByInicio(Date data);

    Set<Evento> findByFkIdDono(@Param("id") Integer id);
    
    @Query(value="SELECT * FROM Evento e WHERE fk_id_dono = :id"
    		+ " and e.inicio > now() ORDER BY e.inicio LIMIT :limit", nativeQuery=true)
    Set<Evento> findNextRecentEventsByUserId(@Param("id") Integer id, @Param("limit") Integer limit);

}
