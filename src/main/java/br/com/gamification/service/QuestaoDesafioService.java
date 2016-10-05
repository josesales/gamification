package br.com.gamification.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.gamification.model.QuestaoDesafio;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface QuestaoDesafioService {

	QuestaoDesafio get(Integer id);

	List<QuestaoDesafio> all();
	
	Pager<QuestaoDesafio> all(PaginationParams paginationParams);

	List<QuestaoDesafio> filter(PaginationParams paginationParams);
	
	List<QuestaoDesafio> search(String searchText);

	QuestaoDesafio save(QuestaoDesafio entity);

	QuestaoDesafio update(QuestaoDesafio entity);
    List<QuestaoDesafio> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
	
	Boolean responder(Integer idQuestao, String resposta, Integer idAluno);
	
	List<QuestaoDesafio> getQuestoesDesafioComRespostas(Integer idLista,  Integer idAluno);
}
