package br.com.gamification.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.hibernate.sql.JoinType;

import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.persistence.pagination.Paginator;
import br.com.gamification.model.Disciplina;
import br.com.gamification.model.filter.FilterDisciplina;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoDisciplina extends AccessibleHibernateDao<Disciplina> {
	private static final Logger LOGGER = Logger.getLogger(DaoDisciplina.class);

	public DaoDisciplina() {
		super(Disciplina.class);
	}

	@Override
	public Pagination<Disciplina> getAll(PaginationParams paginationParams) {
		FilterDisciplina filterDisciplina = (FilterDisciplina) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterDisciplina.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterDisciplina.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterDisciplina.getNome(), MatchMode.ANYWHERE));
		}
		if (filterDisciplina.getProfessor() != null) {
			searchCriteria.createAlias("professor", "professor_");
			countCriteria.createAlias("professor", "professor_");
			searchCriteria.add(Restrictions.eq("professor_.id", filterDisciplina.getProfessor()));
			countCriteria.add(Restrictions.eq("professor_.id", filterDisciplina.getProfessor()));
		}
//		if (filterDisciplina.getAluno() != null) {
//			
//			if(filterDisciplina.getIsAlunoIncluso() == true) {
//				//filtra por disciplinas que o aluno esta cadastrado
//				searchCriteria.createAlias("alunos", "aluno_");
//				countCriteria.createAlias("alunos", "aluno_");
//				searchCriteria.add(Restrictions.eq("aluno_.id", filterDisciplina.getAluno()));
//				countCriteria.add(Restrictions.eq("aluno_.id", filterDisciplina.getAluno()));
//			}else {
//				//filtra por disciplinas que o aluno nao esta cadastrado
//				
//				//DetachedCriteria sub = DetachedCriteria.forClass(Company.class);
////				criterion = Restrictions.eq("companyRoles.name", "ADMIN");
//				//sub.add(criterion);
//				//sub.setProjection(Projections.property("id"));
//				//Criteria criteria = session.createCriteria(Company.class);
//				//criteria.add(Property.forName("id").notIn(sub));
//				//List<Company> companyList = criteria.list();
//				
//			}
//		}

		return new Paginator<Disciplina>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Disciplina> filter(PaginationParams paginationParams) {
		List<Disciplina> list = new ArrayList<Disciplina>();
		FilterDisciplina filterDisciplina = (FilterDisciplina) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterDisciplina.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterDisciplina.getNome()));
		}
		if (filterDisciplina.getProfessor() != null) {
			searchCriteria.createAlias("professor", "professor_");
			searchCriteria.add(Restrictions.eq("professor_.id", filterDisciplina.getProfessor()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
