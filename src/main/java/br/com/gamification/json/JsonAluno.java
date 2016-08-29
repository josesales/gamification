package br.com.gamification.json;

import java.io.Serializable;
import java.util.ArrayList;

import br.com.gamification.core.json.SyncOperation;
import br.com.gamification.core.serialization.CustomSyncObjectIdDeserializer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

/**
*  generated: 23/08/2016 08:32:11
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonAluno implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String nome;
	private ArrayList<JsonDisciplina> diciplinas = new ArrayList<JsonDisciplina>();	
	private ArrayList<JsonRanking> rankings = new ArrayList<JsonRanking>();		
	private JsonUser usuario;	
	private Integer pontos;
	private Integer level;
	private Integer proximoLevel;
	
	public  JsonAluno() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public ArrayList<JsonDisciplina> getDiciplinas() {
		return diciplinas;
	}
	
	public void setDiciplinas(ArrayList<JsonDisciplina> disciplina) {
		this.diciplinas = disciplina;
	}

	public ArrayList<JsonRanking> getRankings() {
		return rankings;
	}
	
	public void setRankings(ArrayList<JsonRanking> ranking) {
		this.rankings = ranking;
	}

	public JsonUser getUsuario() {
		return usuario;
	}
	
	public void setUsuario(JsonUser user) {
		this.usuario = user;
	}
	public Integer getPontos() {
		return pontos;
	}

	public void setPontos(Integer pontos) {
		this.pontos = pontos;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getProximoLevel() {
		return proximoLevel;
	}

	public void setProximoLevel(Integer proximoLevel) {
		this.proximoLevel = proximoLevel;
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
	
}