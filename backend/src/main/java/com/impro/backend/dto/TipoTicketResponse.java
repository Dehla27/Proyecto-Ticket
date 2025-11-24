package com.impro.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TipoTicketResponse {

    private Integer id;
    private String nombre;
    private String descripcion;
    
}
