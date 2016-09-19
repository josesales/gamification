package br.com.gamification.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.envers.Audited;

import br.com.gamification.core.model.AbstractTimestampEntity;
/**
* generated: 23/08/2016 08:32:11
**/
@Entity
@Audited
@Table(name = "LISTA")
@SequenceGenerator(name = "LISTA_SEQUENCE", sequenceName = "LISTA_SEQUENCE")
public class Lista extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LISTA_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;		
	
	@OneToMany(mappedBy="lista")
	private List<Questao> questaos;		
	
	@OneToMany(mappedBy="lista")
	private List<QuestaoDesafio> questaoDesafios;		
	
	@ManyToOne
	@JoinColumn(name = "ID_DISCIPLINA")
	private Disciplina disciplina;		
	
	@Transient
	private Integer questaoAtual;
	
	@Transient
	private Boolean concluida;
	//TODO ajustar questaoAtual para que seja individual para cada aluno, do jeito q ta fica como se todos os alunos estivessem na mesma questao
	//criar flag ajustando para que quando a lista estiver resolvida, aluno saia volte para a pagina de escolha da lista e a mesma estej bloqueada
	
	
	public  Lista() {
		
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
	public void setQuestaos(List<Questao> questaos){
		this.questaos = questaos;
	}
	
	public List<Questao>  getQuestaos() {
		if(this.questaos == null){
			setQuestaos(new ArrayList<Questao>());
		}
		return this.questaos;
	}
		
	public boolean addQuestaos(Questao questao){
		questao.setLista(this);
		return getQuestaos().add(questao);
	}
	
	public boolean removeQuestaos(Questao questao){
		questao.setLista(null);
		return getQuestaos().remove(questao);
	}
	
	public void setQuestaoDesafios(List<QuestaoDesafio> questaoDesafios){
		this.questaoDesafios = questaoDesafios;
	}
	
	public List<QuestaoDesafio>  getQuestaoDesafios() {
		if(this.questaoDesafios == null){
			setQuestaoDesafios(new ArrayList<QuestaoDesafio>());
		}
		return this.questaoDesafios;
	}
		
	public boolean addQuestaoDesafios(QuestaoDesafio questaoDesafio){
		questaoDesafio.setLista(this);
		return getQuestaoDesafios().add(questaoDesafio);
	}
	
	public boolean removeQuestaoDesafios(QuestaoDesafio questaoDesafio){
		questaoDesafio.setLista(null);
		return getQuestaoDesafios().remove(questaoDesafio);
	}
	
	public Disciplina getDisciplina() {
		return disciplina;
	}
	
	public void setDisciplina(Disciplina disciplina) {
		this.disciplina = disciplina;
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
	
	
}
