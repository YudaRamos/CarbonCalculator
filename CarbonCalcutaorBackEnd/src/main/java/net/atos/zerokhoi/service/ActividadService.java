package net.atos.zerokhoi.service;

import java.util.List;

import net.atos.zerokhoi.entity.Actividad;

public interface ActividadService {

	public List<Actividad> findAll();

	public Actividad findById(Long id);

	public Actividad save(Actividad actividad);

	public void delete(Long id);

}
