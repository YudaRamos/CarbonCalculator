package net.atos.zerokhoi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.atos.zerokhoi.entity.Actividad;
import net.atos.zerokhoi.entity.Usuario;
import net.atos.zerokhoi.repository.ActividadDao;

@Service
public class ActividadServiceImpl implements ActividadService {
	@Autowired
	private ActividadDao actividadDao;

	@Override
	@Transactional(readOnly = true)
	public List<Actividad> findAll() {
		return (List<Actividad>) actividadDao.findAll();
	}

	@Override
	@Transactional
	public Actividad findById(Long id) {
		return actividadDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Actividad save(Actividad actividad) {
		return actividadDao.save(actividad);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		actividadDao.deleteById(id);

	}

	@Override
	public List<Actividad> findByUser(Usuario user) {
		return (List<Actividad>) actividadDao.findByUser(user);
	}

}
