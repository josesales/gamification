package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Permission;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterPermission;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Permission;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoPermission extends AccessibleHibernateDao<Permission> {
	private static final Logger LOGGER = Logger.getLogger(DaoPermission.class);

	public DaoPermission() {
		super(Permission.class);
	}

	@Override
	public Pagination<Permission> getAll(PaginationParams paginationParams) {
		FilterPermission filterPermission = (FilterPermission) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterPermission.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterPermission.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterPermission.getName(), MatchMode.ANYWHERE));
		}
		if (filterPermission.getOperation() != null) {
			searchCriteria.createAlias("operation", "operation_");
			countCriteria.createAlias("operation", "operation_");
			searchCriteria.add(Restrictions.eq("operation_.id", filterPermission.getOperation()));
			countCriteria.add(Restrictions.eq("operation_.id", filterPermission.getOperation()));
		}
		if (filterPermission.getItem() != null) {
			searchCriteria.createAlias("item", "item_");
			countCriteria.createAlias("item", "item_");
			searchCriteria.add(Restrictions.eq("item_.id", filterPermission.getItem()));
			countCriteria.add(Restrictions.eq("item_.id", filterPermission.getItem()));
		}

		return new Paginator<Permission>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Permission> filter(PaginationParams paginationParams) {
		List<Permission> list = new ArrayList<Permission>();
		FilterPermission filterPermission = (FilterPermission) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterPermission.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterPermission.getName()));
		}
		if (filterPermission.getOperation() != null) {
			searchCriteria.createAlias("operation", "operation_");
			searchCriteria.add(Restrictions.eq("operation_.id", filterPermission.getOperation()));
		}
		if (filterPermission.getItem() != null) {
			searchCriteria.createAlias("item", "item_");
			searchCriteria.add(Restrictions.eq("item_.id", filterPermission.getItem()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
