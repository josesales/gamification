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
import br.com.gamification.model.Questao;
import br.com.gamification.persistence.DaoQuestao;

/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@Transactional
public class QuestaoServiceImp implements QuestaoService {

	private static final Logger LOGGER = Logger.getLogger(QuestaoServiceImp.class);
	
	@Inject
	DaoQuestao daoQuestao;
	@Inject
	AlunoService alunoService;
	@Inject
	ListaService listaService;
	@Inject
	RankingService rankingService;

	@Override
	public Questao get(Integer id) {
		return daoQuestao.find(id);
	}
	

	@Override
	public Pager<Questao> all(PaginationParams paginationParams) {
		Pagination<Questao> pagination = daoQuestao.getAll(paginationParams);
		return new Pager<Questao>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Questao> filter(PaginationParams paginationParams) {
		List<Questao> list = daoQuestao.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Questao> all() {
		return daoQuestao.getAll();
	}

	@Override
	public List<Questao> search(String description) {
		return new ArrayList<Questao>();
	}
	
	public List<Questao> last(LocalDateTime lastSyncDate){
		return daoQuestao.last(lastSyncDate);
	}
			
	@Override
	public Questao save(Questao entity) {
		return daoQuestao.save(entity);
	}

	@Override
	public Questao update(Questao entity) {
		return daoQuestao.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoQuestao.delete(id);
	}


	@Override
	public Boolean responder(Integer idQuestao, String itemMarcado, Integer idAluno) {
		Questao questao = daoQuestao.find(idQuestao);
		Aluno aluno = alunoService.get(idAluno);
		boolean retorno = true; 
		if(questao.getItemCorreto().trim().equalsIgnoreCase(itemMarcado)) {
			alunoService.pontuar(aluno, questao.getPontos());
			rankingService.pontuar(aluno, questao.getLista().getDisciplina(), questao.getPontos());
		}else {
			retorno = false; 
		}
		
		atualizarQuestaoAtual(idAluno, questao.getLista());
		
		return retorno;
	}
	
	private void atualizarQuestaoAtual(Integer idAluno, Lista lista) {
		//TODO testar setar campos tansiente da lista
		Integer questaoAtual = 0;
		ListaAluno listaAluno = listaService.getListaAluno(idAluno, lista.getId());
		if(listaAluno == null) {
			listaAluno = new ListaAluno();
			Aluno alunoTemp = new Aluno();
			alunoTemp.setId(idAluno);
			listaAluno.setAluno(alunoTemp);
			listaAluno.setLista(lista);
		}
		if(listaAluno.getQuestaoAtual() != null) {
			questaoAtual = listaAluno.getQuestaoAtual();
		}
		questaoAtual++;
		listaAluno.setQuestaoAtual(questaoAtual);
		if(questaoAtual >= lista.getQuestaos().size()) {
			listaAluno.setConcluida(true);
		}
		listaService.save(listaAluno);
	}


}
