package net.atos.zerokhoi.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class Usuario implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@NotEmpty
	@Size(min = 4, max = 12)
	private String nombre;

	@Column(unique = true, nullable = false)
	@NotEmpty
	@Email
	private String email;

	@Column(nullable = false)
	@Size(min = 4, max = 12)
	private String password;

	// EN CASO DE UNO A MUCHOS EL fetch es LAZY por defecto
	//@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	//private List<Actividad> actividades = new ArrayList<>();

}
