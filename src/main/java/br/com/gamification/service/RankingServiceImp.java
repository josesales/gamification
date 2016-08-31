package br.com.gamification.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.model.Ranking;
import br.com.gamification.persistence.DaoRanking;

/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@Transactional
public class RankingServiceImp implements RankingService {

	private static final Logger LOGGER = Logger.getLogger(RankingServiceImp.class);
	
	@Inject
	DaoRanking daoRanking;

	@Override
	public Ranking get(Integer id) {
		return daoRanking.find(id);
	}
	

	@Override
	public Pager<Ranking> all(PaginationParams paginationParams) {
		Pagination<Ranking> pagination = daoRanking.getAll(paginationParams);
		return new Pager<Ranking>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Ranking> filter(PaginationParams paginationParams) {
		List<Ranking> list = daoRanking.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Ranking> all() {
		return daoRanking.getAll();
	}

	@Override
	public List<Ranking> search(String description) {
		return new ArrayList<Ranking>();
	}
	
	public List<Ranking> last(LocalDateTime lastSyncDate){
		return daoRanking.last(lastSyncDate);
	}
			
	@Override
	public Ranking save(Ranking entity) {
		return daoRanking.save(entity);
	}

	@Override
	public Ranking update(Ranking entity) {
		return daoRanking.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoRanking.delete(id);
	}


	@Override
	public Pager<Ranking> filtraDisciplinasAluno(PaginationParams paginationParams) {
		Pagination<Ranking> pagination = daoRanking.getAll(paginationParams);
		return new Pager<Ranking>(pagination.getResults(), 0, pagination.getTotalRecords());
	}




}
