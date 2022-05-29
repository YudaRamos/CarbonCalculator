package net.atos.zerokhoi.service;

import java.util.List;
import java.util.Optional;

import net.atos.zerokhoi.entity.Aeropuerto;


public interface AeropuertoService {
	public List<Aeropuerto> findAll();

	public Aeropuerto findById(Long id);

	public Aeropuerto save(Aeropuerto aeropuerto);

	public void delete(Long id);
	public  Aeropuerto findByNombre(String nombre);
	public  List<Aeropuerto> findByPais(String pais);

}
