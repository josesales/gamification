package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Professor;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:11
**/
public interface ProfessorService {

	Professor get(Integer id);

	List<Professor> all();
	
	Pager<Professor> all(PaginationParams paginationParams);

	List<Professor> filter(PaginationParams paginationParams);
	
	List<Professor> search(String searchText);

	Professor save(Professor entity);

	Professor update(Professor entity);
    List<Professor> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
