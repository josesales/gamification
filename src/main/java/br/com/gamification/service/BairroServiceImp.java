package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Bairro;
import br.com.gamification.persistence.DaoBairro;

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
public class BairroServiceImp implements BairroService {

	private static final Logger LOGGER = Logger.getLogger(BairroServiceImp.class);
	
	@Inject
	DaoBairro daoBairro;

	@Override
	public Bairro get(Integer id) {
		return daoBairro.find(id);
	}
	

	@Override
	public Pager<Bairro> all(PaginationParams paginationParams) {
		Pagination<Bairro> pagination = daoBairro.getAll(paginationParams);
		return new Pager<Bairro>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Bairro> filter(PaginationParams paginationParams) {
		List<Bairro> list = daoBairro.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Bairro> all() {
		return daoBairro.getAll();
	}

	@Override
	public List<Bairro> search(String description) {
		return new ArrayList<Bairro>();
	}
	
	public List<Bairro> last(LocalDateTime lastSyncDate){
		return daoBairro.last(lastSyncDate);
	}
			
	@Override
	public Bairro save(Bairro entity) {
		return daoBairro.save(entity);
	}

	@Override
	public Bairro update(Bairro entity) {
		return daoBairro.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoBairro.delete(id);
	}


}
