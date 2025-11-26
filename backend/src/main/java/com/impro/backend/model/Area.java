package com.impro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Tipo_Ticket")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_tipo_ticket;

    @Column(nullable = false, unique = true)
    private String nombre_tipo;
    
    @Column(nullable = false, unique = true)
    private String descripcion;
}
