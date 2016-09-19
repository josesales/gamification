package br.com.gamification.persistence;

import javax.inject.Named;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Lista;
import br.com.gamification.model.ListaAluno;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterLista;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;
import br.com.gamification.model.Lista;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoLista extends AccessibleHibernateDao<Lista> {
	private static final Logger LOGGER = Logger.getLogger(DaoLista.class);

	public DaoLista() {
		super(Lista.class);
	}

	@Override
	public Pagination<Lista> getAll(PaginationParams paginationParams) {
		FilterLista filterLista = (FilterLista) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterLista.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterLista.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterLista.getNome(), MatchMode.ANYWHERE));
		}
		if (filterLista.getDisciplina() != null) {
			searchCriteria.createAlias("disciplina", "disciplina_");
			countCriteria.createAlias("disciplina", "disciplina_");
			searchCriteria.add(Restrictions.eq("disciplina_.id", filterLista.getDisciplina()));
			countCriteria.add(Restrictions.eq("disciplina_.id", filterLista.getDisciplina()));
		}

		return new Paginator<Lista>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Lista> filter(PaginationParams paginationParams) {
		List<Lista> list = new ArrayList<Lista>();
		FilterLista filterLista = (FilterLista) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterLista.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterLista.getNome()));
		}
		if (filterLista.getDisciplina() != null) {
			searchCriteria.createAlias("disciplina", "disciplina_");
			searchCriteria.add(Restrictions.eq("disciplina_.id", filterLista.getDisciplina()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
