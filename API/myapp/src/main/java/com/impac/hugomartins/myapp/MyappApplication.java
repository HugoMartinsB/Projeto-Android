package com.impac.hugomartins.myapp;

import com.impac.hugomartins.myapp.auth.RegisterRequest;
import com.impac.hugomartins.myapp.auth.AuthenticationService;
import com.impac.hugomartins.myapp.repository.UserRepository;
import com.impac.hugomartins.myapp.user.Role;	
import com.impac.hugomartins.myapp.user.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MyappApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyappApplication.class, args);
	}

	// Este bean será executado uma vez que a aplicação iniciar
	@Bean
	public CommandLineRunner commandLineRunner(
			UserRepository userRepository,
			PasswordEncoder passwordEncoder
	) {
		return args -> {
			if (userRepository.findByEmail("admin@myapp.com").isEmpty()) {
				var admin = User.builder()
						.firstName("Admin")
						.lastName("User")
						.email("admin@myapp.com")
						.password(passwordEncoder.encode("adminpass")) // Senha para o admin
						.role(Role.ADMIN)
						.build();
				userRepository.save(admin);
				System.out.println("Usuário Admin criado: admin@myapp.com");
			}
		};
	}
}