package br.com.gamification.model.filter;

import java.io.Serializable;


/**
*  generated: 23/08/2016 08:32:11
**/
public class FilterDisciplina implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			

	private Integer professor;
	
	private Integer aluno;
	
	private Boolean isAlunoIncluso;
	
	public  FilterDisciplina() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
		
	public Integer getProfessor() {
		return professor;
	}
	
	public void setProfessor(Integer professor) {
		this.professor = professor;
	}


	public Integer getAluno() {
		return aluno;
	}


	public void setAluno(Integer aluno) {
		this.aluno = aluno;
	}


	public Boolean getIsAlunoIncluso() {
		return isAlunoIncluso;
	}


	public void setIsAlunoIncluso(Boolean isAlunoIncluso) {
		this.isAlunoIncluso = isAlunoIncluso;
	}
	
}