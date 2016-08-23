package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Cep;
import br.com.gamification.persistence.DaoCep;

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
public class CepServiceImp implements CepService {

	private static final Logger LOGGER = Logger.getLogger(CepServiceImp.class);
	
	@Inject
	DaoCep daoCep;

	@Override
	public Cep get(Integer id) {
		return daoCep.find(id);
	}
	

	@Override
	public Pager<Cep> all(PaginationParams paginationParams) {
		Pagination<Cep> pagination = daoCep.getAll(paginationParams);
		return new Pager<Cep>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Cep> filter(PaginationParams paginationParams) {
		List<Cep> list = daoCep.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Cep> all() {
		return daoCep.getAll();
	}

	@Override
	public List<Cep> search(String description) {
		return new ArrayList<Cep>();
	}
	
	public List<Cep> last(LocalDateTime lastSyncDate){
		return daoCep.last(lastSyncDate);
	}
			
	@Override
	public Cep save(Cep entity) {
		return daoCep.save(entity);
	}

	@Override
	public Cep update(Cep entity) {
		return daoCep.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoCep.delete(id);
	}


}
