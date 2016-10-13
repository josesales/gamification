package br.com.gamification.json;

import java.io.Serializable;

import br.com.gamification.core.json.SyncOperation;
import br.com.gamification.core.serialization.CustomDoubleDeserializer;
import br.com.gamification.core.serialization.CustomSyncObjectIdDeserializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 23/08/2016 08:32:12
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonQuestaoDesafio implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	@JsonDeserialize(using = CustomDoubleDeserializer.class)
	private Double pontos;
	private String pergunta;
	private String resposta;
	private JsonLista lista;
	private Boolean respostaCorreta;
	private String respostaTexto;
	
	public  JsonQuestaoDesafio() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public Double getPontos() {
		return pontos;
	}

	public void setPontos(Double pontos) {
		this.pontos = pontos;
	}
	public String getPergunta() {
		return pergunta;
	}

	public void setPergunta(String pergunta) {
		this.pergunta = pergunta;
	}
	public String getResposta() {
		return resposta;
	}

	public void setResposta(String resposta) {
		this.resposta = resposta;
	}
	
	public JsonLista getLista() {
		return lista;
	}
	
	public void setLista(JsonLista lista) {
		this.lista = lista;
	}
	public SyncOperation getSyncOperation (){
		if(syncOperation == null){
			this.syncOperation = SyncOperation.NONE;
		}
		return syncOperation;
	}
	
	public void setSyncOperation (SyncOperation  syncOperation){
		this.syncOperation = syncOperation;
	}

	/**
	 * @return the respostaCorreta
	 */
	public Boolean getRespostaCorreta() {
		return respostaCorreta;
	}

	/**
	 * @param respostaCorreta the respostaCorreta to set
	 */
	public void setRespostaCorreta(Boolean respostaCorreta) {
		this.respostaCorreta = respostaCorreta;
	}

	/**
	 * @return the respostaTexto
	 */
	public String getRespostaTexto() {
		return respostaTexto;
	}

	/**
	 * @param respostaTexto the respostaTexto to set
	 */
	public void setRespostaTexto(String respostaTexto) {
		this.respostaTexto = respostaTexto;
	}
	
}