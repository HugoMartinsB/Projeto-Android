package com.impac.hugomartins.myapp.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token; // O JWT
    // Você pode adicionar outras informações do usuário aqui se desejar (ex: email, nome, role)
}