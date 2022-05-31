package net.atos.zerokhoi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.atos.zerokhoi.entity.Actividad;
import net.atos.zerokhoi.entity.Usuario;


@Repository
public interface ActividadDao extends JpaRepository<Actividad,Long>{
	public abstract List<Actividad> findByUser(Usuario user);
}

