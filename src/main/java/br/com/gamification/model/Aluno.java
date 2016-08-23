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
* generated: 23/08/2016 08:32:11
**/
@Entity
@Audited
@Table(name = "ALUNO")
@SequenceGenerator(name = "ALUNO_SEQUENCE", sequenceName = "ALUNO_SEQUENCE")
public class Aluno extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ALUNO_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;		
	
    @ManyToMany(mappedBy="alunos")
    private List<Disciplina> diciplinas;
	
	@OneToMany(mappedBy="aluno")
	private List<Ranking> rankings;		
	
	@ManyToOne
	@JoinColumn(name = "ID_USUARIO")
	private User usuario;		
		
	public  Aluno() {
		
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
	public void setDiciplinas(List<Disciplina> diciplinas){
		this.diciplinas = diciplinas;
	}
	
	public List<Disciplina>  getDiciplinas() {
		if(this.diciplinas == null){
			setDiciplinas(new ArrayList<Disciplina>());
		}
		return this.diciplinas; 
	}
		
	public boolean addDiciplinas(Disciplina disciplina){	
		return getDiciplinas().add(disciplina);
	}
	
	public boolean removeDiciplinas(Disciplina disciplina){	
		return getDiciplinas().remove(disciplina);
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
		ranking.setAluno(this);
		return getRankings().add(ranking);
	}
	
	public boolean removeRankings(Ranking ranking){
		ranking.setAluno(null);
		return getRankings().remove(ranking);
	}
	
	public User getUsuario() {
		return usuario;
	}
	
	public void setUsuario(User user) {
		this.usuario = user;
	}
	
	
}
