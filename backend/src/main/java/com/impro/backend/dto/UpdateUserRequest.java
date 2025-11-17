package com.impro.backend.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String nombre;
    private String apellido;
    private String email;
    private Integer idRol;
    private Boolean active;
}
