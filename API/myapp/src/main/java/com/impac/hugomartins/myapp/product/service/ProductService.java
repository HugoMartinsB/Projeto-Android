package com.impac.hugomartins.myapp.product.service;

import com.impac.hugomartins.myapp.product.dto.ProductRequest;
import com.impac.hugomartins.myapp.product.model.Product;
import com.impac.hugomartins.myapp.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional; // Importe Optional

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .build();
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // NOVO: Método para buscar um produto por ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // NOVO: Método para atualizar um produto
    public Product updateProduct(Long id, ProductRequest request) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(request.getName());
                    existingProduct.setDescription(request.getDescription());
                    existingProduct.setPrice(request.getPrice());
                    existingProduct.setStockQuantity(request.getStockQuantity());
                    return productRepository.save(existingProduct);
                })
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
    }

    // NOVO: Método para deletar um produto (opcional, mas bom para CRUD completo)
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado com ID: " + id);
        }
        productRepository.deleteById(id);
    }
}