package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Cep;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterCep;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Cep;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCep extends AccessibleHibernateDao<Cep> {
	private static final Logger LOGGER = Logger.getLogger(DaoCep.class);

	public DaoCep() {
		super(Cep.class);
	}

	@Override
	public Pagination<Cep> getAll(PaginationParams paginationParams) {
		FilterCep filterCep = (FilterCep) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCep.getLogradouro() != null) {
			searchCriteria.add(Restrictions.ilike("logradouro", filterCep.getLogradouro(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("logradouro", filterCep.getLogradouro(), MatchMode.ANYWHERE));
		}
		if (filterCep.getNumero() != null) {
			searchCriteria.add(Restrictions.ilike("numero", filterCep.getNumero(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("numero", filterCep.getNumero(), MatchMode.ANYWHERE));
		}
		if (filterCep.getBairro() != null) {
			searchCriteria.createAlias("bairro", "bairro_");
			countCriteria.createAlias("bairro", "bairro_");
			searchCriteria.add(Restrictions.eq("bairro_.id", filterCep.getBairro()));
			countCriteria.add(Restrictions.eq("bairro_.id", filterCep.getBairro()));
		}
		if (filterCep.getCidade() != null) {
			searchCriteria.createAlias("cidade", "cidade_");
			countCriteria.createAlias("cidade", "cidade_");
			searchCriteria.add(Restrictions.eq("cidade_.id", filterCep.getCidade()));
			countCriteria.add(Restrictions.eq("cidade_.id", filterCep.getCidade()));
		}
		if (filterCep.getEstado() != null) {
			searchCriteria.createAlias("estado", "estado_");
			countCriteria.createAlias("estado", "estado_");
			searchCriteria.add(Restrictions.eq("estado_.id", filterCep.getEstado()));
			countCriteria.add(Restrictions.eq("estado_.id", filterCep.getEstado()));
		}

		return new Paginator<Cep>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cep> filter(PaginationParams paginationParams) {
		List<Cep> list = new ArrayList<Cep>();
		FilterCep filterCep = (FilterCep) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCep.getLogradouro() != null) {
			searchCriteria.add(Restrictions.eq("logradouro", filterCep.getLogradouro()));
		}
		if (filterCep.getNumero() != null) {
			searchCriteria.add(Restrictions.eq("numero", filterCep.getNumero()));
		}
		if (filterCep.getBairro() != null) {
			searchCriteria.createAlias("bairro", "bairro_");
			searchCriteria.add(Restrictions.eq("bairro_.id", filterCep.getBairro()));
		}
		if (filterCep.getCidade() != null) {
			searchCriteria.createAlias("cidade", "cidade_");
			searchCriteria.add(Restrictions.eq("cidade_.id", filterCep.getCidade()));
		}
		if (filterCep.getEstado() != null) {
			searchCriteria.createAlias("estado", "estado_");
			searchCriteria.add(Restrictions.eq("estado_.id", filterCep.getEstado()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
