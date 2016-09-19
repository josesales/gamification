package br.com.gamification.service;

import java.util.List;

import org.joda.time.LocalDateTime;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.model.Lista;
import br.com.gamification.model.ListaAluno;
/**
*  generated: 23/08/2016 08:32:11
**/
public interface ListaService {

	Lista get(Integer id);

	List<Lista> all();
	
	Pager<Lista> all(PaginationParams paginationParams);

	List<Lista> filter(PaginationParams paginationParams);
	
	List<Lista> search(String searchText);

	Lista save(Lista entity);

	Lista update(Lista entity);
    List<Lista> last(LocalDateTime lastSyncDate);		

	Boolean delete(Integer id);
	
	ListaAluno save(ListaAluno entity);
	
	ListaAluno getListaAluno(int idAluno, int idLista);
	
	Lista getListaComInformacoesDoAluno(int idAluno, int idLista);
	
}
