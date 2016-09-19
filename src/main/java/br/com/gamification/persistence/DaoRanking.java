package br.com.gamification.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;
import br.com.gamification.model.Ranking;
import br.com.gamification.model.filter.FilterRanking;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoRanking extends AccessibleHibernateDao<Ranking> {
	private static final Logger LOGGER = Logger.getLogger(DaoRanking.class);

	public DaoRanking() {
		super(Ranking.class);
	}

	@Override
	public Pagination<Ranking> getAll(PaginationParams paginationParams) {
		FilterRanking filterRanking = (FilterRanking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterRanking.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterRanking.getPontos()));
			countCriteria.add(Restrictions.eq("pontos", filterRanking.getPontos()));
		}				
		if (filterRanking.getDisciplina() != null) {
			searchCriteria.createAlias("disciplina", "disciplina_");
			countCriteria.createAlias("disciplina", "disciplina_");
			searchCriteria.add(Restrictions.eq("disciplina_.id", filterRanking.getDisciplina()));
			countCriteria.add(Restrictions.eq("disciplina_.id", filterRanking.getDisciplina()));
		}
		if (filterRanking.getAluno() != null) {
			searchCriteria.createAlias("aluno", "aluno_");
			countCriteria.createAlias("aluno", "aluno_");
			searchCriteria.add(Restrictions.eq("aluno_.id", filterRanking.getAluno()));
			countCriteria.add(Restrictions.eq("aluno_.id", filterRanking.getAluno()));
		}
		
		searchCriteria.addOrder(Order.desc("pontos"));

		return new Paginator<Ranking>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Ranking> filter(PaginationParams paginationParams) {
		List<Ranking> list = new ArrayList<Ranking>();
		FilterRanking filterRanking = (FilterRanking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterRanking.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterRanking.getPontos()));
		}
		if (filterRanking.getDisciplina() != null) {
			searchCriteria.createAlias("disciplina", "disciplina_");
			searchCriteria.add(Restrictions.eq("disciplina_.id", filterRanking.getDisciplina()));
		}
		if (filterRanking.getAluno() != null) {
			searchCriteria.createAlias("aluno", "aluno_");
			searchCriteria.add(Restrictions.eq("aluno_.id", filterRanking.getAluno()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
	public List<Ranking> filter(FilterRanking filterRanking) {
		List<Ranking> list = new ArrayList<Ranking>();
		Criteria searchCriteria = criteria();
		if (filterRanking.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterRanking.getPontos()));
		}
		if (filterRanking.getDisciplina() != null) {
			searchCriteria.createAlias("disciplina", "disciplina_");
			searchCriteria.add(Restrictions.eq("disciplina_.id", filterRanking.getDisciplina()));
		}
		if (filterRanking.getAluno() != null) {
			searchCriteria.createAlias("aluno", "aluno_");
			searchCriteria.add(Restrictions.eq("aluno_.id", filterRanking.getAluno()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
