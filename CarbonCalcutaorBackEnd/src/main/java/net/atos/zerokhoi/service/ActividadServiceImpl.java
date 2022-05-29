package net.atos.zerokhoi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.atos.zerokhoi.entity.Actividad;
import net.atos.zerokhoi.repository.ActividadDao;

@Service
public class ActividadServiceImpl implements ActividadService {
	@Autowired
	private ActividadDao ActividadDao;

	@Override
	@Transactional(readOnly = true)
	public List<Actividad> findAll() {
		return (List<Actividad>) ActividadDao.findAll();
	}

	@Override
	@Transactional
	public Actividad findById(Long id) {
		return ActividadDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Actividad save(Actividad actividad) {
		return ActividadDao.save(actividad);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		ActividadDao.deleteById(id);

	}

}
