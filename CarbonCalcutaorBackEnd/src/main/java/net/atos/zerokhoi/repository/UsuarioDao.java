package net.atos.zerokhoi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.atos.zerokhoi.entity.Usuario;


@Repository
public interface UsuarioDao extends JpaRepository<Usuario,Long>{

}
