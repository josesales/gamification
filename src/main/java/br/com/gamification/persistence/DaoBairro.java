package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Bairro;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterBairro;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Bairro;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoBairro extends AccessibleHibernateDao<Bairro> {
	private static final Logger LOGGER = Logger.getLogger(DaoBairro.class);

	public DaoBairro() {
		super(Bairro.class);
	}

	@Override
	public Pagination<Bairro> getAll(PaginationParams paginationParams) {
		FilterBairro filterBairro = (FilterBairro) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterBairro.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterBairro.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterBairro.getNome(), MatchMode.ANYWHERE));
		}
		if (filterBairro.getCidade() != null) {
			searchCriteria.createAlias("cidade", "cidade_");
			countCriteria.createAlias("cidade", "cidade_");
			searchCriteria.add(Restrictions.eq("cidade_.id", filterBairro.getCidade()));
			countCriteria.add(Restrictions.eq("cidade_.id", filterBairro.getCidade()));
		}
		if (filterBairro.getEstado() != null) {
			searchCriteria.createAlias("estado", "estado_");
			countCriteria.createAlias("estado", "estado_");
			searchCriteria.add(Restrictions.eq("estado_.id", filterBairro.getEstado()));
			countCriteria.add(Restrictions.eq("estado_.id", filterBairro.getEstado()));
		}

		return new Paginator<Bairro>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Bairro> filter(PaginationParams paginationParams) {
		List<Bairro> list = new ArrayList<Bairro>();
		FilterBairro filterBairro = (FilterBairro) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterBairro.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterBairro.getNome()));
		}
		if (filterBairro.getCidade() != null) {
			searchCriteria.createAlias("cidade", "cidade_");
			searchCriteria.add(Restrictions.eq("cidade_.id", filterBairro.getCidade()));
		}
		if (filterBairro.getEstado() != null) {
			searchCriteria.createAlias("estado", "estado_");
			searchCriteria.add(Restrictions.eq("estado_.id", filterBairro.getEstado()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
