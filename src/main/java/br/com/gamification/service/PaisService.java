package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Pais;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface PaisService {

	Pais get(Integer id);

	List<Pais> all();
	
	Pager<Pais> all(PaginationParams paginationParams);

	List<Pais> filter(PaginationParams paginationParams);
	
	List<Pais> search(String searchText);

	Pais save(Pais entity);

	Pais update(Pais entity);
    List<Pais> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
