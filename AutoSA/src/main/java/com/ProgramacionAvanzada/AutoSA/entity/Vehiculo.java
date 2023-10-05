package com.ProgramacionAvanzada.AutoSA.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Vehiculo {
    //Identifica al atributo id como un tipo de clave primaria Id.
    //Genera un valor automaticamente de tipo identity unico para cada objeto.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //Establece una relacion de muchos a uno con el Cliente.
    //Nombra a la columna en la tabla como cliente_id
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    //Establece una relacion de uno a  muchos con el Modelo.
    //Nombra a la columna en la tabla como modelo_id
    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private Modelo modelo;
    //Define las otras variables
    private int año;
    private int kilometraje;
    private String patente;
    //Constructor para instanciar objetos de la clase.
    public Vehiculo(Cliente cliente, Modelo modelo, int año, int kilometraje, String patente){
        this.cliente = cliente;
        this.modelo = modelo;
        this.año = año;
        this.kilometraje = kilometraje;
        this.patente = patente;
    }
}
