package com.ProgramacionAvanzada.AutoSA.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ProgramacionAvanzada.AutoSA.entity.Tecnico;

public interface TecnicoRepository extends JpaRepository<Tecnico, Integer>{
    Optional<Tecnico> findByDni(String dni);
    Optional<Tecnico> findByNombre(String nombre);
}
