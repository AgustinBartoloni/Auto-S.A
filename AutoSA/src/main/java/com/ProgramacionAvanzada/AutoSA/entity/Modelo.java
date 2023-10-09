package com.ProgramacionAvanzada.AutoSA.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String nombre;
    
    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "modelo", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Vehiculo> Vehiculo;

    public Modelo(String nombre, Marca marca){
        this.nombre = nombre;
        this.marca = marca;
    }
}
