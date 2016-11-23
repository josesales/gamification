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
import org.hibernate.validator.constraints.Length;

import br.com.gamification.core.model.AbstractTimestampEntity;
/**
* generated: 23/08/2016 08:32:12
**/
@Entity
@Audited
@Table(name = "QUESTAO_DESAFIO_ALUNO")
@SequenceGenerator(name = "QUESTAODESAFIOALUNO_SEQUENCE", sequenceName = "QUESTAODESAFIOALUNO_SEQUENCE")
public class QuestaoDesafioAluno extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QUESTAODESAFIOALUNO_SEQUENCE")	
	private Integer id;
		
	@ManyToOne
	@JoinColumn(name = "ID_ALUNO")
	private Aluno aluno;
	
	@ManyToOne
	@JoinColumn(name = "ID_QUESTAO_DESAFIO")
	private QuestaoDesafio questaoDesafio;
		
	@Column(name = "RESPOSTA")
	private String resposta;
	
	@Column(name = "RESPOSTA_ESCRITA", columnDefinition="TEXT")
	private String respostaTexto;
	
	@Column(name = "RESPOSTA_CORRETA")
	private Boolean respostaCorreta;
	
	public  QuestaoDesafioAluno() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getResposta() {
		return resposta;
	}

	public void setResposta(String resposta) {
		this.resposta = resposta;
	}
	public Aluno getAluno() {
		return aluno;
	}
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	public QuestaoDesafio getQuestaoDesafio() {
		return questaoDesafio;
	}
	public void setQuestaoDesafio(QuestaoDesafio questaoDesafio) {
		this.questaoDesafio = questaoDesafio;
	}
	public String getRespostaTexto() {
		return respostaTexto;
	}
	public void setRespostaTexto(String respostaTexto) {
		this.respostaTexto = respostaTexto;
	}
	public Boolean getRespostaCorreta() {
		return respostaCorreta;
	}
	public void setRespostaCorreta(Boolean respostaCorreta) {
		this.respostaCorreta = respostaCorreta;
	}
	
}
