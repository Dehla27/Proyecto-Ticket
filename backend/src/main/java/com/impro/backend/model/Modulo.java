package com.impro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "modulo")
public class Modulo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_modulo")
    private Integer id;

    @Column(name = "nombre_modulo", length = 100)
    private String nombre;

    @Column(name = "ocupado")
    private Boolean ocupado;

    @ManyToOne
    @JoinColumn(name = "id_sucursal_foranea")
    private Sucursal sucursal;
}
