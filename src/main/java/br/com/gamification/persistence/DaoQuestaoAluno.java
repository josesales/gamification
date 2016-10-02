package br.com.gamification.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Query;

import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.QuestaoAluno;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoQuestaoAluno extends AccessibleHibernateDao<QuestaoAluno> {
	private static final Logger LOGGER = Logger.getLogger(DaoQuestaoAluno.class);

	public DaoQuestaoAluno() {
		super(QuestaoAluno.class);
	}

	public QuestaoAluno getQuestaoAluno(int idAluno, int idQuestao) {
		String hql = "select q from QuestaoAluno q where q.questao.id = :idQuestao and q.aluno.id = :idAluno";
		List<QuestaoAluno> questaoAluno = new ArrayList<QuestaoAluno>();
		
		Query query = query(hql);
		query.setParameter("idQuestao", idQuestao);
		query.setParameter("idAluno", idAluno);
		questaoAluno.addAll(query.list());
		if(questaoAluno.isEmpty()) {
			return null;
		}
		return questaoAluno.get(0);
	}
	
}
