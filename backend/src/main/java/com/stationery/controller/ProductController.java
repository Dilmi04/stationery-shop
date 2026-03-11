package com.stationery.controller;

// =====================================================
// ProductController.java — REST API CONTROLLER
// File: backend/src/main/java/com/stationery/controller/ProductController.java
//
// This file creates all the API URLs your frontend calls.
// Every method here = one URL endpoint.
//
// All URLs start with: http://localhost:8080/api/products
// =====================================================

import com.stationery.dto.ProductDTO;
import com.stationery.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // ── GET all products ───────────────────────────
    // URL: GET http://localhost:8080/api/products
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ── GET one product by ID ──────────────────────
    // URL: GET http://localhost:8080/api/products/1
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── GET available products only ────────────────
    // URL: GET http://localhost:8080/api/products/available
    @GetMapping("/available")
    public ResponseEntity<List<ProductDTO>> getAvailableProducts() {
        return ResponseEntity.ok(productService.getAvailableProducts());
    }

    // ── GET products by category ───────────────────
    // URL: GET http://localhost:8080/api/products/category/Pens
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDTO>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    // ── GET search results ─────────────────────────
    // URL: GET http://localhost:8080/api/products/search?keyword=pen
    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }

    // ── GET all category names ─────────────────────
    // URL: GET http://localhost:8080/api/products/categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(productService.getAllCategories());
    }

    // ── POST create new product ──
    // URL: POST http://localhost:8080/api/products
    // Body: JSON product data
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(dto));
    }

    // ── PUT update existing product ──
    // URL: PUT http://localhost:8080/api/products/1
    // Body: JSON updated product data
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO dto) {
        return productService.updateProduct(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── DELETE product ──
    // URL: DELETE http://localhost:8080/api/products/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}