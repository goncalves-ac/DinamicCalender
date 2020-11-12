package com.example.demo.model.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.entities.ConviteEvento;

public interface ConviteEventoRepository extends CrudRepository<ConviteEvento, Integer> {
	
	@Query(value = "Select c from ConviteEvento c where fk_id_evento = :fkIdEvento and fk_id_usuario = :fkIdUsuario")
	ConviteEvento findSpecificInvite(@Param("fkIdEvento") int fkIdEvento,
			@Param("fkIdUsuario") int fkIdUsuario);
	
	@Query(value = "Select c from ConviteEvento c where fk_id_evento = :fkIdEvento")
	Set<ConviteEvento> findInvitesByEvent(@Param("fkIdEvento") int fkIdEvento);
	
	@Query(value = "Select c from ConviteEvento c where fk_id_usuario = :fkIdUsuario")
	Set<ConviteEvento> findInvitesByUser(@Param("fkIdUsuario") int fkIdUsuario);

}
