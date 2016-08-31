package br.com.gamification.model.filter;

import java.io.Serializable;


/**
*  generated: 23/08/2016 08:32:12
**/
public class FilterRanking implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer pontos;  			

	private Integer disciplina;		
	private Integer aluno;	
	private Boolean isFiltraDisciplinasAluno;
	
	public  FilterRanking() {
		
	}
	

	public Integer getPontos() {
		return pontos;
	}

	public void setPontos(Integer pontos) {
		this.pontos = pontos;
	}
		
	public Integer getDisciplina() {
		return disciplina;
	}
	
	public void setDisciplina(Integer disciplina) {
		this.disciplina = disciplina;
	}
	public Integer getAluno() {
		return aluno;
	}
	
	public void setAluno(Integer aluno) {
		this.aluno = aluno;
	}


	public Boolean getIsFiltraDisciplinasAluno() {
		return isFiltraDisciplinasAluno;
	}


	public void setIsFiltraDisciplinasAluno(Boolean isFiltraDisciplinasAluno) {
		this.isFiltraDisciplinasAluno = isFiltraDisciplinasAluno;
	}


	
}