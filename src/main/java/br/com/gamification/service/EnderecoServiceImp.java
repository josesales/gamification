package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Endereco;
import br.com.gamification.persistence.DaoEndereco;

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
public class EnderecoServiceImp implements EnderecoService {

	private static final Logger LOGGER = Logger.getLogger(EnderecoServiceImp.class);
	
	@Inject
	DaoEndereco daoEndereco;

	@Override
	public Endereco get(Integer id) {
		return daoEndereco.find(id);
	}
	

	@Override
	public Pager<Endereco> all(PaginationParams paginationParams) {
		Pagination<Endereco> pagination = daoEndereco.getAll(paginationParams);
		return new Pager<Endereco>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Endereco> filter(PaginationParams paginationParams) {
		List<Endereco> list = daoEndereco.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Endereco> all() {
		return daoEndereco.getAll();
	}

	@Override
	public List<Endereco> search(String description) {
		return new ArrayList<Endereco>();
	}
	
	public List<Endereco> last(LocalDateTime lastSyncDate){
		return daoEndereco.last(lastSyncDate);
	}
			
	@Override
	public Endereco save(Endereco entity) {
		return daoEndereco.save(entity);
	}

	@Override
	public Endereco update(Endereco entity) {
		return daoEndereco.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoEndereco.delete(id);
	}


}
