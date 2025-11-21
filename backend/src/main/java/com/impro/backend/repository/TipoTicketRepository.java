package com.impro.backend.repository;

import com.impro.backend.model.TipoTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoTicketRepository extends JpaRepository<TipoTicket, Integer> {
}
