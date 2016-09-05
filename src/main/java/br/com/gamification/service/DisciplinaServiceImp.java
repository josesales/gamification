package br.com.gamification.service;

import java.util.List;

import org.apache.log4j.Logger;

import javax.inject.Inject;
import javax.inject.Named;

import java.util.ArrayList;

import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;




import br.com.gamification.model.Aluno;
import br.com.gamification.model.Disciplina;
import br.com.gamification.persistence.DaoDisciplina;
import br.com.gamification.core.persistence.pagination.Pager;
import br.com.gamification.core.persistence.pagination.Pagination;
import br.com.gamification.core.persistence.pagination.PaginationParams;
import br.com.gamification.core.utils.DateUtil;
import br.com.gamification.core.utils.Util;

/**
*  generated: 23/08/2016 08:32:11
**/

@Named
@Transactional
public class DisciplinaServiceImp implements DisciplinaService {

	private static final Logger LOGGER = Logger.getLogger(DisciplinaServiceImp.class);
	
	@Inject
	DaoDisciplina daoDisciplina;
	@Inject
	RankingService rankingService;

	@Override
	public Disciplina get(Integer id) {
		return daoDisciplina.find(id);
	}
	

	@Override
	public Pager<Disciplina> all(PaginationParams paginationParams) {
		Pagination<Disciplina> pagination = daoDisciplina.getAll(paginationParams);
		return new Pager<Disciplina>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Disciplina> filter(PaginationParams paginationParams) {
		List<Disciplina> list = daoDisciplina.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Disciplina> all() {
		return daoDisciplina.getAll();
	}

	@Override
	public List<Disciplina> search(String description) {
		return new ArrayList<Disciplina>();
	}
	
	public List<Disciplina> last(LocalDateTime lastSyncDate){
		return daoDisciplina.last(lastSyncDate);
	}
			
	@Override
	public Disciplina save(Disciplina entity) {
		return daoDisciplina.save(entity);
	}

	@Override
	public Disciplina update(Disciplina entity) {
		return daoDisciplina.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoDisciplina.delete(id);
	}
	
	public Boolean removeAluno(Integer idDisciplina, Integer idAluno) {
		Aluno aluno = new Aluno();
		aluno.setId(idAluno);
		Disciplina disciplina = daoDisciplina.find(idDisciplina);
		disciplina.getAlunos().remove(aluno);
		daoDisciplina.save(disciplina);
		rankingService.desvincularAlunoDaDisciplina(idAluno, idDisciplina);
		//TODO testar
		
		return true;
	}


}
