package br.com.gamification.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.model.Aluno;
import br.com.gamification.model.Disciplina;
import br.com.gamification.model.Ranking;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface RankingService {

	Ranking get(Integer id);

	List<Ranking> all();
	
	Pager<Ranking> all(PaginationParams paginationParams);

	List<Ranking> filter(PaginationParams paginationParams); 
	
	Pager<Ranking> filtraDisciplinasAluno(PaginationParams paginationParams);
	
	List<Ranking> search(String searchText);

	Ranking save(Ranking entity);

	Ranking update(Ranking entity);
    List<Ranking> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
	
	void desvincularAlunoDaDisciplina(int idAluno, int idDisciplina);
	
	public void pontuar(Aluno aluno, Disciplina disciplina, Integer pontos);
}
