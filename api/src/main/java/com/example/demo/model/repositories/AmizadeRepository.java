package com.example.demo.model.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.entities.Amizade;

public interface AmizadeRepository extends CrudRepository<Amizade, Integer> {
	
	@Query(value = "Select a from Amizade a where id_usuario_1 = :fkIdUser1 and id_usuario_2 = :fkIdUser2")
	Amizade findSpecificInvite(@Param("fkIdUser1") int fkIdUser1,
			@Param("fkIdUser2") int fkIdUser2);
	
	@Query(value = "Select a from Amizade a where id_usuario_1 = :fkIdUser1")
	Set<Amizade> findInviteByUser1(@Param("fkIdUser1") int fkIdUser1);
	
	@Query(value = "Select a from Amizade a where id_usuario_2 = :fkIdUser2")
	Set<Amizade> findInviteByUser2(@Param("fkIdUser2") int fkIdUser2);

}
