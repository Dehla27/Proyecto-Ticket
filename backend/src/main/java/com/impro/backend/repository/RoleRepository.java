package com.impro.backend.repository;
import com.impro.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByNombre(String nombre);
}
