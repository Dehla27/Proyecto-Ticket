package com.impro.backend.service;

import com.impro.backend.dto.RegisterRequest;
import com.impro.backend.dto.UserResponse;
import com.impro.backend.dto.UpdateUserRequest;
import com.impro.backend.model.Role;
import com.impro.backend.model.User;
import com.impro.backend.repository.RoleRepository;
import com.impro.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .nombre(user.getNombre())
                .apellido(user.getApellido())
                .correo(user.getEmail())
                .active(user.getActive())
                .rolNombre(user.getRol().getNombre())
                .build();
    }

    @Transactional
    public UserResponse registerUser(RegisterRequest request) {

        userRepository.findByEmail(request.getCorreo()).ifPresent(u ->{
            throw new IllegalArgumentException("El correo ya esta registrado");
        });

        Role userRole = roleRepository.findById(request.getIdRol())
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));

        User user = User.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getCorreo())
                .password(passwordEncoder.encode(request.getContraseña()))
                .rol(userRole)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);

    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con id: " + id));
        return mapToUserResponse(user);
    }
    
    @Transactional
    public UserResponse updateUser(Integer id, UpdateUserRequest request){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con id: " + id));

        if (request.getEmail() != null && !request.getEmail().equalsIgnoreCase(user.getEmail())) {
            Optional<User> userWithNewEmail = userRepository.findByEmail(request.getEmail());
            if (userWithNewEmail.isPresent() && !userWithNewEmail.get().getId().equals(id)) {
                throw new IllegalArgumentException("El correo ya ha sido registrado");
            }
            user.setEmail(request.getEmail());
        }

        if  (request.getNombre() != null) {
            user.setNombre(request.getNombre());
        }
        if (request.getApellido() != null) {
            user.setApellido(request.getApellido());
        }
        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        if (request.getIdRol() != null){
            Role newRole = roleRepository.findById(request.getIdRol())
                    .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
        }

        User updatedUser = userRepository.save(user);

        return mapToUserResponse(updatedUser);
    }

    @Transactional
    public void deleteUser(Integer id){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con id:" + id));
        userRepository.delete(user);
    }

}
