package com.ProgramacionAvanzada.AutoSA.entity;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class Tecnico{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private String apellido;
    private int dni;
    private long telefono;
    private String email;
    private String domicilio;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "tecnico", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<PersonalDeTrabajo> personalDeTrabajo; 

    public Tecnico(String nombre, String apellido, int dni, long telefono, String email,String domicilio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
        this.domicilio = domicilio;
    }
}
