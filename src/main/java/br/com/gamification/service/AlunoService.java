package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Aluno;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:11
**/
public interface AlunoService {

	Aluno get(Integer id);

	List<Aluno> all();
	
	Pager<Aluno> all(PaginationParams paginationParams);

	List<Aluno> filter(PaginationParams paginationParams);
	
	List<Aluno> search(String searchText);

	Aluno save(Aluno entity);

	Aluno update(Aluno entity);
    List<Aluno> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
	
	void pontuar(Aluno aluno, Integer pontos);
}
