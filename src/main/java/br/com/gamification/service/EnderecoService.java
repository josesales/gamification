package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Endereco;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface EnderecoService {

	Endereco get(Integer id);

	List<Endereco> all();
	
	Pager<Endereco> all(PaginationParams paginationParams);

	List<Endereco> filter(PaginationParams paginationParams);
	
	List<Endereco> search(String searchText);

	Endereco save(Endereco entity);

	Endereco update(Endereco entity);
    List<Endereco> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
