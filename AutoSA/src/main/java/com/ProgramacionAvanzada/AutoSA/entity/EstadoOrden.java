package com.ProgramacionAvanzada.AutoSA.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EstadoOrden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String nombre;

    @OneToMany(mappedBy = "estadoOrden")
    @JsonBackReference
    private List<OrdenDeTrabajo> ordenDeTrabajo;  

    public EstadoOrden(String nombre){
        this.nombre = nombre;
    }
}
