package com.example.demo.model.controllers.test;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.demo.config.UserDetail;
import com.example.demo.model.entities.Usuario;
import com.example.demo.util.CustomInMemoryUserDetailsManager;

@TestConfiguration
public class SpringSecurityAuxTestConfig {
	

	@Bean
	@Primary
	public UserDetailsService userDetailsService() {
		final Date birthDate = new Date();
		
		Usuario user1 = new Usuario
				("Teste", "Teste", birthDate, "M",
						"user1@mock.com", "12345678", "");
		user1.setIdUsuario(1);
		UserDetail user1Details = new UserDetail(
				user1.getIdUsuario(),
				user1.getEmail(),
				user1.getSenha(),
				new ArrayList<GrantedAuthority>());
		
		Usuario user2 = new Usuario(
				"Teste", "Teste", birthDate, "M",
						"user2@mock.com", "12345678", "");
		user2.setIdUsuario(2);
		UserDetail user2Details = new UserDetail(
				user2.getIdUsuario(),
				user2.getEmail(),
				user2.getSenha(),
				new ArrayList<GrantedAuthority>());
		
		Usuario user3 = new Usuario(
				"Teste", "Teste", birthDate, "M",
						"user3@mock.com", "12345678", "");
		user2.setIdUsuario(3);
		UserDetail user3Details = new UserDetail(
				user3.getIdUsuario(),
				user3.getEmail(),
				user3.getSenha(),
				new ArrayList<GrantedAuthority>());
		
		Collection<UserDetail> users = new HashSet<UserDetail>();
		users.add(user1Details);
		users.add(user2Details);
		users.add(user3Details);
		
		return new CustomInMemoryUserDetailsManager(users);
	}
	
			
}
