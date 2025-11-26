package com.impro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "prioridad")
public class Prioridad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prioridad")
    private Integer id;

    @Column(name = "nivel", length = 50)
    private String nivel;

    @Column(name = "descripcion", length = 255)
    private String descripcion;
    
    @Column(name = "valor")
    private Integer valor;
}
