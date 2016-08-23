package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Bairro;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface BairroService {

	Bairro get(Integer id);

	List<Bairro> all();
	
	Pager<Bairro> all(PaginationParams paginationParams);

	List<Bairro> filter(PaginationParams paginationParams);
	
	List<Bairro> search(String searchText);

	Bairro save(Bairro entity);

	Bairro update(Bairro entity);
    List<Bairro> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
