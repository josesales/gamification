package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.ItemType;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterItemType;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.ItemType;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoItemType extends AccessibleHibernateDao<ItemType> {
	private static final Logger LOGGER = Logger.getLogger(DaoItemType.class);

	public DaoItemType() {
		super(ItemType.class);
	}

	@Override
	public Pagination<ItemType> getAll(PaginationParams paginationParams) {
		FilterItemType filterItemType = (FilterItemType) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterItemType.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterItemType.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterItemType.getName(), MatchMode.ANYWHERE));
		}
		if (filterItemType.getDescription() != null) {
			searchCriteria.add(Restrictions.ilike("description", filterItemType.getDescription(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("description", filterItemType.getDescription(), MatchMode.ANYWHERE));
		}

		return new Paginator<ItemType>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<ItemType> filter(PaginationParams paginationParams) {
		List<ItemType> list = new ArrayList<ItemType>();
		FilterItemType filterItemType = (FilterItemType) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterItemType.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterItemType.getName()));
		}
		if (filterItemType.getDescription() != null) {
			searchCriteria.add(Restrictions.eq("description", filterItemType.getDescription()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
