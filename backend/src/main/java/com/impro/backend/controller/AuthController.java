package com.impro.backend.controller;

import com.impro.backend.service.JwtService;
import com.impro.backend.service.TokenBlackListService;
import com.impro.backend.dto.LoginResponse;
import com.impro.backend.dto.RegisterRequest;
import com.impro.backend.dto.UserResponse;
import com.impro.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
import com.impro.backend.dto.LoginRequest;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenBlackListService tokenBlackListService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        final String jwtToken = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(new LoginResponse(jwtToken, loginRequest.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody RegisterRequest request) {
        UserResponse userResponse = userService.registerUser(request);
        return ResponseEntity.ok(userResponse);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            
            String token = authHeader.substring(7);
            Date expiration = jwtService.extractExpiration(token);
            tokenBlackListService.blacklistToken(token, expiration.getTime());
            return ResponseEntity.ok("Logout exitodo. Token invalidado");
        }
        return ResponseEntity.badRequest().body("No se proporciono un token valido");
    }

}
