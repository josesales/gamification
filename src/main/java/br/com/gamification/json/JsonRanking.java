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
*  generated: 23/08/2016 08:32:12
**/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonRanking implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private Integer pontos;
	private JsonDisciplina disciplina;		
	private JsonAluno aluno;		
	
	public  JsonRanking() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getPontos() {
		return pontos;
	}

	public void setPontos(Integer pontos) {
		this.pontos = pontos;
	}
	
	public JsonDisciplina getDisciplina() {
		return disciplina;
	}
	
	public void setDisciplina(JsonDisciplina disciplina) {
		this.disciplina = disciplina;
	}
	public JsonAluno getAluno() {
		return aluno;
	}
	
	public void setAluno(JsonAluno aluno) {
		this.aluno = aluno;
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