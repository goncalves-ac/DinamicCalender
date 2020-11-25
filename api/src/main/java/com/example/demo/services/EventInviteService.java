package com.example.demo.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.entities.ConviteEvento;
import com.example.demo.model.repositories.ConviteEventoRepository;

@Service
public class EventInviteService {
	
	@Autowired
	private ConviteEventoRepository conviteRepository;
	
	public EventInviteService() {}
	
	private void persistInvite(ConviteEvento c) throws Exception {
		ConviteEvento conviteExiste = conviteRepository
				.findSpecificInvite(c.getFkIdEvento(), c.getFkIdUsuario());
			if (conviteExiste == null) {
				conviteRepository.save(c);
			}
	}
	
	private void deleteInvite(ConviteEvento c) throws Exception {
		ConviteEvento conviteExiste = conviteRepository
				.findSpecificInvite(c.getFkIdEvento(), c.getFkIdUsuario());
		if (conviteExiste != null) {
			conviteRepository.deleteById(conviteExiste.getIdUsuarioEvento());
		}
	}
	
	@Transactional(readOnly = true)
	public Set<ConviteEvento> getEventInvitesByUser(int idUser) throws Exception {
		Set<ConviteEvento> invites = conviteRepository.findInvitesByUser(idUser);
		return invites;
	}
	
	@Transactional(readOnly = true)
	public Set<ConviteEvento> getEventInvitesByUserAndStatus(int idUser, String status) throws Exception {
		Set<ConviteEvento> invites = conviteRepository.findInvitesByUserAndStatus(idUser, status);
		return invites;
	}
	
	@Transactional(readOnly = true)
	public Set<ConviteEvento> getEventInvitesByEvent(int idEvento) throws Exception {
		Set<ConviteEvento> invites = conviteRepository.findInvitesByEvent(idEvento);
		return invites;
	}
	
	@Transactional
	public ConviteEvento acceptRejectInvite(int idEvento, int idUsuario, String status) throws Exception {
		ConviteEvento invite = conviteRepository.findSpecificInvite(idEvento, idUsuario);
    	if (invite==null) {
			throw new ResourceNotFoundException("Convite não existe.");
    	}
    	
    	invite.setStatus(status);
		return conviteRepository.save(invite);
	}
		
	
	
	@Transactional
	public boolean createEventInvites(int idEvento, Set<Integer> idsUsuarios) throws Exception {
			for (int idUsuario : idsUsuarios) {
				ConviteEvento c = new ConviteEvento(idEvento, idUsuario);
				this.persistInvite(c);
			}
			return true;
	}
	
	@Transactional
	public Set<ConviteEvento> updateEventInvites(int idEvento, Set<Integer> idsUsuarios) throws Exception {
					Set<ConviteEvento> convitesDoEvento = conviteRepository.findInvitesByEvent(idEvento);
			for (ConviteEvento convite : convitesDoEvento) {
				if (!idsUsuarios.contains(convite.getFkIdUsuario())) {
					this.deleteInvite(convite);
				}
			}
			
			List<Integer> idsUsuariosConvidados = convitesDoEvento.stream().map(x -> x.getFkIdUsuario())
					.collect(Collectors.toList());
			
			
			for (Integer idUsuario : idsUsuarios) {
				if (!idsUsuariosConvidados.contains(idUsuario)) {
					ConviteEvento convite = new ConviteEvento(idEvento, idUsuario);
					this.persistInvite(convite);
				}
			}
			
			return convitesDoEvento;
			
	}

}
