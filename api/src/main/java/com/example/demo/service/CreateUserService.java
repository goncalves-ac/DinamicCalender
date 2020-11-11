package com.example.demo.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.exception.DuplicateEmailException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;

@Service
public class CreateUserService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UsuarioRepository userRepository;
	
	public CreateUserService() {
	}
	
	@Transactional
	public Usuario createUserAccount(Usuario user) throws DuplicateEmailException{
		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new DuplicateEmailException(user.getEmail());
		}
		user.setSenha(passwordEncoder.encode(user.getSenha()));
		Usuario savedUser = userRepository.save(user);
		
		return savedUser;
	}
}
