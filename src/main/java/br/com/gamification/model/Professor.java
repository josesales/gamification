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
@Table(name = "PROFESSOR")
@SequenceGenerator(name = "PROFESSOR_SEQUENCE", sequenceName = "PROFESSOR_SEQUENCE")
public class Professor extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROFESSOR_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NOME")
	private String nome;		
	
	@OneToMany(mappedBy="professor")
	private List<Disciplina> disciplinas;		
	
	@ManyToOne
	@JoinColumn(name = "ID_USUARIO")
	private User usuario;		
		
	public  Professor() {
		
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
	public void setDisciplinas(List<Disciplina> disciplinas){
		this.disciplinas = disciplinas;
	}
	
	public List<Disciplina>  getDisciplinas() {
		if(this.disciplinas == null){
			setDisciplinas(new ArrayList<Disciplina>());
		}
		return this.disciplinas;
	}
		
	public boolean addDisciplinas(Disciplina disciplina){
		disciplina.setProfessor(this);
		return getDisciplinas().add(disciplina);
	}
	
	public boolean removeDisciplinas(Disciplina disciplina){
		disciplina.setProfessor(null);
		return getDisciplinas().remove(disciplina);
	}
	
	public User getUsuario() {
		return usuario;
	}
	
	public void setUsuario(User user) {
		this.usuario = user;
	}
	
	
}
