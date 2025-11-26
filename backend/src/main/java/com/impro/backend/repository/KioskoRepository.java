package com.impro.backend.repository;

import com.impro.backend.model.Kiosko;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KioskoRepository extends JpaRepository<Kiosko, Integer> {
}
