package com.example.demo.model.controllers.test;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.model.entities.Amizade;
import com.example.demo.model.repositories.AmizadeRepository;
import com.example.demo.services.FriendshipService;

import junit.framework.TestCase;


@RunWith(SpringRunner.class)
@ContextConfiguration(classes= {SpringSecurityAuxTestConfig.class})
@SpringBootTest
@AutoConfigureMockMvc
class AmizadeControllerTest extends TestCase {
	
	@MockBean
	public AmizadeRepository amizadeRepository;
	
	@InjectMocks
	private FriendshipService friendshipService;
	
	@Autowired
	private MockMvc mockMvc;
		
	@BeforeEach
	protected void mock() throws Exception {
		final int idUser1 = 1;
		final int idUser2 = 2;
		final int idUser3 = 3;
		final Amizade invite1 = new Amizade(idUser1, idUser2);
		final Amizade invite2 = new Amizade(idUser1, idUser3);
		
		final Set<Amizade> invitesUser1 = new HashSet<Amizade>();
		invitesUser1.add(invite1);
		invitesUser1.add(invite2);
		
		final Set<Amizade> invitesUser2 = new HashSet<Amizade>();
		invitesUser2.add(invite1);
		
		final Set<Amizade> invitesUser3 = new HashSet<Amizade>();
		invitesUser3.add(invite2);
		
		Mockito.when(amizadeRepository.findInviteByUser1(1)).thenReturn(invitesUser1);
		
		Mockito.when(amizadeRepository.findInviteByUser2(2)).thenReturn(invitesUser2);
		
		Mockito.when(amizadeRepository.findInviteByUser2(3)).thenReturn(invitesUser3);
		
	}
	
	@Test
	void givenNoParamId_AndNoAuth_whenGetConvites_thenReturnBadRequest() throws Exception {
		mockMvc.perform(
				get("/amigos")
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isBadRequest());
	}
	
	@Test
	@WithUserDetails("user1@mock.com")
	void givenNoParamId_whenGetConvites_thenReturnAuthUserInvites() throws Exception {
		mockMvc.perform(
				get("/amigos")
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$", hasSize(2)));
	}
	
	@Test
	void givenParamId_whenGetConvites_thenReturnParamIdUserInvites() throws Exception {
		int paramId = 2;
		mockMvc.perform(
				get("/amigos?idUsuario="+paramId)
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$", hasSize(1)));
	}
	
	@Test
	void givenNonExistingUserId_whenGetConvites_thenReturnEmpty() throws Exception {
		mockMvc.perform(
				get("/amigos?idUsuario=4")
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$", hasSize(0)));
	}

}
