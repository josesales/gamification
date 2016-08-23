package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Operation;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface OperationService {

	Operation get(Integer id);

	List<Operation> all();
	
	Pager<Operation> all(PaginationParams paginationParams);

	List<Operation> filter(PaginationParams paginationParams);
	
	List<Operation> search(String searchText);

	Operation save(Operation entity);

	Operation update(Operation entity);
    List<Operation> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
