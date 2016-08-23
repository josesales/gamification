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
public class FilterQuestao implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String pergunta;  			
	
	private String itemA;  			
	
	private String itemB;  			
	
	private String itemC;  			
	
	private String itemD;  			
	
	private String itemCorreto;  			
	
	private Integer pontos;  			

	private Integer lista;		
	
	public  FilterQuestao() {
		
	}
	

	public String getPergunta() {
		return pergunta;
	}

	public void setPergunta(String pergunta) {
		this.pergunta = pergunta;
	}
	public String getItemA() {
		return itemA;
	}

	public void setItemA(String itemA) {
		this.itemA = itemA;
	}
	public String getItemB() {
		return itemB;
	}

	public void setItemB(String itemB) {
		this.itemB = itemB;
	}
	public String getItemC() {
		return itemC;
	}

	public void setItemC(String itemC) {
		this.itemC = itemC;
	}
	public String getItemD() {
		return itemD;
	}

	public void setItemD(String itemD) {
		this.itemD = itemD;
	}
	public String getItemCorreto() {
		return itemCorreto;
	}

	public void setItemCorreto(String itemCorreto) {
		this.itemCorreto = itemCorreto;
	}
	public Integer getPontos() {
		return pontos;
	}

	public void setPontos(Integer pontos) {
		this.pontos = pontos;
	}
		
	public Integer getLista() {
		return lista;
	}
	
	public void setLista(Integer lista) {
		this.lista = lista;
	}
	
}