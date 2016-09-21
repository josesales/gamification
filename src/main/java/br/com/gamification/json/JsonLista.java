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
public class JsonLista implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String nome;
	private ArrayList<JsonQuestao> questaos = new ArrayList<JsonQuestao>();		
	private ArrayList<JsonQuestaoDesafio> questaoDesafios = new ArrayList<JsonQuestaoDesafio>();		
	private JsonDisciplina disciplina;		
	private Integer questaoAtual;
	private Integer desafioAtual;
	private Boolean concluida;
	private Boolean desafioConcluido;
	
	public Integer getDesafioAtual() {
		return desafioAtual;
	}

	public void setDesafioAtual(Integer desafioAtual) {
		this.desafioAtual = desafioAtual;
	}

	public Boolean getDesafioConcluido() {
		return desafioConcluido;
	}

	public void setDesafioConcluido(Boolean desafioConcluido) {
		this.desafioConcluido = desafioConcluido;
	}

	public  JsonLista() {
		
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
	
	public ArrayList<JsonQuestao> getQuestaos() {
		return questaos;
	}
	
	public void setQuestaos(ArrayList<JsonQuestao> questao) {
		this.questaos = questao;
	}

	public ArrayList<JsonQuestaoDesafio> getQuestaoDesafios() {
		return questaoDesafios;
	}
	
	public void setQuestaoDesafios(ArrayList<JsonQuestaoDesafio> questaoDesafio) {
		this.questaoDesafios = questaoDesafio;
	}

	public JsonDisciplina getDisciplina() {
		return disciplina;
	}
	
	public void setDisciplina(JsonDisciplina disciplina) {
		this.disciplina = disciplina;
	}
	public Integer getQuestaoAtual() {
		return questaoAtual;
	}

	public void setQuestaoAtual(Integer questaoAtual) {
		this.questaoAtual = questaoAtual;
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