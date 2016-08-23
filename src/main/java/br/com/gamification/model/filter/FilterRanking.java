package br.com.gamification.model.filter;

import java.io.Serializable;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;


import br.com.gamification.core.serialization.CustomLocalDateSerializer;
import br.com.gamification.core.serialization.CustomLocalDateDeserializer;
import br.com.gamification.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gamification.core.serialization.CustomLocalDateTimeDeserializer;


/**
*  generated: 23/08/2016 08:32:12
**/
public class FilterRanking implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer pontos;  			

	private Integer disciplina;		
	private Integer aluno;		
	
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
	
}