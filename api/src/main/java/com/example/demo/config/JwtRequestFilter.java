
package com.example.demo.config;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import com.example.demo.services.JwtUserDetailsService;
import com.example.demo.upload.utils.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

@Autowired
private JwtUserDetailsService jwtUserDetailsService;

@Autowired
private JwtTokenUtil jwtTokenUtil;

private final Set<String> pathsToExcludeFromFilter = 
new HashSet<String>(Arrays.asList(
		"/authenticate", "/unauthenticate", "/sso"));

@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
throws ServletException, IOException {
	
	if (!shouldFilter(request)) {
		chain.doFilter(request, response);
		return;
	}
	
	Cookie jwtCookie = WebUtils.getCookie(request, "jwt-token");


	String username = null;
	String jwtToken = null;

if (jwtCookie!=null) {
	jwtToken = jwtCookie.getValue();
}

try {
	username = jwtTokenUtil.getUsernameFromToken(jwtToken);
} catch (IllegalArgumentException e) {
	System.out.println("Unable to get JWT Token"); 
} catch (ExpiredJwtException e) {
	System.out.println("JWT Token has expired"); 
}


	if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
		UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);

	if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				userDetails, null, userDetails.getAuthorities());
		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

	SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	}
	}

	

	chain.doFilter(request, response);


}

private boolean shouldFilter(HttpServletRequest request) {
	String requestPath = request.getRequestURI();
	String requestMethod = request.getMethod();
	for (String path : pathsToExcludeFromFilter) {
		if (path.equals(requestPath)) {
			return false;
		}
	}
	
	if (requestPath.equals("/usuario") && requestMethod.equals(HttpMethod.POST.toString())) {
		return false;
	}
	
	return true;
	
}

}