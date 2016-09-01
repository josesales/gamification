package br.com.gamification.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import br.com.gamification.core.model.AbstractTimestampEntity;
/**
* generated: 23/08/2016 08:32:11
**/
@Entity
@Audited
@Table(name = "DISCIPLINA")
@SequenceGenerator(name = "DISCIPLINA_SEQUENCE", sequenceName = "DISCIPLINA_SEQUENCE")
public class Disciplina extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DISCIPLINA_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;		
	
    @ManyToMany
    @JoinTable(name="DISCIPLINA_ALUNO", joinColumns = @JoinColumn(name = "DISCIPLINA_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "ALUNO_ID", referencedColumnName = "ID") )
    private List<Aluno> alunos;
	
	@OneToMany(mappedBy="disciplina")
	private List<Lista> listas;		
	
	@OneToMany(mappedBy="disciplina")
	private List<Ranking> rankings;		
	
	@ManyToOne
	@JoinColumn(name = "ID_PROFESSOR")
	private Professor professor;		
		
	public  Disciplina() {
		
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
	public void setAlunos(List<Aluno> alunos){
		this.alunos = alunos;
	}
	
	public List<Aluno>  getAlunos() {
		if(this.alunos == null){
			setAlunos(new ArrayList<Aluno>());
		}
		return this.alunos; 
	}
		
	public boolean addAlunos(Aluno aluno){	
		return getAlunos().add(aluno);
	}
	
	public void setListas(List<Lista> listas){
		this.listas = listas;
	}
	
	public List<Lista>  getListas() {
		if(this.listas == null){
			setListas(new ArrayList<Lista>());
		}
		return this.listas;
	}
		
	public boolean addListas(Lista lista){
		lista.setDisciplina(this);
		return getListas().add(lista);
	}
	
	public boolean removeListas(Lista lista){
		lista.setDisciplina(null);
		return getListas().remove(lista);
	}
	
	public void setRankings(List<Ranking> rankings){
		this.rankings = rankings;
	}
	
	public List<Ranking>  getRankings() {
		if(this.rankings == null){
			setRankings(new ArrayList<Ranking>());
		}
		return this.rankings;
	}
		
	public boolean addRankings(Ranking ranking){
		ranking.setDisciplina(this);
		return getRankings().add(ranking);
	}
	
	public boolean removeRankings(Ranking ranking){
		ranking.setDisciplina(null);
		return getRankings().remove(ranking);
	}
	
	public Professor getProfessor() {
		return professor;
	}
	
	public void setProfessor(Professor professor) {
		this.professor = professor;
	}
	
	
}
