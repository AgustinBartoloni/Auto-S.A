package com.ProgramacionAvanzada.AutoSA.dto;

import com.ProgramacionAvanzada.AutoSA.entity.Persona;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TecnicoDto extends Persona{
    
    public TecnicoDto(@NotBlank String nombre,@NotBlank String apellido,@NotNull int dni,@NotNull long telefono,@NotBlank String email) {
        super(nombre, apellido, dni, telefono, email);
    }
}
