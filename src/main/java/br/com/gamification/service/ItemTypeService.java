package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.ItemType;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface ItemTypeService {

	ItemType get(Integer id);

	List<ItemType> all();
	
	Pager<ItemType> all(PaginationParams paginationParams);

	List<ItemType> filter(PaginationParams paginationParams);
	
	List<ItemType> search(String searchText);

	ItemType save(ItemType entity);

	ItemType update(ItemType entity);
    List<ItemType> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
