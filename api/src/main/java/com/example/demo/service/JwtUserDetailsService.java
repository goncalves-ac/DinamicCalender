
package com.example.demo.service;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.config.UserDetail;
import com.example.demo.dto.UserAuthDTO;
import com.example.demo.model.repositories.UsuarioRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
    private UsuarioRepository userRepository;
	
	@Override
	public UserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
		com.example.demo.model.entities.Usuario user = userRepository.findByEmail(email);
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}
		
		return new UserDetail(user.getIdUsuario(), email, user.getSenha(),
				new ArrayList<>());
	}
}