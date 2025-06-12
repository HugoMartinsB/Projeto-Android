package com.impac.hugomartins.myapp.product.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products") // Nome da tabela no banco de dados
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID gerado automaticamente
    private Long id;
    private String name;
    private String description;
    private double price; // Preço do produto
    private int stockQuantity; // Quantidade em estoque

}