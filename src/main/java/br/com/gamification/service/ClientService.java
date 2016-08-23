package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Client;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface ClientService {

	Client get(Integer id);

	List<Client> all();
	
	Pager<Client> all(PaginationParams paginationParams);

	List<Client> filter(PaginationParams paginationParams);
	
	List<Client> search(String searchText);

	Client save(Client entity);

	Client update(Client entity);
    List<Client> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
