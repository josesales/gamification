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
public class JsonQuestao implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
	private Integer id;
	private SyncOperation syncOperation;
	private String pergunta;
	private String itemA;
	private String itemB;
	private String itemC;
	private String itemD;
	private String itemCorreto;
	private Integer pontos;
	private JsonLista lista;		
	
	public  JsonQuestao() {
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
	
}