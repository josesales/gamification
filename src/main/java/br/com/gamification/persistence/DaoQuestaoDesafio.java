package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.QuestaoDesafio;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterQuestaoDesafio;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.QuestaoDesafio;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoQuestaoDesafio extends AccessibleHibernateDao<QuestaoDesafio> {
	private static final Logger LOGGER = Logger.getLogger(DaoQuestaoDesafio.class);

	public DaoQuestaoDesafio() {
		super(QuestaoDesafio.class);
	}

	@Override
	public Pagination<QuestaoDesafio> getAll(PaginationParams paginationParams) {
		FilterQuestaoDesafio filterQuestaoDesafio = (FilterQuestaoDesafio) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterQuestaoDesafio.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterQuestaoDesafio.getPontos()));
			countCriteria.add(Restrictions.eq("pontos", filterQuestaoDesafio.getPontos()));
		}				
		if (filterQuestaoDesafio.getPergunta() != null) {
			searchCriteria.add(Restrictions.ilike("pergunta", filterQuestaoDesafio.getPergunta(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("pergunta", filterQuestaoDesafio.getPergunta(), MatchMode.ANYWHERE));
		}
		if (filterQuestaoDesafio.getResposta() != null) {
			searchCriteria.add(Restrictions.ilike("resposta", filterQuestaoDesafio.getResposta(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("resposta", filterQuestaoDesafio.getResposta(), MatchMode.ANYWHERE));
		}
		if (filterQuestaoDesafio.getLista() != null) {
			searchCriteria.createAlias("lista", "lista_");
			countCriteria.createAlias("lista", "lista_");
			searchCriteria.add(Restrictions.eq("lista_.id", filterQuestaoDesafio.getLista()));
			countCriteria.add(Restrictions.eq("lista_.id", filterQuestaoDesafio.getLista()));
		}

		return new Paginator<QuestaoDesafio>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<QuestaoDesafio> filter(PaginationParams paginationParams) {
		List<QuestaoDesafio> list = new ArrayList<QuestaoDesafio>();
		FilterQuestaoDesafio filterQuestaoDesafio = (FilterQuestaoDesafio) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterQuestaoDesafio.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterQuestaoDesafio.getPontos()));
		}
		if (filterQuestaoDesafio.getPergunta() != null) {
			searchCriteria.add(Restrictions.eq("pergunta", filterQuestaoDesafio.getPergunta()));
		}
		if (filterQuestaoDesafio.getResposta() != null) {
			searchCriteria.add(Restrictions.eq("resposta", filterQuestaoDesafio.getResposta()));
		}
		if (filterQuestaoDesafio.getLista() != null) {
			searchCriteria.createAlias("lista", "lista_");
			searchCriteria.add(Restrictions.eq("lista_.id", filterQuestaoDesafio.getLista()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
