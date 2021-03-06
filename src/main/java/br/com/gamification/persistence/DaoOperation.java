package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Operation;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterOperation;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Operation;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoOperation extends AccessibleHibernateDao<Operation> {
	private static final Logger LOGGER = Logger.getLogger(DaoOperation.class);

	public DaoOperation() {
		super(Operation.class);
	}

	@Override
	public Pagination<Operation> getAll(PaginationParams paginationParams) {
		FilterOperation filterOperation = (FilterOperation) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterOperation.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterOperation.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterOperation.getName(), MatchMode.ANYWHERE));
		}
		if (filterOperation.getCanEdit() != null) {
			searchCriteria.add(Restrictions.eq("canEdit", filterOperation.getCanEdit()));
			countCriteria.add(Restrictions.eq("canEdit", filterOperation.getCanEdit()));
		}				
		if (filterOperation.getCanRead() != null) {
			searchCriteria.add(Restrictions.eq("canRead", filterOperation.getCanRead()));
			countCriteria.add(Restrictions.eq("canRead", filterOperation.getCanRead()));
		}				
		if (filterOperation.getCanUpdate() != null) {
			searchCriteria.add(Restrictions.eq("canUpdate", filterOperation.getCanUpdate()));
			countCriteria.add(Restrictions.eq("canUpdate", filterOperation.getCanUpdate()));
		}				
		if (filterOperation.getCanDelete() != null) {
			searchCriteria.add(Restrictions.eq("canDelete", filterOperation.getCanDelete()));
			countCriteria.add(Restrictions.eq("canDelete", filterOperation.getCanDelete()));
		}				
		if (filterOperation.getCanExecute() != null) {
			searchCriteria.add(Restrictions.eq("canExecute", filterOperation.getCanExecute()));
			countCriteria.add(Restrictions.eq("canExecute", filterOperation.getCanExecute()));
		}				

		return new Paginator<Operation>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Operation> filter(PaginationParams paginationParams) {
		List<Operation> list = new ArrayList<Operation>();
		FilterOperation filterOperation = (FilterOperation) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterOperation.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterOperation.getName()));
		}
		if (filterOperation.getCanEdit() != null) {
			searchCriteria.add(Restrictions.eq("canEdit", filterOperation.getCanEdit()));
		}
		if (filterOperation.getCanRead() != null) {
			searchCriteria.add(Restrictions.eq("canRead", filterOperation.getCanRead()));
		}
		if (filterOperation.getCanUpdate() != null) {
			searchCriteria.add(Restrictions.eq("canUpdate", filterOperation.getCanUpdate()));
		}
		if (filterOperation.getCanDelete() != null) {
			searchCriteria.add(Restrictions.eq("canDelete", filterOperation.getCanDelete()));
		}
		if (filterOperation.getCanExecute() != null) {
			searchCriteria.add(Restrictions.eq("canExecute", filterOperation.getCanExecute()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
