package br.com.gamification.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Query;

import br.com.gamification.core.persistence.AccessibleHibernateDao;
import br.com.gamification.model.QuestaoDesafioAluno;
/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoQuestaoDesafioAluno extends AccessibleHibernateDao<QuestaoDesafioAluno> {
	private static final Logger LOGGER = Logger.getLogger(DaoQuestaoDesafioAluno.class);

	public DaoQuestaoDesafioAluno() {
		super(QuestaoDesafioAluno.class);
	}

	public QuestaoDesafioAluno getQuestaoDesafioAluno(int idAluno, int idQuestaoDesafio) {
		String hql = "select desafio from QuestaoDesafioAluno desafio where desafio.questaoDesafio.id = :idQuestaoDesafio and desafio.aluno.id = :idAluno";
		List<QuestaoDesafioAluno> questaoDesafioAluno = new ArrayList<QuestaoDesafioAluno>();
		
		Query query = query(hql);
		query.setParameter("idQuestaoDesafio", idQuestaoDesafio);
		query.setParameter("idAluno", idAluno);
		questaoDesafioAluno.addAll(query.list());
		if(questaoDesafioAluno.isEmpty()) {
			return null;
		}
		return questaoDesafioAluno.get(0);
	}
	
//	public List<QuestaoDesafioAluno> getQuestaoDesafioAlunoPorDisciplina(int idAluno, int idDisciplina) {
//		String hql = "select desafio from QuestaoDesafioAluno desafio where desafio.aluno.id = :idAluno and desafio.questaoDesafio.lista.disciplina.id = :idDisciplina";
//		List<QuestaoDesafioAluno> questoesDesafioAluno = new ArrayList<QuestaoDesafioAluno>();
//		
//		Query query = query(hql);
//		query.setParameter("idAluno", idAluno);
//		query.setParameter("idDisciplina", idDisciplina);
//		questoesDesafioAluno.addAll(query.list());
//		
//		return questoesDesafioAluno;
//	}
	
	
}
