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
import javax.persistence.Transient;

import org.hibernate.envers.Audited;

import br.com.gamification.core.model.AbstractTimestampEntity;
/**
* generated: 23/08/2016 08:32:12
**/
@Entity
@Audited
@Table(name = "RANKING")
@SequenceGenerator(name = "RANKING_SEQUENCE", sequenceName = "RANKING_SEQUENCE")
public class Ranking extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RANKING_SEQUENCE")	
	private Integer id;
		
	@Column(name = "PONTOS")
	private Integer pontos;  			
	
	@ManyToOne
	@JoinColumn(name = "ID_DISCIPLINA")
	private Disciplina disciplina;		
	
	@ManyToOne
	@JoinColumn(name = "ID_ALUNO")
	private Aluno aluno;
	
	@Transient
	private int posicao;
		
	public  Ranking() {
		
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
	public Disciplina getDisciplina() {
		return disciplina;
	}
	
	public void setDisciplina(Disciplina disciplina) {
		this.disciplina = disciplina;
	}
	
	public Aluno getAluno() {
		return aluno;
	}
	
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	public int getPosicao() {
		return posicao;
	}
	public void setPosicao(int posicao) {
		this.posicao = posicao;
	}
	
	
}
