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
public class FilterAluno implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			

	private Integer usuario;	
	
	private Boolean comPontos;
	
	public  FilterAluno() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
		
	public Integer getUsuario() {
		return usuario;
	}
	
	public void setUsuario(Integer usuario) {
		this.usuario = usuario;
	}


	public Boolean getComPontos() {
		return comPontos;
	}


	public void setComPontos(Boolean comPontos) {
		this.comPontos = comPontos;
	}
	
}