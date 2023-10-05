package com.ProgramacionAvanzada.AutoSA.entity;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tecnico extends Persona{

    public Tecnico(String nombre, String apellido, int dni, long telefono, String email){
        super(nombre, apellido, dni, telefono, email);
    }
}
