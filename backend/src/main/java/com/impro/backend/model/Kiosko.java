package com.impro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "kiosko")
public class Kiosko {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kiosko")
    private Integer id;

    @Column(name = "nombre_kiosko", length = 100)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_sucursal_foranea")
    private Sucursal sucursal;
    
}
