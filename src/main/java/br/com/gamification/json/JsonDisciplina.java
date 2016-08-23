package br.com.gamification.json;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.gamification.core.json.SyncOperation;
import br.com.gamification.core.serialization.CustomSyncObjectIdDeserializer;
import br.com.gamification.core.serialization.CustomDoubleDeserializer;

/**
*  generated: 23/08/2016 08:32:11
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonDisciplina implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String nome;
	private ArrayList<JsonAluno> alunos = new ArrayList<JsonAluno>();	
	private ArrayList<JsonLista> listas = new ArrayList<JsonLista>();		
	private ArrayList<JsonRanking> rankings = new ArrayList<JsonRanking>();		
	private JsonProfessor professor;		
	
	public  JsonDisciplina() {
		
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
	
	public ArrayList<JsonAluno> getAlunos() {
		return alunos;
	}
	
	public void setAlunos(ArrayList<JsonAluno> aluno) {
		this.alunos = aluno;
	}

	public ArrayList<JsonLista> getListas() {
		return listas;
	}
	
	public void setListas(ArrayList<JsonLista> lista) {
		this.listas = lista;
	}

	public ArrayList<JsonRanking> getRankings() {
		return rankings;
	}
	
	public void setRankings(ArrayList<JsonRanking> ranking) {
		this.rankings = ranking;
	}

	public JsonProfessor getProfessor() {
		return professor;
	}
	
	public void setProfessor(JsonProfessor professor) {
		this.professor = professor;
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