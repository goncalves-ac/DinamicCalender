package com.example.demo.config;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.Arrays;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

@Autowired
private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

@Autowired
private UserDetailsService jwtUserDetailsService;

@Autowired
private JwtRequestFilter jwtRequestFilter;

@Autowired
public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
}

@Bean
public PasswordEncoder passwordEncoder() {
return new BCryptPasswordEncoder();
}

@Bean
public ModelMapper modelMapper() {
	return new ModelMapper();
}

@Bean
@Override
public AuthenticationManager authenticationManagerBean() throws Exception {
return super.authenticationManagerBean();
}

@Bean
public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
    StrictHttpFirewall firewall = new StrictHttpFirewall();
    firewall.setAllowUrlEncodedSlash(true);
    firewall.setAllowUrlEncodedDoubleSlash(true);
    firewall.setAllowSemicolon(true);
    return firewall;
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
    configuration.setAllowCredentials(true);
    configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

@Override
protected void configure(HttpSecurity httpSecurity) throws Exception {
httpSecurity.cors().and().csrf().disable()
.authorizeRequests()
.antMatchers(HttpMethod.POST, "/unauthenticate/**").permitAll()
.antMatchers(HttpMethod.POST, "/authenticate/**").permitAll()
.antMatchers(HttpMethod.POST, "/usuario").permitAll()
.antMatchers(HttpMethod.PATCH, "/usuario").permitAll()
.antMatchers(HttpMethod.POST, "/usuario/recover-password").permitAll()
.antMatchers(HttpMethod.GET, "/usuario/**").permitAll()
.antMatchers(HttpMethod.GET, "/amigos/**").permitAll()
.antMatchers(HttpMethod.GET, "/static/**").permitAll()
.anyRequest().authenticated().and().
exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
}

}