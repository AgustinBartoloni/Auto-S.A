package com.ProgramacionAvanzada.AutoSA.entity;


import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cliente{   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "cliente")
    @JsonBackReference
    private List<Vehiculo> Vehiculo;

    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String email;
    private String domicilio;
    @Temporal(TemporalType.DATE)
    private LocalDate fechaRevision;

    public Cliente(String nombre, String apellido, String dni, String telefono, String email, String domicilio, LocalDate fechaRevision){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
        this.domicilio = domicilio;
        this.fechaRevision = fechaRevision;
    }
}
