package com.ProgramacionAvanzada.AutoSA.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PersonalDeTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JsonManagedReference
    private Tecnico tecnico;

    @ManyToOne
    @JsonManagedReference
    private OrdenDeTrabajo ordenDeTrabajo;

    public PersonalDeTrabajo(OrdenDeTrabajo ordenDeTrabajo, Tecnico tecnico){
        this.tecnico = tecnico;
        this.ordenDeTrabajo = ordenDeTrabajo;
    }
}
