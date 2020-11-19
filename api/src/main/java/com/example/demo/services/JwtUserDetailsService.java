
package com.example.demo.services;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.config.UserDetail;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
    private UsuarioRepository userRepository;
	
	@Override
	public UserDetail loadUserByUsername(String email) throws UsernameNotFoundException {
		com.example.demo.model.entities.Usuario u = userRepository.findByEmail(email);
		
		if (u == null) {
			throw new UsernameNotFoundException("Usuário ou senha inválidos");
		}
		
		return new UserDetail(u.getIdUsuario(), email, u.getSenha(),
				new ArrayList<>());
	}
	
	public Usuario loadUserByUserDetail(UserDetails userDetail) throws Exception {
		Usuario u = userRepository.findByEmail(userDetail.getUsername());
		
		if (u == null) {
			throw new UsernameNotFoundException("Usuário ou senha inválidos");
		}
		
		return u;
	}
}