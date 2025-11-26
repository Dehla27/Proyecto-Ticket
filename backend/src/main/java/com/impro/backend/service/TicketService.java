package com.impro.backend.service;

import com.impro.backend.dto.TicketRequest;
import com.impro.backend.dto.TicketResponse;
import com.impro.backend.dto.TipoTicketResponse;
import com.impro.backend.model.Sucursal;
import com.impro.backend.model.Ticket;
import com.impro.backend.model.TipoTicket;
import com.impro.backend.repository.SucursalRepository;
import com.impro.backend.repository.TicketRepository;
import com.impro.backend.repository.TipoTicketRepository;
import com.impro.backend.util.EstadoTicket;
import lombok.RequiredArgsConstructor;

//import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TipoTicketRepository tipoTicketRepository;
    private final SucursalRepository sucursalRepository;

    private static final Integer SUCURSAL_ID_TEST = 1;

    @Transactional(readOnly = true)
    public List<TipoTicketResponse> obtenerTiposDeTicket() {
        return tipoTicketRepository.findAll().stream()
                .map(tipo -> TipoTicketResponse.builder()
                        .id(tipo.getId())
                        .nombre(tipo.getNombreTipo())
                        .descripcion(tipo.getDescripcion())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public TicketResponse crearTicket(TicketRequest ticketRequest) {

        TipoTicket tipo = tipoTicketRepository.findById(ticketRequest.getIdTipoTicket())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de ticket no encontrado"));

        Sucursal sucursal = sucursalRepository.findById(SUCURSAL_ID_TEST)
                .orElseThrow(() -> new IllegalArgumentException("Sucursal no encontrada"));

        LocalDateTime inicioDia = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime finDia = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        long cantidadHoy = ticketRepository.countByTipoTicketIdAndFechaCreacionBetween(
            tipo.getId(), inicioDia, finDia
        );

        long numeroCorrelativo = cantidadHoy + 1;

        String prefijo = tipo.getNombreTipo().length() >= 3
                ? tipo.getNombreTipo().substring(0, 3).toUpperCase()
                : tipo.getNombreTipo().toUpperCase();
        String numeroFormateado = String.format("%s-%03d",prefijo,  numeroCorrelativo);

        Ticket nuevoTicket = Ticket.builder()
                .tipoTicket(tipo)
                .sucursal(sucursal)
                .numeroTicket(numeroFormateado)
                .estado(EstadoTicket.EN_ESPERA)
                .build();
        Ticket ticketGuardado = ticketRepository.save(nuevoTicket);

        return TicketResponse.builder()
                .id(ticketGuardado.getId())
                .numeroTicket(ticketGuardado.getNumeroTicket())
                .nombreTipoTicket(tipo.getNombreTipo())
                .fechaCreacion(ticketGuardado.getFechaCreacion())
                .estado(ticketGuardado.getEstado())
                .turnosEnEspera((int) cantidadHoy)
                .build();
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> obtenerColaDeEspera() {
        return ticketRepository.findByEstadoAndSucursalIdOrderByFechaCreacionAsc(EstadoTicket.EN_ESPERA, SUCURSAL_ID_TEST)
                .stream()
                .map(ticket -> TicketResponse.builder()
                        .id(ticket.getId())
                        .numeroTicket(ticket.getNumeroTicket())
                        .nombreTipoTicket(ticket.getTipoTicket().getNombreTipo())
                        .fechaCreacion(ticket.getFechaCreacion())
                        .estado(ticket.getEstado())
                        .build())
                .collect(Collectors.toList());
    }
}
