package com.ProgramacionAvanzada.AutoSA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProgramacionAvanzada.AutoSA.entity.PersonalDeTrabajo;
@Repository
public interface PersonalDeTrabajoRepository extends JpaRepository<PersonalDeTrabajo, Integer> {
    
}
