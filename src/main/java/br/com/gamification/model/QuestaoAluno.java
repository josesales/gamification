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
@Table(name = "QUESTAO_ALUNO")
@SequenceGenerator(name = "QUESTAOALUNO_SEQUENCE", sequenceName = "QUESTAOALUNO_SEQUENCE")
public class QuestaoAluno extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QUESTAOALUNO_SEQUENCE")	
	private Integer id;
		
	@ManyToOne
	@JoinColumn(name = "ID_ALUNO")
	private Aluno aluno;
	
	@ManyToOne
	@JoinColumn(name = "ID_QUESTAO")
	private Questao questao;
		
	@Column(name = "ITEM_MARCADO")
	private String itemMarcado;		
	
	public  QuestaoAluno() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public Aluno getAluno() {
		return aluno;
	}
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	public Questao getQuestao() {
		return questao;
	}
	public void setQuestao(Questao questao) {
		this.questao = questao;
	}
	public String getItemMarcado() {
		return itemMarcado;
	}
	public void setItemMarcado(String itemMarcado) {
		this.itemMarcado = itemMarcado;
	}
	
}
