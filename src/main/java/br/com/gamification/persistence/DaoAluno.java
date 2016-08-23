package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Aluno;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterAluno;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Aluno;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoAluno extends AccessibleHibernateDao<Aluno> {
	private static final Logger LOGGER = Logger.getLogger(DaoAluno.class);

	public DaoAluno() {
		super(Aluno.class);
	}

	@Override
	public Pagination<Aluno> getAll(PaginationParams paginationParams) {
		FilterAluno filterAluno = (FilterAluno) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterAluno.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterAluno.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterAluno.getNome(), MatchMode.ANYWHERE));
		}
		if (filterAluno.getUsuario() != null) {
			searchCriteria.createAlias("usuario", "usuario_");
			countCriteria.createAlias("usuario", "usuario_");
			searchCriteria.add(Restrictions.eq("usuario_.id", filterAluno.getUsuario()));
			countCriteria.add(Restrictions.eq("usuario_.id", filterAluno.getUsuario()));
		}

		return new Paginator<Aluno>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Aluno> filter(PaginationParams paginationParams) {
		List<Aluno> list = new ArrayList<Aluno>();
		FilterAluno filterAluno = (FilterAluno) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterAluno.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterAluno.getNome()));
		}
		if (filterAluno.getUsuario() != null) {
			searchCriteria.createAlias("usuario", "usuario_");
			searchCriteria.add(Restrictions.eq("usuario_.id", filterAluno.getUsuario()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
