package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Item;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterItem;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Item;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoItem extends AccessibleHibernateDao<Item> {
	private static final Logger LOGGER = Logger.getLogger(DaoItem.class);

	public DaoItem() {
		super(Item.class);
	}

	@Override
	public Pagination<Item> getAll(PaginationParams paginationParams) {
		FilterItem filterItem = (FilterItem) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterItem.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterItem.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterItem.getName(), MatchMode.ANYWHERE));
		}
		if (filterItem.getDescription() != null) {
			searchCriteria.add(Restrictions.ilike("description", filterItem.getDescription(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("description", filterItem.getDescription(), MatchMode.ANYWHERE));
		}
		if (filterItem.getType() != null) {
			searchCriteria.createAlias("type", "type_");
			countCriteria.createAlias("type", "type_");
			searchCriteria.add(Restrictions.eq("type_.id", filterItem.getType()));
			countCriteria.add(Restrictions.eq("type_.id", filterItem.getType()));
		}

		return new Paginator<Item>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Item> filter(PaginationParams paginationParams) {
		List<Item> list = new ArrayList<Item>();
		FilterItem filterItem = (FilterItem) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterItem.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterItem.getName()));
		}
		if (filterItem.getDescription() != null) {
			searchCriteria.add(Restrictions.eq("description", filterItem.getDescription()));
		}
		if (filterItem.getType() != null) {
			searchCriteria.createAlias("type", "type_");
			searchCriteria.add(Restrictions.eq("type_.id", filterItem.getType()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
