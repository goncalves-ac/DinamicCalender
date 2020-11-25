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
    
    @Query(value="SELECT * from Evento WHERE fk_id_dono = :id UNION ALL"
    		+ "(SELECT DISTINCT e.* FROM "
    		+ "(Evento e INNER JOIN Usuario_Evento ue ON id_evento = fk_id_evento) "
    		+ "WHERE fk_id_usuario = :id and ue.status='ACCEPTED')"
    		+ " ORDER BY inicio", nativeQuery=true)
    Set<Evento> findAllEventsByUserId(@Param("id") Integer id);
    
    @Query(value="SELECT * from Evento WHERE fk_id_dono = :id and privacidade='PUBLIC' UNION ALL"
    		+ "(SELECT DISTINCT e.* FROM "
    		+ "(Evento e INNER JOIN Usuario_Evento ue ON id_evento = fk_id_evento)"
    		+ " WHERE fk_id_usuario = :id"
    		+ " and privacidade='PUBLIC' and ue.status='ACCEPTED')"
    		+ " ORDER BY inicio", nativeQuery=true)
    Set<Evento> findPublicEventsByUserId(@Param("id") Integer id);
    
    @Query(value="SELECT DISTINCT e.* FROM Evento e WHERE fk_id_dono = :id"
    		+ " and e.inicio > now() ORDER BY e.inicio LIMIT :limit", nativeQuery=true)
    Set<Evento> findAllNextRecentEventsByOwnerId(@Param("id") Integer id, @Param("limit") Integer limit);

    @Query(value="SELECT DISTINCT e.* FROM Evento e WHERE fk_id_dono = :id"
    		+ " and privacidade='PUBLIC' and e.inicio > now()"
    		+ " ORDER BY e.inicio LIMIT  :limit", nativeQuery=true)
    Set<Evento> findPublicNextRecentEventsByOwnerId(@Param("id") Integer id, @Param("limit") Integer limit);
    
    @Query(value="SELECT * from Evento WHERE fk_id_dono = :id UNION ALL"
    		+ "(SELECT DISTINCT e.* FROM "
    		+ "(Evento e INNER JOIN Usuario_Evento ue ON id_evento = fk_id_evento) "
    		+ "WHERE fk_id_usuario = :id"
    		+ " and e.inicio > now() and ue.status='ACCEPTED')"
    		+ " ORDER BY inicio LIMIT :limit", nativeQuery=true)
    Set<Evento> findAllNextRecentEventsByUserId(@Param("id") Integer id, @Param("limit") Integer limit);
    
    @Query(value="SELECT * from Evento WHERE fk_id_dono = :id and privacidade='PUBLIC' UNION ALL"
    		+ "(SELECT DISTINCT e.* FROM "
    		+ "(Evento e INNER JOIN Usuario_Evento ue ON id_evento = fk_id_evento) "
    		+ "WHERE fk_id_usuario = :id"
    		+ " and e.privacidade='PUBLIC' and e.inicio > now() and ue.status='ACCEPTED')"
    		+ " ORDER BY inicio LIMIT  :limit", nativeQuery=true)
    Set<Evento> findPublicNextRecentEventsByUserId(@Param("id") Integer id, @Param("limit") Integer limit);
}
