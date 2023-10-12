package com.ProgramacionAvanzada.AutoSA.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
public class OrdenDeTrabajo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String observacion;
    private LocalDate fechaCreacion;
    @Column(columnDefinition = "TIME")
    private LocalTime horaCreacion;

    @ManyToOne
    @JoinColumn(name = "vehiculo_id")
    @JsonManagedReference
    private Vehiculo vehiculo;

    @ManyToOne
    @JoinColumn(name = "estadoOrden_id")
    @JsonManagedReference
    private EstadoOrden estadoOrden;

    @OneToMany(mappedBy = "ordenDeTrabajo")
    @JsonBackReference
    private List<PersonalDeTrabajo> PersonalDeTrabajo;   

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "ordenDeTrabajo", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<DetalleOrdenTrabajo> detalleordenTrabajo; 

    public OrdenDeTrabajo(String observacion, EstadoOrden estadoOrden, Vehiculo vehiculo, LocalDate fechaCreacion, LocalTime horaCreacion){
        this.observacion = observacion;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.estadoOrden = estadoOrden;
        this.vehiculo = vehiculo;
    }
}
