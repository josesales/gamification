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
public class FilterCidade implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String nome;  			
	
	private String cep;  			

	private Integer estado;		
	
	public  FilterCidade() {
		
	}
	

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
		
	public Integer getEstado() {
		return estado;
	}
	
	public void setEstado(Integer estado) {
		this.estado = estado;
	}
	
}