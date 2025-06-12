package com.impac.hugomartins.myapp.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data // Gera getters, setters, toString, equals e hashCode
@Builder // Padrão de construção de objetos
@NoArgsConstructor // Construtor sem argumentos
@AllArgsConstructor // Construtor com todos os argumentos
@Entity // Indica que é uma entidade JPA (mapeada para uma tabela no DB)
@Table(name = "_user", uniqueConstraints = @UniqueConstraint(columnNames = "email")) // Nome da tabela e restrição de unicidade para o email
public class User implements UserDetails {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Geração automática de ID (auto-incremento)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true) // Garante que o email seja único
    private String email;

    @Column(nullable = false)
    private String password; // A senha DEVE ser armazenada criptografada!

    @Enumerated(EnumType.STRING) // Armazena o enum como String no DB
    private Role role; // Papel/Permissão do usuário (ex: ADMIN, USER)

    // --- Métodos de UserDetails (para o Spring Security) ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Retorna a lista de autoridades (roles) do usuário
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        // Retorna o email como o "username" para autenticação
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Indica se a conta do usuário não expirou (sempre true por padrão)
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Indica se a conta do usuário não está bloqueada (sempre true por padrão)
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Indica se as credenciais do usuário não expiraram (sempre true por padrão)
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Indica se o usuário está habilitado (ativo) (sempre true por padrão)
        return true;
    }
}