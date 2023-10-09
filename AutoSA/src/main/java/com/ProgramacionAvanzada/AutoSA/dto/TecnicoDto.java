package com.ProgramacionAvanzada.AutoSA.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TecnicoDto {
    @NotBlank
    private String nombre;
    @NotBlank
    private String apellido;
    @NotNull
    private int dni;
    @NotNull
    private long telefono;
    @NotBlank
    private String email;
    @NotBlank
    private String domicilio;

    public TecnicoDto(String nombre, String apellido, int dni, long telefono, String email, String domicilio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.email = email;
        this.domicilio = domicilio;
    }
}
