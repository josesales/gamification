package br.com.gamification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;




import br.com.gamification.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gamification.core.serialization.CustomLocalDateSerializer;
import br.com.gamification.core.model.AbstractTimestampEntity;
/**
* generated: 23/08/2016 08:32:12
**/
@Entity
@Audited
@Table(name = "QUESTAO")
@SequenceGenerator(name = "QUESTAO_SEQUENCE", sequenceName = "QUESTAO_SEQUENCE")
public class Questao extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QUESTAO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "PERGUNTA")
	private String pergunta;		
		
	@Column(name = "ITEM_A")
	private String itemA;		
		
	@Column(name = "ITEM_B")
	private String itemB;		
		
	@Column(name = "ITEM_C")
	private String itemC;		
		
	@Column(name = "ITEM_D")
	private String itemD;		
		
	@Column(name = "ITEM_CORRETO")
	private String itemCorreto;		
		
	@Column(name = "PONTOS")
	private Integer pontos;
	
	@Transient
	private String itemMarcado;
	
	@ManyToOne
	@JoinColumn(name = "ID_LISTA")
	private Lista lista;		
		
	public  Questao() {
		
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
	public Lista getLista() {
		return lista;
	}
	
	public void setLista(Lista lista) {
		this.lista = lista;
	}
	
	public String getItemMarcado() {
		return itemMarcado;
	}
	
	public void setItemMarcado(String itemMarcado) {
		this.itemMarcado = itemMarcado;
	}
	
	
}
