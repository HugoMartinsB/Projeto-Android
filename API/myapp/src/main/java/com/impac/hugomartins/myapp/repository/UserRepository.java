package com.impac.hugomartins.myapp.repository;

import com.impac.hugomartins.myapp.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Método para encontrar um usuário pelo email.
    // O Spring Data JPA automaticamente implementa este método baseado no nome.
    Optional<User> findByEmail(String email);
}