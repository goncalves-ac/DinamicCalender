package com.example.demo.services;

import java.util.Set;

import javax.validation.ConstraintViolation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.NovaSenhaRequestDTO;
import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.DuplicateEntryException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UnauthorizedException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;
import com.example.demo.upload.utils.FileUploadUtil;
import com.example.demo.upload.utils.OldNewImgFileState;
import com.example.demo.validation.EntityValidator;

@Service
public class UserService {
	@Autowired	
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UsuarioRepository userRepository;
	
	private final EntityValidator<Usuario> usuarioValidator = new EntityValidator<Usuario>();
	public UserService() {
	}
	
	@Transactional
	public Usuario createUser(Usuario user) throws Exception {
		Set<ConstraintViolation<Usuario>> constraintViolations = usuarioValidator.validate(user);
		
		if (!constraintViolations.isEmpty()) {
			throw new BadRequestException(constraintViolations.iterator().next().getMessage());
		}
		
		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new DuplicateEntryException(user.getEmail() + " já está cadastrado.");
		}
		
		if (user.getSenha().length() < 8 || user.getSenha()==null) {
			throw new BadRequestException("A senha deve conter pelo menos 8 caractéres");
		}
		
		
		user.setSenha(passwordEncoder.encode(user.getSenha()));
		Usuario u = userRepository.save(user);
		
		return u;
	}
	
	@Transactional(readOnly = true)
	public Usuario findUserById(int id) throws Exception {
		Usuario u = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
		return u;
	}
	
	@Transactional(readOnly = true)
	public Set<Usuario> findUsersByNome(String nome) throws Exception {
		Set<Usuario> u = userRepository.findByNome(nome);
		
		if (u == null || u.isEmpty()) {
			throw new ResourceNotFoundException("Nenhum usuário pode ser encontrado");
		}
		
		return u;
	}
  
	@Transactional(rollbackFor = Exception.class)
	public Usuario updateUser(int id, Usuario dadosUsuario) throws Exception {	
    	Usuario u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
    	
    	if (dadosUsuario.getEmail() != null && !dadosUsuario.getEmail().equals(u.getEmail())) {
    		if (userRepository.findByEmail(dadosUsuario.getEmail()) != null) {
    			throw new DuplicateEntryException(dadosUsuario.getEmail() + " já está cadastrado.");
    		}
    		u.setEmail(dadosUsuario.getEmail());
    	}
    	
    	if (dadosUsuario.getNome() != null && dadosUsuario.getNome() != u.getNome()) {
    		u.setNome(dadosUsuario.getNome());
    	}
    	
    	if (dadosUsuario.getSobrenome() != null && dadosUsuario.getSobrenome() != u.getSobrenome()) {
    		u.setSobrenome(dadosUsuario.getSobrenome());
    	}
    	
    	if (dadosUsuario.getNascimento() != null && dadosUsuario.getNascimento() != u.getNascimento()) {
    		u.setNascimento(dadosUsuario.getNascimento());
    	}
    	
    	if (dadosUsuario.getGenero() != null && dadosUsuario.getGenero() != u.getGenero()) {
    		u.setGenero(dadosUsuario.getGenero());
    	}
    	
    	if (dadosUsuario.getAvatarUrl() != null && dadosUsuario.getAvatarUrl() != u.getAvatarUrl()) {
    		u.setAvatarUrl(dadosUsuario.getAvatarUrl());
    	}
    	
    	if (dadosUsuario.getDescricao() != null && !dadosUsuario.getDescricao().equals(u.getDescricao())) {
    		u.setDescricao(dadosUsuario.getDescricao());
    	}
    	
		Set<ConstraintViolation<Usuario>> constraintViolations = usuarioValidator.validate(u);
		
		if (!constraintViolations.isEmpty()) {
			throw new BadRequestException(constraintViolations.iterator().next().getMessage());
		}
    	
        userRepository.save(u);
        return u;
		
	}
	
	@Transactional
	public Usuario changeUserPassword(int id, NovaSenhaRequestDTO novaSenhaDTO) throws Exception {
		Usuario u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
		if (!passwordEncoder.matches(novaSenhaDTO.getSenhaAtual(), u.getSenha())) {
			throw new UnauthorizedException("Senha atual incorreta.");
		}
		
		if (novaSenhaDTO.getNovaSenha().length() < 8 || novaSenhaDTO.getNovaSenha()==null) {
			throw new BadRequestException("A nova senha deve conter pelo menos 8 caractéres");
		}
		
		if (passwordEncoder.matches(novaSenhaDTO.getNovaSenha(), u.getSenha())) {
			throw new BadRequestException("A nova senha deve ser diferente da atual.");
		}
		
			String senha = passwordEncoder.encode(novaSenhaDTO.getNovaSenha());
			u.setSenha(senha);
			
			userRepository.save(u);
			return u;
		
	}
	
	@Transactional 
	public void deleteUserById(int id) throws Exception {
		userRepository.deleteById(id);
	}
	
	public OldNewImgFileState changeUserAvatarImg(int id, MultipartFile avatarImg) throws Exception {
		Usuario u = userRepository.findById(id).get();
		
		if (u==null) {
			throw new ResourceNotFoundException("Usuário não encontrado");
		}
		
		String newImgUri = FileUploadUtil.saveFile(avatarImg, true);
		MultipartFile oldImg = null;
		if (u.getAvatarUrl() != null) {
			oldImg = FileUploadUtil.getFile(u.getAvatarUrl());
			if (oldImg != null) {
				FileUploadUtil.deleteFile(u.getAvatarUrl());
			}
		}
		
		return new OldNewImgFileState(newImgUri, oldImg);

	}
}
