package com.impro.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String nombre;
    private String apellido;
    private String correo;
    private String contraseña;
    private Integer idRol;
    
}
