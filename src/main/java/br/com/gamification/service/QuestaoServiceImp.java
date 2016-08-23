package br.com.gamification.service;

import java.util.List;
import org.apache.log4j.Logger;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;


import br.com.gamification.model.Questao;
import br.com.gamification.persistence.DaoQuestao;

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
public class QuestaoServiceImp implements QuestaoService {

	private static final Logger LOGGER = Logger.getLogger(QuestaoServiceImp.class);
	
	@Inject
	DaoQuestao daoQuestao;

	@Override
	public Questao get(Integer id) {
		return daoQuestao.find(id);
	}
	

	@Override
	public Pager<Questao> all(PaginationParams paginationParams) {
		Pagination<Questao> pagination = daoQuestao.getAll(paginationParams);
		return new Pager<Questao>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Questao> filter(PaginationParams paginationParams) {
		List<Questao> list = daoQuestao.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Questao> all() {
		return daoQuestao.getAll();
	}

	@Override
	public List<Questao> search(String description) {
		return new ArrayList<Questao>();
	}
	
	public List<Questao> last(LocalDateTime lastSyncDate){
		return daoQuestao.last(lastSyncDate);
	}
			
	@Override
	public Questao save(Questao entity) {
		return daoQuestao.save(entity);
	}

	@Override
	public Questao update(Questao entity) {
		return daoQuestao.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoQuestao.delete(id);
	}


}
