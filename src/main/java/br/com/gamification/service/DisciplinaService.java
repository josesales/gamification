package br.com.gamification.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.gamification.model.Disciplina;
import br.com.gamification.model.filter.FilterDisciplina;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:11
**/
public interface DisciplinaService {

	Disciplina get(Integer id);

	List<Disciplina> all();
	
	Pager<Disciplina> all(PaginationParams paginationParams);

	List<Disciplina> filter(PaginationParams paginationParams);
	
	List<Disciplina> search(String searchText);

	Disciplina save(Disciplina entity);

	Disciplina update(Disciplina entity);
    List<Disciplina> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);

	Boolean removeAluno(Integer idDisciplina, Integer idAluno);
	
	List<Disciplina> filter(FilterDisciplina filterDisciplina);
}
