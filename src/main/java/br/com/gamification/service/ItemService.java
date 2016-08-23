package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Item;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface ItemService {

	Item get(Integer id);

	List<Item> all();
	
	Pager<Item> all(PaginationParams paginationParams);

	List<Item> filter(PaginationParams paginationParams);
	
	List<Item> search(String searchText);

	Item save(Item entity);

	Item update(Item entity);
    List<Item> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
