package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Client;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterClient;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Client;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoClient extends AccessibleHibernateDao<Client> {
	private static final Logger LOGGER = Logger.getLogger(DaoClient.class);

	public DaoClient() {
		super(Client.class);
	}

	@Override
	public Pagination<Client> getAll(PaginationParams paginationParams) {
		FilterClient filterClient = (FilterClient) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterClient.getLogo() != null) {
			searchCriteria.add(Restrictions.ilike("logo", filterClient.getLogo(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("logo", filterClient.getLogo(), MatchMode.ANYWHERE));
		}
		if (filterClient.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterClient.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterClient.getName(), MatchMode.ANYWHERE));
		}
		if (filterClient.getCnpj() != null) {
			searchCriteria.add(Restrictions.ilike("cnpj", filterClient.getCnpj(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("cnpj", filterClient.getCnpj(), MatchMode.ANYWHERE));
		}
		if (filterClient.getPhoneNumber() != null) {
			searchCriteria.add(Restrictions.ilike("phoneNumber", filterClient.getPhoneNumber(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("phoneNumber", filterClient.getPhoneNumber(), MatchMode.ANYWHERE));
		}
		if (filterClient.getCorporateName() != null) {
			searchCriteria.add(Restrictions.ilike("corporateName", filterClient.getCorporateName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("corporateName", filterClient.getCorporateName(), MatchMode.ANYWHERE));
		}

		return new Paginator<Client>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Client> filter(PaginationParams paginationParams) {
		List<Client> list = new ArrayList<Client>();
		FilterClient filterClient = (FilterClient) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterClient.getLogo() != null) {
			searchCriteria.add(Restrictions.eq("logo", filterClient.getLogo()));
		}
		if (filterClient.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterClient.getName()));
		}
		if (filterClient.getCnpj() != null) {
			searchCriteria.add(Restrictions.eq("cnpj", filterClient.getCnpj()));
		}
		if (filterClient.getPhoneNumber() != null) {
			searchCriteria.add(Restrictions.eq("phoneNumber", filterClient.getPhoneNumber()));
		}
		if (filterClient.getCorporateName() != null) {
			searchCriteria.add(Restrictions.eq("corporateName", filterClient.getCorporateName()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
