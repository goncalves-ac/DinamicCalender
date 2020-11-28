package com.example.demo.model.repositories;

import com.example.demo.model.entities.AuthSSO;
import com.example.demo.model.entities.Usuario;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

public interface AuthSsoRepository extends CrudRepository<AuthSSO, UUID> {
    @Override
    Optional<AuthSSO> findById(UUID uuid);

    @Query(value = "SELECT usuario.id_usuario from sso join usuario using(id_usuario) where uuid_externo like :uuidExterno limit 1", nativeQuery = true)
    Integer findIdUsuarioByUuidExterno(String uuidExterno);

    @Query(value = "select * from sso where id_usuario = :idUsuario and uuid_externo = :uuidExterno limit 1", nativeQuery = true)
    Optional<AuthSSO> findByIdUsuarioAndUuid(Integer idUsuario, String uuidExterno);

}