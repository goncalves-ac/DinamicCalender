package com.example.demo.model.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UsuarioResponseDTO;
import com.example.demo.model.entities.JwtRequest;
import com.example.demo.model.entities.JwtResponse;
import com.example.demo.model.entities.Usuario;
import com.example.demo.services.JwtUserDetailsService;
import com.example.demo.utils.JwtCookieUtil;
import com.example.demo.utils.JwtTokenUtil;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

@Autowired
private AuthenticationManager authenticationManager;

@Autowired
private JwtTokenUtil jwtTokenUtil;

@Autowired
private JwtUserDetailsService userDetailsService;

@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authRequest) throws Exception {
	authenticate(authRequest.getUsername(), authRequest.getPassword());
	final UserDetails userDetails = userDetailsService
			.loadUserByUsername(authRequest.getUsername());
	final String token = jwtTokenUtil.generateToken(userDetails);
	final Usuario userInfo = userDetailsService.loadUserByUserDetail(userDetails);
return ResponseEntity.ok()
		.header(HttpHeaders.SET_COOKIE, JwtCookieUtil.getCookieForToken(token))
		.body(new JwtResponse(new UsuarioResponseDTO(userInfo),
		jwtTokenUtil.getExpirationDateFromToken(token)));
}

@RequestMapping(value = "/unauthenticate", method = RequestMethod.POST)
public ResponseEntity<?> logout(Authentication auth) throws Exception {
	
return ResponseEntity.ok()
		.header(HttpHeaders.SET_COOKIE, JwtCookieUtil.clearCookieForToken())
		.build();
}


private void authenticate(String username, String password) throws Exception {
try {
	authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
} catch (DisabledException e) {
	throw new Exception("USER_DISABLED", e);
} catch (BadCredentialsException e) {
	throw new Exception("INVALID_CREDENTIALS", e);
}
}



}