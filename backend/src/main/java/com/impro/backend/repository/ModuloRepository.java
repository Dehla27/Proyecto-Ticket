package com.impro.backend.repository;

import com.impro.backend.model.Modulo;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
import java.util.List;

public interface ModuloRepository extends JpaRepository<Modulo, Integer> {
  
    List<Modulo> findBySucursakId(Integer idSucursal);
}
