package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Cidade;
import br.com.gamification.persistence.DaoCidade;

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
public class CidadeServiceImp implements CidadeService {

	private static final Logger LOGGER = Logger.getLogger(CidadeServiceImp.class);
	
	@Inject
	DaoCidade daoCidade;

	@Override
	public Cidade get(Integer id) {
		return daoCidade.find(id);
	}
	

	@Override
	public Pager<Cidade> all(PaginationParams paginationParams) {
		Pagination<Cidade> pagination = daoCidade.getAll(paginationParams);
		return new Pager<Cidade>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cidade> filter(PaginationParams paginationParams) {
		List<Cidade> list = daoCidade.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cidade> all() {
		return daoCidade.getAll();
	}

	@Override
	public List<Cidade> search(String description) {
		return new ArrayList<Cidade>();
	}
	
	public List<Cidade> last(LocalDateTime lastSyncDate){
		return daoCidade.last(lastSyncDate);
	}
			
	@Override
	public Cidade save(Cidade entity) {
		return daoCidade.save(entity);
	}

	@Override
	public Cidade update(Cidade entity) {
		return daoCidade.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCidade.delete(id);
	}


}
