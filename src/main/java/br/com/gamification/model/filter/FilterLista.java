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
*  generated: 23/08/2016 08:32:11
**/
public class FilterLista implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			

	private Integer disciplina;		
	
	private Boolean concluida;
	
	public  FilterLista() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
		
	public Integer getDisciplina() {
		return disciplina;
	}
	
	public void setDisciplina(Integer disciplina) {
		this.disciplina = disciplina;
	}


	/**
	 * @return the concluida
	 */
	public Boolean getConcluida() {
		return concluida;
	}


	/**
	 * @param concluida the concluida to set
	 */
	public void setConcluida(Boolean concluida) {
		this.concluida = concluida;
	}
	
}