package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Estado;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface EstadoService {

	Estado get(Integer id);

	List<Estado> all();
	
	Pager<Estado> all(PaginationParams paginationParams);

	List<Estado> filter(PaginationParams paginationParams);
	
	List<Estado> search(String searchText);

	Estado save(Estado entity);

	Estado update(Estado entity);
    List<Estado> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
