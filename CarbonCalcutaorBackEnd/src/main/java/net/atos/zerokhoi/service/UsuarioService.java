package net.atos.zerokhoi.service;

import java.util.List;

import net.atos.zerokhoi.entity.Usuario;

public interface UsuarioService {

	public List<Usuario> findAll();

	public Usuario findById(Long id);

	public Usuario save(Usuario cliente);

	public void delete(Long id);

}
