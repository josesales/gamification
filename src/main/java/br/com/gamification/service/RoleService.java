package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Role;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface RoleService {

	Role get(Integer id);

	List<Role> all();
	
	Pager<Role> all(PaginationParams paginationParams);

	List<Role> filter(PaginationParams paginationParams);
	
	List<Role> search(String searchText);

	Role save(Role entity);

	Role update(Role entity);
    List<Role> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
