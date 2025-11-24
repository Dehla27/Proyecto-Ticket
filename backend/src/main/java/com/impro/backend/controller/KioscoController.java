package com.impro.backend.controller;

import com.impro.backend.dto.TicketRequest;
import com.impro.backend.dto.TicketResponse;
import com.impro.backend.dto.TipoTicketResponse;
import com.impro.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/kiosco")
@RequiredArgsConstructor
public class KioscoController {

    private final TicketService ticketService;

    @GetMapping("/tipos-ticket")
    public ResponseEntity<List<TipoTicketResponse>> listarServicios(){
        return ResponseEntity.ok(ticketService.obtenerTiposDeTicket());
    }
    
    @PostMapping("/ticket")
    public ResponseEntity<TicketResponse> crearTicket(@RequestBody TicketRequest request) {
        TicketResponse nuevoTicket = ticketService.crearTicket(request);
        return ResponseEntity.ok(nuevoTicket);
    }

    @GetMapping("/cola")
    public ResponseEntity<List<TicketResponse>> obtenerCola(){
        return ResponseEntity.ok(ticketService.obtenerColaDeEspera());
    }
    
}
