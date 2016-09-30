package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.User;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface UserService {

	User get(Integer id);

	List<User> all();
	
	Pager<User> all(PaginationParams paginationParams);

	List<User> filter(PaginationParams paginationParams);
	
	List<User> search(String searchText);

	User save(User entity);

	User update(User entity);
    List<User> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);

	User cadastrarUsuarioAluno(User entity);
	
	User getUsuarioLogado();
}
