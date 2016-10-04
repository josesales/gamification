package br.com.gamification.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.gamification.model.Questao;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface QuestaoService {

	Questao get(Integer id);

	List<Questao> all();
	
	Pager<Questao> all(PaginationParams paginationParams);

	List<Questao> filter(PaginationParams paginationParams);
	
	List<Questao> search(String searchText);

	Questao save(Questao entity);

	Questao update(Questao entity);
    List<Questao> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
	
	Boolean responder(Integer idQuestao, String itemMarcado, Integer idAluno);
	
	List<Questao> getQuestoesComRespostas(Integer idLista,  Integer idAluno);
}
