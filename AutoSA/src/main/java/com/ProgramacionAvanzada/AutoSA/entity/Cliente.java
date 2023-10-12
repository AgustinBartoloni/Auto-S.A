package com.ProgramacionAvanzada.AutoSA.entity;


import java.time.LocalDate;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cliente extends Persona{   

    //@OneToMany(mappedBy = "cliente")
    //@JsonBackReference
    //private List<Vehiculo> vehiculo;
    private LocalDate fechaRevision;

    public Cliente(String nombre, String apellido, String dni, String telefono, String email, String domicilio, LocalDate fechaRevision){
        super(nombre, apellido, dni, telefono, email, domicilio);
        this.fechaRevision = fechaRevision;
    }
}