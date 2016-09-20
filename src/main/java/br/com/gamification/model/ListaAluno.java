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
* generated: 23/08/2016 08:32:11
**/
@Entity
@Audited
@Table(name = "LISTA_ALUNO")
@SequenceGenerator(name = "LISTA_ALUNO_SEQUENCE", sequenceName = "LISTA_ALUNO_SEQUENCE")
public class ListaAluno extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LISTA_ALUNO_SEQUENCE")	
	private Integer id;
		
	@ManyToOne
	@JoinColumn(name = "ID_LISTA")
	private Lista lista;
	
	@ManyToOne
	@JoinColumn(name = "ID_ALUNO")
	private Aluno aluno;		
	
	@Column(name = "QUESTAO_ATUAL")
	private Integer questaoAtual;
	
	@Column(name = "CONCLUIDA")
	private Boolean concluida;
	
	public  ListaAluno() {
		
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getQuestaoAtual() {
		return questaoAtual;
	}
	public void setQuestaoAtual(Integer questaoAtual) {
		this.questaoAtual = questaoAtual;
	}
	public Boolean getConcluida() {
		return concluida;
	}
	public void setConcluida(Boolean concluida) {
		this.concluida = concluida;
	}
	public Lista getLista() {
		return lista;
	}
	public void setLista(Lista lista) {
		this.lista = lista;
	}
	public Aluno getAluno() {
		return aluno;
	}
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	
	
}
