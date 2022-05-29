package net.atos.zerokhoi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.atos.zerokhoi.entity.Aeropuerto;
import net.atos.zerokhoi.repository.AeropuertoDao;


@Service
public class AeropuertoServiceImpl implements  AeropuertoService{
	@Autowired
	private AeropuertoDao aeropuertoDao;

	@Override
	@Transactional(readOnly = true)
	public List<Aeropuerto> findAll() {
		return (List<Aeropuerto>) aeropuertoDao.findAll();
	}

	@Override
	public Aeropuerto findById(Long id) {
		return aeropuertoDao.findById(id).orElse(null);
	}

	@Override
	public Aeropuerto save(Aeropuerto aeropuerto) {
		return aeropuertoDao.save(aeropuerto);
	}

	@Override
	public void delete(Long id) {
		aeropuertoDao.deleteById(id);
		
	}

	@Override
	public Aeropuerto findByNombre(String nombre) {
		return aeropuertoDao.findByNombre(nombre).orElse(null);
	}

	@Override
	public List<Aeropuerto> findByPais(String pais) {
		return (List<Aeropuerto>) aeropuertoDao.findByPais(pais);
	}
	
}
