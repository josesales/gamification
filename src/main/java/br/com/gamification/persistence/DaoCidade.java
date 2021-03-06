package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Cidade;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterCidade;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Cidade;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCidade extends AccessibleHibernateDao<Cidade> {
	private static final Logger LOGGER = Logger.getLogger(DaoCidade.class);

	public DaoCidade() {
		super(Cidade.class);
	}

	@Override
	public Pagination<Cidade> getAll(PaginationParams paginationParams) {
		FilterCidade filterCidade = (FilterCidade) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCidade.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterCidade.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterCidade.getNome(), MatchMode.ANYWHERE));
		}
		if (filterCidade.getCep() != null) {
			searchCriteria.add(Restrictions.ilike("cep", filterCidade.getCep(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("cep", filterCidade.getCep(), MatchMode.ANYWHERE));
		}
		if (filterCidade.getEstado() != null) {
			searchCriteria.createAlias("estado", "estado_");
			countCriteria.createAlias("estado", "estado_");
			searchCriteria.add(Restrictions.eq("estado_.id", filterCidade.getEstado()));
			countCriteria.add(Restrictions.eq("estado_.id", filterCidade.getEstado()));
		}

		return new Paginator<Cidade>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cidade> filter(PaginationParams paginationParams) {
		List<Cidade> list = new ArrayList<Cidade>();
		FilterCidade filterCidade = (FilterCidade) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCidade.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterCidade.getNome()));
		}
		if (filterCidade.getCep() != null) {
			searchCriteria.add(Restrictions.eq("cep", filterCidade.getCep()));
		}
		if (filterCidade.getEstado() != null) {
			searchCriteria.createAlias("estado", "estado_");
			searchCriteria.add(Restrictions.eq("estado_.id", filterCidade.getEstado()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
