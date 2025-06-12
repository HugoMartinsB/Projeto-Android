package com.impac.hugomartins.myapp.user.controller;

import com.impac.hugomartins.myapp.repository.UserRepository;
import com.impac.hugomartins.myapp.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize; // Remova esta linha
// import org.springframework.security.core.Authentication; // Remova esta linha
// import org.springframework.security.core.context.SecurityContextHolder; // Remova esta linha
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    // REMOVA a linha @PreAuthorize("isAuthenticated()") ou qualquer outra @PreAuthorize
    public ResponseEntity<List<User>> getAllUsers() {
        // Remova os logs de debug se você os adicionou
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Mantenha este endpoint como protegido se quiser testar a autenticação
    @GetMapping("/hello")
    @PreAuthorize("isAuthenticated()") // Este endpoint ainda requer autenticação
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Olá, você está autenticado e pode acessar rotas protegidas!");
    }
}