package com.impro.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class TicketResponse {

    private Long id;
    private String numeroTicket;
    private String nombreTipoTicket;
    private LocalDateTime fechaCreacion;
    private String estado;
    private Integer turnosEnEspera;
    
}
