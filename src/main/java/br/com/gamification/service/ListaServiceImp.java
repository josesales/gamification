package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Lista;
import br.com.gamification.persistence.DaoLista;

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
public class ListaServiceImp implements ListaService {

	private static final Logger LOGGER = Logger.getLogger(ListaServiceImp.class);
	
	@Inject
	DaoLista daoLista;

	@Override
	public Lista get(Integer id) {
		return daoLista.find(id);
	}
	

	@Override
	public Pager<Lista> all(PaginationParams paginationParams) {
		Pagination<Lista> pagination = daoLista.getAll(paginationParams);
		return new Pager<Lista>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Lista> filter(PaginationParams paginationParams) {
		List<Lista> list = daoLista.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Lista> all() {
		return daoLista.getAll();
	}

	@Override
	public List<Lista> search(String description) {
		return new ArrayList<Lista>();
	}
	
	public List<Lista> last(LocalDateTime lastSyncDate){
		return daoLista.last(lastSyncDate);
	}
			
	@Override
	public Lista save(Lista entity) {
		return daoLista.save(entity);
	}

	@Override
	public Lista update(Lista entity) {
		return daoLista.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoLista.delete(id);
	}


}
