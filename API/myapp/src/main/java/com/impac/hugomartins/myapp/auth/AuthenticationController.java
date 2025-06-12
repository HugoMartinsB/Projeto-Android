package com.impac.hugomartins.myapp.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth") // Prefixo para os endpoints de autenticação
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    // Endpoint para registro de novo usuário
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request // @Valid para ativar a validação das anotações no DTO
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    // Endpoint para login de usuário
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(
            @Valid @RequestBody LoginRequest request // @Valid para ativar a validação das anotações no DTO
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}