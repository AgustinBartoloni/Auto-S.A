package com.ProgramacionAvanzada.AutoSA.dto;

import java.time.LocalDate;
//import java.util.List;
import java.util.List;

import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

//import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClienteDto{
    
    //private List<Vehiculo> vehiculo;

    @NotBlank
    private String nombre;
    @NotBlank
    private String apellido;
    @NotNull
    private String dni;
    @NotNull
    private String telefono;
    @NotBlank
    private String email;
    @NotBlank
    private String domicilio;
    @NotNull
    private LocalDate fechaRevision;
    public ClienteDto(String nombre, String apellido, String dni, String telefono, String email, String domicilio, LocalDate fechaRevision) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
        this.domicilio = domicilio;
        this.fechaRevision = fechaRevision;
    }
}
