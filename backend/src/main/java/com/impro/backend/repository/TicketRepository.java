package com.impro.backend.repository;

import com.impro.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    long countByTipoTicketIdAndFechaCreacionBetween(Integer tipoTicketId, LocalDateTime start, LocalDateTime end);
    List<Ticket> findByEstadoAndSucursalIdOrderByFechaCreacionAsc(String estado, Integer sucursalId);
    List<Ticket> findByEstadoAndTipoTicketId(String estado, Integer tipoTicketId);
}
