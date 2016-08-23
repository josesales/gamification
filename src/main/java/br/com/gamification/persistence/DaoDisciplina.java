package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Disciplina;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterDisciplina;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Disciplina;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoDisciplina extends AccessibleHibernateDao<Disciplina> {
	private static final Logger LOGGER = Logger.getLogger(DaoDisciplina.class);

	public DaoDisciplina() {
		super(Disciplina.class);
	}

	@Override
	public Pagination<Disciplina> getAll(PaginationParams paginationParams) {
		FilterDisciplina filterDisciplina = (FilterDisciplina) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterDisciplina.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterDisciplina.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterDisciplina.getNome(), MatchMode.ANYWHERE));
		}
		if (filterDisciplina.getProfessor() != null) {
			searchCriteria.createAlias("professor", "professor_");
			countCriteria.createAlias("professor", "professor_");
			searchCriteria.add(Restrictions.eq("professor_.id", filterDisciplina.getProfessor()));
			countCriteria.add(Restrictions.eq("professor_.id", filterDisciplina.getProfessor()));
		}

		return new Paginator<Disciplina>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Disciplina> filter(PaginationParams paginationParams) {
		List<Disciplina> list = new ArrayList<Disciplina>();
		FilterDisciplina filterDisciplina = (FilterDisciplina) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterDisciplina.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterDisciplina.getNome()));
		}
		if (filterDisciplina.getProfessor() != null) {
			searchCriteria.createAlias("professor", "professor_");
			searchCriteria.add(Restrictions.eq("professor_.id", filterDisciplina.getProfessor()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
