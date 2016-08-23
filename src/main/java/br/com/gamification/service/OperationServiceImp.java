package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Operation;
import br.com.gamification.persistence.DaoOperation;

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
public class OperationServiceImp implements OperationService {

	private static final Logger LOGGER = Logger.getLogger(OperationServiceImp.class);
	
	@Inject
	DaoOperation daoOperation;

	@Override
	public Operation get(Integer id) {
		return daoOperation.find(id);
	}
	

	@Override
	public Pager<Operation> all(PaginationParams paginationParams) {
		Pagination<Operation> pagination = daoOperation.getAll(paginationParams);
		return new Pager<Operation>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Operation> filter(PaginationParams paginationParams) {
		List<Operation> list = daoOperation.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Operation> all() {
		return daoOperation.getAll();
	}

	@Override
	public List<Operation> search(String description) {
		return new ArrayList<Operation>();
	}
	
	public List<Operation> last(LocalDateTime lastSyncDate){
		return daoOperation.last(lastSyncDate);
	}
			
	@Override
	public Operation save(Operation entity) {
		return daoOperation.save(entity);
	}

	@Override
	public Operation update(Operation entity) {
		return daoOperation.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoOperation.delete(id);
	}


}
