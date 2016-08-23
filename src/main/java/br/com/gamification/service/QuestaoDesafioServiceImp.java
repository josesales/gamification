package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.QuestaoDesafio;
import br.com.gamification.persistence.DaoQuestaoDesafio;

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
public class QuestaoDesafioServiceImp implements QuestaoDesafioService {

	private static final Logger LOGGER = Logger.getLogger(QuestaoDesafioServiceImp.class);
	
	@Inject
	DaoQuestaoDesafio daoQuestaoDesafio;

	@Override
	public QuestaoDesafio get(Integer id) {
		return daoQuestaoDesafio.find(id);
	}
	

	@Override
	public Pager<QuestaoDesafio> all(PaginationParams paginationParams) {
		Pagination<QuestaoDesafio> pagination = daoQuestaoDesafio.getAll(paginationParams);
		return new Pager<QuestaoDesafio>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<QuestaoDesafio> filter(PaginationParams paginationParams) {
		List<QuestaoDesafio> list = daoQuestaoDesafio.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<QuestaoDesafio> all() {
		return daoQuestaoDesafio.getAll();
	}

	@Override
	public List<QuestaoDesafio> search(String description) {
		return new ArrayList<QuestaoDesafio>();
	}
	
	public List<QuestaoDesafio> last(LocalDateTime lastSyncDate){
		return daoQuestaoDesafio.last(lastSyncDate);
	}
			
	@Override
	public QuestaoDesafio save(QuestaoDesafio entity) {
		return daoQuestaoDesafio.save(entity);
	}

	@Override
	public QuestaoDesafio update(QuestaoDesafio entity) {
		return daoQuestaoDesafio.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoQuestaoDesafio.delete(id);
	}


}
