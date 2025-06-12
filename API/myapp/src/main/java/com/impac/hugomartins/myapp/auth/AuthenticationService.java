package com.impac.hugomartins.myapp.auth;

import com.impac.hugomartins.myapp.repository.UserRepository;
import com.impac.hugomartins.myapp.security.jwt.JwtService;
import com.impac.hugomartins.myapp.user.Role;
import com.impac.hugomartins.myapp.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Injetaremos o codificador de senhas
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager; // Gerenciador de autenticação do Spring Security

    // Método para registrar um novo usuário
    public AuthResponse register(RegisterRequest request) {
        // Verifica se o email já está em uso
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email já registrado."); // Ou lance uma exceção mais específica
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // Criptografa a senha antes de salvar!
                .role(Role.USER) // Define o papel padrão como USER
                .build();
        userRepository.save(user); // Salva o usuário no banco de dados

        var jwtToken = jwtService.generateToken(user); // Gera o JWT para o novo usuário
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    // Método para autenticar um usuário existente
    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        // Se a autenticação acima falhar, uma exceção será lançada (ex: BadCredentialsException)

        // Se a autenticação for bem-sucedida, busca o usuário pelo email
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado.")); // Não deveria acontecer se a autenticação foi bem-sucedida

        var jwtToken = jwtService.generateToken(user); // Gera o JWT para o usuário autenticado
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}