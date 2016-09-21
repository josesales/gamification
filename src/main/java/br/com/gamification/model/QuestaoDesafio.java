package br.com.gamification.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import br.com.gamification.core.model.AbstractTimestampEntity;
/**
* generated: 23/08/2016 08:32:12
**/
@Entity
@Audited
@Table(name = "QUESTAO_DESAFIO")
@SequenceGenerator(name = "QUESTAODESAFIO_SEQUENCE", sequenceName = "QUESTAODESAFIO_SEQUENCE")
public class QuestaoDesafio extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QUESTAODESAFIO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "PONTOS")
	private Double pontos;  			
		
	@Column(name = "PERGUNTA")
	private String pergunta;		
		
	@Column(name = "RESPOSTA")
	private String resposta;		
	
	@ManyToOne
	@JoinColumn(name = "ID_LISTA")
	private Lista lista;		
		
	public  QuestaoDesafio() {
		
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
	public Lista getLista() {
		return lista;
	}
	
	public void setLista(Lista lista) {
		this.lista = lista;
	}
	
	
}
