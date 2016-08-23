package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Professor;
import br.com.gamification.persistence.DaoProfessor;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.utils.DateUtil;
import br.com.gamification.core.utils.Util;

/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@Transactional
public class ProfessorServiceImp implements ProfessorService {

	private static final Logger LOGGER = Logger.getLogger(ProfessorServiceImp.class);
	
	@Inject
	DaoProfessor daoProfessor;

	@Override
	public Professor get(Integer id) {
		return daoProfessor.find(id);
	}
	

	@Override
	public Pager<Professor> all(PaginationParams paginationParams) {
		Pagination<Professor> pagination = daoProfessor.getAll(paginationParams);
		return new Pager<Professor>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Professor> filter(PaginationParams paginationParams) {
		List<Professor> list = daoProfessor.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Professor> all() {
		return daoProfessor.getAll();
	}

	@Override
	public List<Professor> search(String description) {
		return new ArrayList<Professor>();
	}
	
	public List<Professor> last(LocalDateTime lastSyncDate){
		return daoProfessor.last(lastSyncDate);
	}
			
	@Override
	public Professor save(Professor entity) {
		return daoProfessor.save(entity);
	}

	@Override
	public Professor update(Professor entity) {
		return daoProfessor.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoProfessor.delete(id);
	}


}
