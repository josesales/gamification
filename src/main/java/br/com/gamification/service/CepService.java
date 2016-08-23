package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Cep;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface CepService {

	Cep get(Integer id);

	List<Cep> all();
	
	Pager<Cep> all(PaginationParams paginationParams);

	List<Cep> filter(PaginationParams paginationParams);
	
	List<Cep> search(String searchText);

	Cep save(Cep entity);

	Cep update(Cep entity);
    List<Cep> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
