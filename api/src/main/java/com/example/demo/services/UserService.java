package com.example.demo.services;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.ConstraintViolation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.NovaSenhaRequestDTO;
import com.example.demo.dto.RecoverPasswordDTO;
import com.example.demo.dto.UpdateUserReturnDTO;
import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.DuplicateEntryException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UnauthorizedException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;
import com.example.demo.utils.FileUploadUtil;
import com.example.demo.utils.JwtTokenUtil;
import com.example.demo.utils.Mail;
import com.example.demo.utils.MailSenderUtil;
import com.example.demo.utils.OldNewImgFileState;
import com.example.demo.validation.EntityValidator;

@Service
public class UserService {
	@Autowired	
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UsuarioRepository userRepository;

	public Usuario findByEmail(String email){
		return userRepository.findByEmail(email);
	}

	@Autowired
	private JwtTokenUtil tokenUtil;
	
	@Autowired
	private MailSenderUtil mailUtil;

	@Value("${app.root.url}")
	private String appUrl;

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
	public UpdateUserReturnDTO updateUser(int id, Usuario dadosUsuario) throws Exception {	
    	Usuario u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
    	UpdateUserReturnDTO dto = new UpdateUserReturnDTO(null, false);
    	if (dadosUsuario.getEmail() != null && !dadosUsuario.getEmail().equals(u.getEmail())) {
    		if (userRepository.findByEmail(dadosUsuario.getEmail()) != null) {
    			throw new DuplicateEntryException(dadosUsuario.getEmail() + " já está cadastrado.");
    		}
    		u.setEmail(dadosUsuario.getEmail());
    		dto.setHasChangedEmail(true);
    		    			
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
        dto.setUsuario(u);
        return dto;
		
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
	public Usuario changeUserPasswordWithRecover(String email, NovaSenhaRequestDTO novaSenhaDTO) throws Exception {
		
		Usuario u = userRepository.findByEmail(email);
		
		if (u==null) {
			throw new ResourceNotFoundException("Usuário não pode ser encontrado");
		}
		
		
		if (novaSenhaDTO.getNovaSenha().length() < 8 || novaSenhaDTO.getNovaSenha()==null) {
			throw new BadRequestException("A nova senha deve conter pelo menos 8 caractéres");
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
	
	@Transactional
	public void recoverPassword(RecoverPasswordDTO dto) throws Exception {
		Usuario u = userRepository.findByEmail(dto.getEmail());
		
		if (u==null) {
			throw new ResourceNotFoundException("Usuário não cadastrado.");
		}
		
		String token = tokenUtil.generateToken(dto.getEmail());
		Mail mail = new Mail();
		
		mail.setSubject("Recuperação de Senha - Calendário Dinâmico");
		mail.setTo(dto.getEmail());
		mail.setMessage(
				"Siga esse link para alterar sua senha:\n\n "+ appUrl+"/recuperarsenha/"+token+
				"\n\nSe não foi você que requisitou essa alteração, apenas ignore esse email.\n\n"
				+"Calendário Dinâmico");
		mailUtil.sendMail(mail);
		
	}
	
	@Transactional(rollbackFor = Exception.class)
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
