package com.ProgramacionAvanzada.AutoSA.dto;

import java.util.List;

import com.ProgramacionAvanzada.AutoSA.entity.Persona;
import com.ProgramacionAvanzada.AutoSA.entity.Vehiculo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClienteDto extends Persona {
    
    private List<Vehiculo> vehiculo;

    public ClienteDto(@NotBlank String nombre,@NotBlank String apellido,@NotNull int dni,@NotNull long telefono,@NotBlank String email) {
        super(nombre, apellido, dni, telefono, email);
    }
}
