package br.com.gamification.service;

import java.util.List;

import org.apache.log4j.Logger;

import javax.inject.Inject;
import javax.inject.Named;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.joda.time.LocalDateTime;





import br.com.gamification.model.Aluno;
import br.com.gamification.model.Disciplina;
import br.com.gamification.model.filter.FilterDisciplina;
import br.com.gamification.persistence.DaoAluno;
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
public class AlunoServiceImp implements AlunoService {

	private static final Logger LOGGER = Logger.getLogger(AlunoServiceImp.class);
	
	@Inject
	DaoAluno daoAluno;
	
	@Autowired
	DisciplinaService disciplinaService;

	@Override
	public Aluno get(Integer id) {
		return daoAluno.find(id);
	}
	

	@Override
	public Pager<Aluno> all(PaginationParams paginationParams) {
		Pagination<Aluno> pagination = daoAluno.getAll(paginationParams);
		return new Pager<Aluno>(pagination.getResults(), 0, pagination.getTotalRecords());
	}
	
	
	@Override
	public List<Aluno> filter(PaginationParams paginationParams) {
		List<Aluno> list = daoAluno.filter(paginationParams);
		return list;
	}
	
	@Override
	public List<Aluno> all() {
		return daoAluno.getAll();
	}

	@Override
	public List<Aluno> search(String description) {
		return new ArrayList<Aluno>();
	}
	
	public List<Aluno> last(LocalDateTime lastSyncDate){
		return daoAluno.last(lastSyncDate);
	}
			
	@Override
	public Aluno save(Aluno entity) {
		return daoAluno.save(entity);
	}

	@Override
	public Aluno update(Aluno entity) {
		return daoAluno.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		FilterDisciplina filterDisciplina = new FilterDisciplina();
		filterDisciplina.setAluno(id);
		filterDisciplina.setIsAlunoIncluso(true);
		List<Disciplina> listaDisciplina = disciplinaService.filter(filterDisciplina);
		for(Disciplina disciplina : listaDisciplina){
			disciplinaService.removeAluno(disciplina.getId(), id);
		}
		
		return daoAluno.delete(id);
	}


}
