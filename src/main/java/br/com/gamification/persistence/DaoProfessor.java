package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Professor;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterProfessor;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Professor;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoProfessor extends AccessibleHibernateDao<Professor> {
	private static final Logger LOGGER = Logger.getLogger(DaoProfessor.class);

	public DaoProfessor() {
		super(Professor.class);
	}

	@Override
	public Pagination<Professor> getAll(PaginationParams paginationParams) {
		FilterProfessor filterProfessor = (FilterProfessor) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterProfessor.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterProfessor.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterProfessor.getNome(), MatchMode.ANYWHERE));
		}
		if (filterProfessor.getUsuario() != null) {
			searchCriteria.createAlias("usuario", "usuario_");
			countCriteria.createAlias("usuario", "usuario_");
			searchCriteria.add(Restrictions.eq("usuario_.id", filterProfessor.getUsuario()));
			countCriteria.add(Restrictions.eq("usuario_.id", filterProfessor.getUsuario()));
		}

		return new Paginator<Professor>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Professor> filter(PaginationParams paginationParams) {
		List<Professor> list = new ArrayList<Professor>();
		FilterProfessor filterProfessor = (FilterProfessor) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterProfessor.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterProfessor.getNome()));
		}
		if (filterProfessor.getUsuario() != null) {
			searchCriteria.createAlias("usuario", "usuario_");
			searchCriteria.add(Restrictions.eq("usuario_.id", filterProfessor.getUsuario()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
