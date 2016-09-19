package br.com.gamification.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.joda.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;

import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.model.Aluno;
import br.com.gamification.model.Disciplina;
import br.com.gamification.model.Ranking;
import br.com.gamification.model.filter.FilterRanking;
import br.com.gamification.persistence.DaoRanking;

/**
*  generated: 23/08/2016 08:32:12
**/

@Named
@Transactional
public class RankingServiceImp implements RankingService {

	private static final Logger LOGGER = Logger.getLogger(RankingServiceImp.class);
	
	@Inject
	DaoRanking daoRanking;

	@Override
	public Ranking get(Integer id) {
		return daoRanking.find(id);
	}
	

	@Override
	public Pager<Ranking> all(PaginationParams paginationParams) {
		Pagination<Ranking> pagination = daoRanking.getAll(paginationParams);
		List<Ranking> rankings = pagination.getResults();
		int numeroPagina = paginationParams.getPage();
		int tamanhoPagina = paginationParams.getPageSize();
		
		//TODO verificar se logica abaixo funciona
		for (int index = 0; index < rankings.size(); index++) {
			
			//descobre a posicao de forma a tratar paginacao
			int posicao = ((numeroPagina - 1) * tamanhoPagina) + (index + 1);
			rankings.get(index).setPosicao(posicao);
		}
		
		return new Pager<Ranking>(rankings, 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Ranking> filter(PaginationParams paginationParams) {
		List<Ranking> list = daoRanking.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Ranking> all() {
		return daoRanking.getAll();
	}

	@Override
	public List<Ranking> search(String description) {
		return new ArrayList<Ranking>();
	}
	
	public List<Ranking> last(LocalDateTime lastSyncDate){
		return daoRanking.last(lastSyncDate);
	}
			
	@Override
	public Ranking save(Ranking entity) {
		return daoRanking.save(entity);
	}

	@Override
	public Ranking update(Ranking entity) {
		return daoRanking.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoRanking.delete(id);
	}


	@Override
	public Pager<Ranking> filtraDisciplinasAluno(PaginationParams paginationParams) {
		Pagination<Ranking> pagination = daoRanking.getAll(paginationParams);
		return new Pager<Ranking>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	public void desvincularAlunoDaDisciplina(int idAluno, int idDisciplina) {
		String hql = "select r.id from Ranking r where r.disciplina.id = :idDisciplina and r.aluno.id = :idAluno";
		List<Integer> listaIds = new ArrayList<Integer>();
		
		try {
			
			Query query = daoRanking.query(hql);
			query.setParameter("idDisciplina", idDisciplina);
			query.setParameter("idAluno", idAluno);
			listaIds.addAll(query.list());
			for(Integer id : listaIds) {
				daoRanking.delete(id);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void pontuar(Aluno aluno, Disciplina disciplina, Integer pontos) {
		Ranking ranking = null;
		FilterRanking filter = new FilterRanking();
		filter.setAluno(aluno.getId());
		filter.setDisciplina(disciplina.getId());
		List<Ranking> listaRanking = daoRanking.filter(filter);
		
		//se aluno nao tiver ranking na disciplina insere ele no mesmo, se tiver atualiza
		if(listaRanking == null || listaRanking.isEmpty()) {
			ranking = new Ranking();
			ranking.setAluno(aluno);
			ranking.setDisciplina(disciplina);
			ranking.setPontos(pontos);
		}else {
			ranking = listaRanking.get(0);
			ranking.setPontos(ranking.getPontos() + pontos);
		}
		
		daoRanking.save(ranking);
	}




}
