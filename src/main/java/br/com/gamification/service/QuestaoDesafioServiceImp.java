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
import br.com.gamification.model.Aluno;
import br.com.gamification.model.Lista;
import br.com.gamification.model.ListaAluno;
import br.com.gamification.model.QuestaoDesafio;
import br.com.gamification.model.QuestaoDesafioAluno;
import br.com.gamification.persistence.DaoQuestaoDesafio;
import br.com.gamification.persistence.DaoQuestaoDesafioAluno;

/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@Transactional
public class QuestaoDesafioServiceImp implements QuestaoDesafioService {

	private static final Logger LOGGER = Logger.getLogger(QuestaoDesafioServiceImp.class);
	
	@Inject
	DaoQuestaoDesafio daoQuestaoDesafio;
	@Inject
	DaoQuestaoDesafioAluno daoQuestaoDesafioAluno;
	@Inject
	AlunoService alunoService;
	@Inject
	ListaService listaService;

	@Override
	public QuestaoDesafio get(Integer id) {
		return daoQuestaoDesafio.find(id);
	}
	

	@Override
	public Pager<QuestaoDesafio> all(PaginationParams paginationParams) {
		Pagination<QuestaoDesafio> pagination = daoQuestaoDesafio.getAll(paginationParams);
		return new Pager<QuestaoDesafio>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<QuestaoDesafio> filter(PaginationParams paginationParams) {
		List<QuestaoDesafio> list = daoQuestaoDesafio.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<QuestaoDesafio> all() {
		return daoQuestaoDesafio.getAll();
	}

	@Override
	public List<QuestaoDesafio> search(String description) {
		return new ArrayList<QuestaoDesafio>();
	}
	
	public List<QuestaoDesafio> last(LocalDateTime lastSyncDate){
		return daoQuestaoDesafio.last(lastSyncDate);
	}
			
	@Override
	public QuestaoDesafio save(QuestaoDesafio entity) {
		return daoQuestaoDesafio.save(entity);
	}

	@Override
	public QuestaoDesafio update(QuestaoDesafio entity) {
		return daoQuestaoDesafio.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoQuestaoDesafio.delete(id);
	}


	@Override
	public Boolean responder(Integer idDesafio, String respostaTexto, String resposta, Integer idAluno) {
		QuestaoDesafio questaoDesafio = daoQuestaoDesafio.find(idDesafio);
		boolean retorno = true; 
		
		QuestaoDesafioAluno desafioAluno = daoQuestaoDesafioAluno.getQuestaoDesafioAluno(idAluno, idDesafio);
		if(desafioAluno == null) {
			Aluno aluno = alunoService.get(idAluno);
			desafioAluno = new QuestaoDesafioAluno();
			desafioAluno.setAluno(aluno);
			desafioAluno.setQuestaoDesafio(questaoDesafio);
		}
		
		desafioAluno.setRespostaTexto(respostaTexto);
		desafioAluno.setResposta(resposta);
		daoQuestaoDesafioAluno.save(desafioAluno);
		atualizarDesafioAtual(idAluno, questaoDesafio.getLista());
		return retorno;
	}
	
	private void atualizarDesafioAtual(Integer idAluno, Lista lista) {
		
		Integer desafioAtual = 0;
		ListaAluno listaAluno = listaService.getListaAluno(idAluno, lista.getId());
		if(listaAluno == null) {
			listaAluno = new ListaAluno();
			Aluno alunoTemp = new Aluno();
			alunoTemp.setId(idAluno);
			listaAluno.setAluno(alunoTemp);
			listaAluno.setLista(lista);
		}
		if(listaAluno.getDesafioAtual() != null) {
			desafioAtual = listaAluno.getDesafioAtual();
		}
		desafioAtual++;
		listaAluno.setDesafioAtual(desafioAtual);
		if(desafioAtual >= lista.getQuestaoDesafios().size()) {
			listaAluno.setDesafioConcluido(true);
		}
		listaService.save(listaAluno);
	}
	
	public List<QuestaoDesafio> getQuestoesDesafioComRespostas(Integer idLista,  Integer idAluno) {
		List<QuestaoDesafioAluno> questoesDesafioAluno = daoQuestaoDesafioAluno.getQuestoesDesafioAluno(idLista, idAluno);
		List<QuestaoDesafio> questoesDesafio = new ArrayList<QuestaoDesafio>();
		
		for(QuestaoDesafioAluno questaoDesafioAluno : questoesDesafioAluno) {
			QuestaoDesafio questaoDesafio = new QuestaoDesafio();
			questaoDesafio = questaoDesafioAluno.getQuestaoDesafio();
			questaoDesafio.setResposta(questaoDesafioAluno.getResposta());
			questaoDesafio.setRespostaTexto(questaoDesafioAluno.getRespostaTexto());
			questaoDesafio.setRespostaCorreta(questaoDesafioAluno.getRespostaCorreta());
			questoesDesafio.add(questaoDesafio);
		}
		return questoesDesafio;
	}
	
	public Boolean cadastrarResposta(Integer idQuestaoDesafio, Integer idAluno, Boolean isCorreta) {
		QuestaoDesafioAluno questaoDesafioAluno = daoQuestaoDesafioAluno.getQuestaoDesafioAluno(idAluno, idQuestaoDesafio);
		questaoDesafioAluno.setRespostaCorreta(isCorreta);
		daoQuestaoDesafioAluno.save(questaoDesafioAluno);
		return true;
	}
	


}
