package net.atos.zerokhoi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import net.atos.zerokhoi.entity.Aeropuerto;


@Repository
public interface AeropuertoDao  extends JpaRepository<Aeropuerto,Long> {
	public abstract Optional<Aeropuerto> findByNombre(String nombre);
	public abstract List<Aeropuerto> findByPais(String pais);

}
