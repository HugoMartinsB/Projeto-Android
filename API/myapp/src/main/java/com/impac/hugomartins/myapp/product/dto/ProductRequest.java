package com.impac.hugomartins.myapp.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    @NotBlank(message = "O nome do produto é obrigatório")
    private String name;
    @NotBlank(message = "A descrição do produto é obrigatória")
    private String description;
    @NotNull(message = "O preço do produto é obrigatório")
    @Positive(message = "O preço deve ser um valor positivo")
    private double price;
    @NotNull(message = "A quantidade em estoque é obrigatória")
    @Positive(message = "A quantidade em estoque deve ser um valor positivo")
    private int stockQuantity;

    // Adicione outros campos que correspondem à sua entidade Product
}