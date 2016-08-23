package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Role;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterRole;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Role;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoRole extends AccessibleHibernateDao<Role> {
	private static final Logger LOGGER = Logger.getLogger(DaoRole.class);

	public DaoRole() {
		super(Role.class);
	}

	@Override
	public Pagination<Role> getAll(PaginationParams paginationParams) {
		FilterRole filterRole = (FilterRole) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterRole.getAuthority() != null) {
			searchCriteria.add(Restrictions.ilike("authority", filterRole.getAuthority(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("authority", filterRole.getAuthority(), MatchMode.ANYWHERE));
		}
		if (filterRole.getDescription() != null) {
			searchCriteria.add(Restrictions.ilike("description", filterRole.getDescription(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("description", filterRole.getDescription(), MatchMode.ANYWHERE));
		}

		return new Paginator<Role>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Role> filter(PaginationParams paginationParams) {
		List<Role> list = new ArrayList<Role>();
		FilterRole filterRole = (FilterRole) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterRole.getAuthority() != null) {
			searchCriteria.add(Restrictions.eq("authority", filterRole.getAuthority()));
		}
		if (filterRole.getDescription() != null) {
			searchCriteria.add(Restrictions.eq("description", filterRole.getDescription()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
