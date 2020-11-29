package com.example.demo.services;

import com.example.demo.dto.AuthSsoDTO;
import com.example.demo.model.entities.AuthSSO;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.AuthSsoRepository;
import com.example.demo.model.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthSsoService {
    @Autowired
    AuthSsoRepository authSsoRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    public Optional<AuthSSO> findById(UUID uuid){
        return authSsoRepository.findById(uuid);
    }

    public Usuario findUsuarioByUuidExterno(String uuidExterno){
        Integer idUsuario = authSsoRepository.findIdUsuarioByUuidExterno(uuidExterno);
        if(idUsuario == null){
            return null;
        }else{
            return usuarioRepository.findById(idUsuario).get();
        }
    }

    public AuthSSO bindUsuario(Usuario usuario, AuthSsoDTO authSsoDTO){
        AuthSSO authSSO = new AuthSSO(usuario, authSsoDTO.getUuid());

        AuthSSO insertedAuthSSO = authSsoRepository.save(authSSO);

        return insertedAuthSSO;
    }

}