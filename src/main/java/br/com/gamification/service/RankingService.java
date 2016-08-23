package br.com.gamification.service;

import java.util.List;
import org.joda.time.LocalDateTime;
import br.com.gamification.model.Ranking;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
/**
*  generated: 23/08/2016 08:32:12
**/
public interface RankingService {

	Ranking get(Integer id);

	List<Ranking> all();
	
	Pager<Ranking> all(PaginationParams paginationParams);

	List<Ranking> filter(PaginationParams paginationParams);
	
	List<Ranking> search(String searchText);

	Ranking save(Ranking entity);

	Ranking update(Ranking entity);
    List<Ranking> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
}
