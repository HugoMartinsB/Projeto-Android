package com.impac.hugomartins.myapp.product.repository;

import com.impac.hugomartins.myapp.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Métodos de consulta personalizados podem ser adicionados aqui se necessário
}