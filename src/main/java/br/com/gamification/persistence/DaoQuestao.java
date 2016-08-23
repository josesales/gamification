package br.com.gamification.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gamification.model.Questao;
import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.filter.FilterQuestao;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;

import br.com.gamification.model.Questao;
/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoQuestao extends AccessibleHibernateDao<Questao> {
	private static final Logger LOGGER = Logger.getLogger(DaoQuestao.class);

	public DaoQuestao() {
		super(Questao.class);
	}

	@Override
	public Pagination<Questao> getAll(PaginationParams paginationParams) {
		FilterQuestao filterQuestao = (FilterQuestao) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterQuestao.getPergunta() != null) {
			searchCriteria.add(Restrictions.ilike("pergunta", filterQuestao.getPergunta(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("pergunta", filterQuestao.getPergunta(), MatchMode.ANYWHERE));
		}
		if (filterQuestao.getItemA() != null) {
			searchCriteria.add(Restrictions.ilike("itemA", filterQuestao.getItemA(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("itemA", filterQuestao.getItemA(), MatchMode.ANYWHERE));
		}
		if (filterQuestao.getItemB() != null) {
			searchCriteria.add(Restrictions.ilike("itemB", filterQuestao.getItemB(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("itemB", filterQuestao.getItemB(), MatchMode.ANYWHERE));
		}
		if (filterQuestao.getItemC() != null) {
			searchCriteria.add(Restrictions.ilike("itemC", filterQuestao.getItemC(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("itemC", filterQuestao.getItemC(), MatchMode.ANYWHERE));
		}
		if (filterQuestao.getItemD() != null) {
			searchCriteria.add(Restrictions.ilike("itemD", filterQuestao.getItemD(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("itemD", filterQuestao.getItemD(), MatchMode.ANYWHERE));
		}
		if (filterQuestao.getItemCorreto() != null) {
			searchCriteria.add(Restrictions.ilike("itemCorreto", filterQuestao.getItemCorreto(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("itemCorreto", filterQuestao.getItemCorreto(), MatchMode.ANYWHERE));
		}
		if (filterQuestao.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterQuestao.getPontos()));
			countCriteria.add(Restrictions.eq("pontos", filterQuestao.getPontos()));
		}				
		if (filterQuestao.getLista() != null) {
			searchCriteria.createAlias("lista", "lista_");
			countCriteria.createAlias("lista", "lista_");
			searchCriteria.add(Restrictions.eq("lista_.id", filterQuestao.getLista()));
			countCriteria.add(Restrictions.eq("lista_.id", filterQuestao.getLista()));
		}

		return new Paginator<Questao>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Questao> filter(PaginationParams paginationParams) {
		List<Questao> list = new ArrayList<Questao>();
		FilterQuestao filterQuestao = (FilterQuestao) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterQuestao.getPergunta() != null) {
			searchCriteria.add(Restrictions.eq("pergunta", filterQuestao.getPergunta()));
		}
		if (filterQuestao.getItemA() != null) {
			searchCriteria.add(Restrictions.eq("itemA", filterQuestao.getItemA()));
		}
		if (filterQuestao.getItemB() != null) {
			searchCriteria.add(Restrictions.eq("itemB", filterQuestao.getItemB()));
		}
		if (filterQuestao.getItemC() != null) {
			searchCriteria.add(Restrictions.eq("itemC", filterQuestao.getItemC()));
		}
		if (filterQuestao.getItemD() != null) {
			searchCriteria.add(Restrictions.eq("itemD", filterQuestao.getItemD()));
		}
		if (filterQuestao.getItemCorreto() != null) {
			searchCriteria.add(Restrictions.eq("itemCorreto", filterQuestao.getItemCorreto()));
		}
		if (filterQuestao.getPontos() != null) {
			searchCriteria.add(Restrictions.eq("pontos", filterQuestao.getPontos()));
		}
		if (filterQuestao.getLista() != null) {
			searchCriteria.createAlias("lista", "lista_");
			searchCriteria.add(Restrictions.eq("lista_.id", filterQuestao.getLista()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
