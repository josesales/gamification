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
import javax.persistence.UniqueConstraint;		

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
@Table(name = "TB_USER", uniqueConstraints = {
		@UniqueConstraint(name = "TB_USER_USERNAME", columnNames = { "USERNAME" }), 
})
@SequenceGenerator(name = "USER_SEQUENCE", sequenceName = "USER_SEQUENCE")
public class User extends AbstractTimestampEntity{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQUENCE")	
	private Integer id;
		
	@Column(name = "NAME")
	private String name;		
		
	@Column(name = "USERNAME")
	private String username;		
		
	@Column(name = "PASSWORD")
	private String password;		
		
	@Column(name = "ENABLE")
	private Boolean enable;  			
		
	@Column(name = "IMAGE")
	private String image;		
	
    @ManyToMany
    @Cascade(value = CascadeType.ALL)
    @JoinTable(name="USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ID") )
    private List<Role> roles;
	
	@ManyToOne
	@JoinColumn(name = "ID_OWNER")
	private Client owner;		
		
	public  User() {
		
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public Boolean getEnable() {
		return enable;
	}

	public void setEnable(Boolean enable) {
		this.enable = enable;
	}
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	public void setRoles(List<Role> roles){
		this.roles = roles;
	}
	
	public List<Role>  getRoles() {
		if(this.roles == null){
			setRoles(new ArrayList<Role>());
		}
		return this.roles; 
	}
		
	public boolean addRoles(Role role){	
		return getRoles().add(role);
	}
	
	public boolean removeRoles(Role role){	
		return getRoles().remove(role);
	}
	public Client getOwner() {
		return owner;
	}
	
	public void setOwner(Client client) {
		this.owner = client;
	}
	
	
}
