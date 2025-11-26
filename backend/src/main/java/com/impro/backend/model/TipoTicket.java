package com.impro.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tipo_ticket")
public class TipoTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_ticket")
    private Integer id;

    @Column(name = "nombre_tipo", length = 100)
    private String nombreTipo;

    @Column(name = "descripcion", length = 255)
    private String descripcion;
    
}
