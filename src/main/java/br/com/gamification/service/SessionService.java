package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Session;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface SessionService {

	Session get(Integer id);

	List<Session> all();
	
	Pager<Session> all(PaginationParams paginationParams);

	List<Session> filter(PaginationParams paginationParams);
	
	List<Session> search(String searchText);

	Session save(Session entity);

	Session update(Session entity);
    List<Session> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
