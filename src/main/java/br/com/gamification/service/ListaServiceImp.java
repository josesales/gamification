package br.com.gamification.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.model.Lista;
import br.com.gamification.model.ListaAluno;
import br.com.gamification.persistence.DaoLista;
import br.com.gamification.persistence.DaoListaAluno;

/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@Transactional
public class ListaServiceImp implements ListaService {

	private static final Logger LOGGER = Logger.getLogger(ListaServiceImp.class);
	
	@Inject
	DaoLista daoLista;
	@Inject
	DaoListaAluno daoListaAluno;

	@Override
	public Lista get(Integer id) {
		return daoLista.find(id);
	}
	

	@Override
	public Pager<Lista> all(PaginationParams paginationParams) {
		Pagination<Lista> pagination = daoLista.getAll(paginationParams);
		
//		pagination.getResults()
		return new Pager<Lista>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Lista> filter(PaginationParams paginationParams) {
		List<Lista> list = daoLista.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Lista> all() {
		return daoLista.getAll();
	}

	@Override
	public List<Lista> search(String description) {
		return new ArrayList<Lista>();
	}
	
	public List<Lista> last(LocalDateTime lastSyncDate){
		return daoLista.last(lastSyncDate);
	}
			
	@Override
	public Lista save(Lista entity) {
		return daoLista.save(entity);
	}

	@Override
	public Lista update(Lista entity) {
		return daoLista.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoLista.delete(id);
	}
	
	public ListaAluno getListaAluno(int idAluno, int idLista) {
		return daoListaAluno.getListaAluno(idAluno, idLista);
	}
	
	@Override
	public ListaAluno save(ListaAluno entity) {
		return daoListaAluno.save(entity);
	}


	@Override
	public Lista getListaComInformacoesDoAluno(int idAluno, int idLista) {
		Lista lista = get(idLista);
		ListaAluno listaAluno = getListaAluno(idAluno, idLista);
		if(listaAluno != null) {
			if(listaAluno.getQuestaoAtual() != null ) {
				lista.setQuestaoAtual(listaAluno.getQuestaoAtual());
			}
			if(listaAluno.getConcluida() != null ) {
				lista.setConcluida(listaAluno.getConcluida());
			}else {
				lista.setConcluida(false);
			}
			if(listaAluno.getDesafioAtual() != null ) {
				lista.setDesafioAtual(listaAluno.getDesafioAtual());
			}
			if(listaAluno.getDesafioConcluido() != null ) {
				lista.setDesafioConcluido(listaAluno.getDesafioConcluido());
			}else {
				lista.setDesafioConcluido(false);
			}
		}
		return lista;
	}
	
	@Override
	public List<Lista> getListaComInformacoesDoAlunoPorDisciplina(int idAluno, int idDisciplina) {
		List<ListaAluno> listasDoAluno = daoListaAluno.getListaAlunoPorDisciplina(idAluno, idDisciplina);
		List<Lista> listas = new ArrayList<Lista>();
		
		for(ListaAluno listaAluno : listasDoAluno) {
			Lista lista = listaAluno.getLista();
			
			if(listaAluno.getQuestaoAtual() != null ) {
				lista.setQuestaoAtual(listaAluno.getQuestaoAtual());
			}
			if(listaAluno.getConcluida() != null ) {
				lista.setConcluida(listaAluno.getConcluida());
			}else {
				lista.setConcluida(false);
			}
			if(listaAluno.getDesafioAtual() != null ) {
				lista.setDesafioAtual(listaAluno.getDesafioAtual());
			}
			if(listaAluno.getDesafioConcluido() != null ) {
				lista.setDesafioConcluido(listaAluno.getDesafioConcluido());
			}else {
				lista.setDesafioConcluido(false);
			}
			
			
			listas.add(lista);
		}
		
		return listas;
	}
	
	
	
	


}
