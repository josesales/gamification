package br.com.gamification.core.persistence;

import java.io.Serializable;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.joda.time.LocalDateTime;

import br.com.gamification.core.persistence.HibernateDao;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

@SuppressWarnings("unchecked")
public class HibernateDao<Entity> {

	private static final Logger LOGGER = Logger.getLogger(HibernateDao.class);
	
	private Class<Entity> clazz;

	public HibernateDao(Class<Entity> clazz) {
		this.clazz = clazz;
	}

	@Inject
	SessionFactory sessionFactory;

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	public Entity find(Serializable key) {
		if(key == null){
			return null;
		}
		return (Entity) sessionFactory.getCurrentSession().get(clazz, key);
	}

	public List<Entity> getAll() {
		LOGGER.warn("Aparentemente voce está tentando fazer uma consulta FULL SCAN. Por efeitos de performance, estamos limitando essa consulta aos primeiros 200 registos.");
		List<Entity> entities = sessionFactory.getCurrentSession().createCriteria(clazz).setMaxResults(200).list();
		return entities;
	}

	public Pagination<Entity> getAll(PaginationParams paginationParams) {
		return new Paginator<Entity>(criteria(), criteria()).paginate(paginationParams);
	}

	public Entity save(Entity entity) {
		Session currentSession = sessionFactory.getCurrentSession();
		currentSession.saveOrUpdate(entity);
		currentSession.flush();
		return entity;
	}

	public Boolean delete(Serializable entityId) {
		Entity entity = find(entityId);
		if (entity != null) {
			sessionFactory.getCurrentSession().delete(entity);
		}
		return Boolean.TRUE;
	}

	public Criteria criteria() {
		return sessionFactory.getCurrentSession().createCriteria(clazz);
	}

	public Query query(String hql) {
		return getSession().createQuery(hql);
	}

	public SQLQuery nativeQuery(String nativeSql) {
		return getSession().createSQLQuery(nativeSql);
	}
	
	public List<Entity> last(LocalDateTime dateTime) {
		List<Entity> list = new ArrayList<Entity>();
		Criteria searchCriteria = criteria();

		searchCriteria.add(Restrictions.gt("lastUpdateDatetime", dateTime));
		searchCriteria.setMaxResults(1000);

		try {
			list.addAll(searchCriteria.list());
		} catch (Exception e) {
			LOGGER.error("Error searching last changed registers...", e);
		}
		return list;
	}

}
