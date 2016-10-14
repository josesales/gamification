package br.com.gamification.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.jca.context.SpringContextResourceAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.rs.exception.ValidationException;
import br.com.gamification.core.security.SpringSecurityUserContext;
import br.com.gamification.model.Aluno;
import br.com.gamification.model.Role;
import br.com.gamification.model.User;
import br.com.gamification.model.filter.FilterUser;
import br.com.gamification.persistence.DaoUser;

/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@Transactional
public class UserServiceImp implements UserService {

	private static final Logger LOGGER = Logger.getLogger(UserServiceImp.class);
	
	@Inject
	DaoUser daoUser;
	@Inject
	AlunoService alunoService;
	@Inject
	RoleService roleService;
	@Inject
	SpringSecurityUserContext context;

	@Override
	public User get(Integer id) {
		return daoUser.find(id);
	}
	

	@Override
	public Pager<User> all(PaginationParams paginationParams) {
		Pagination<User> pagination = daoUser.getAll(paginationParams);
		return new Pager<User>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<User> filter(PaginationParams paginationParams) {
		List<User> list = daoUser.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<User> all() {
		return daoUser.getAll();
	}

	@Override
	public List<User> search(String description) {
		return new ArrayList<User>();
	}
	
	public List<User> last(LocalDateTime lastSyncDate){
		return daoUser.last(lastSyncDate);
	}
			
	@Override
	public User save(User entity) {
		
		entity.setPassword(criptografarSenha(entity.getPassword()));
		return daoUser.save(entity);
	}

	@Override
	public User update(User entity) {
		return daoUser.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoUser.delete(id);
	}
	
	@Override
	public User cadastrarUsuarioAluno(User entity) {
		validar(entity);
		entity.setEnable(true);
		//obtendo perfil do aluno
		Role perfilAluno = roleService.get(1);
		entity.addRoles(perfilAluno);
		
		//Criptografa senha
		entity.setPassword(criptografarSenha(entity.getPassword()));
		User usuarioSalvo = daoUser.save(entity);
		//Salva aluno
		Aluno aluno = new Aluno();
		aluno.setNome(usuarioSalvo.getName());
		aluno.setUsuario(usuarioSalvo);
		alunoService.save(aluno);
		
		return usuarioSalvo;
	}
	
	public User getUsuarioLogado() {
		User user = context.getCurrentUser();
		return user;
	}
	
	private String criptografarSenha(String senha) {
		//Criptografa senha
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(senha);
		return hashedPassword;
	}
	
	private void validar(User user){
		//verifica se ja nao existe usuario com o mesmo nome
		
		FilterUser filterUser = new FilterUser();
		filterUser.setUsername(user.getUsername());
		List<User> listaUsuario = daoUser.filter(filterUser);
		if(listaUsuario != null && !listaUsuario.isEmpty()) {
			throw new ValidationException("Cadastro não realizado. Usuário já existente!");
		}
	}
	

}
