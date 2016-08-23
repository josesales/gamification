package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.User;
import br.com.gamification.persistence.DaoUser;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.utils.DateUtil;
import br.com.gamification.core.utils.Util;

/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@Transactional
public class UserServiceImp implements UserService {

	private static final Logger LOGGER = Logger.getLogger(UserServiceImp.class);
	
	@Inject
	DaoUser daoUser;

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


}
