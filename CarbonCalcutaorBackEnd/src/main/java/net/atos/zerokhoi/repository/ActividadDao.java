package net.atos.zerokhoi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.atos.zerokhoi.entity.Actividad;

@Repository
public interface ActividadDao extends JpaRepository<Actividad,Long>{

}

