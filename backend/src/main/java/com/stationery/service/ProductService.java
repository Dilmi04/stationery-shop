package com.stationery.service;

// =====================================================
// ProductService.java — SERVICE (Business Logic)
// File: backend/src/main/java/com/stationery/service/ProductService.java
//
// This file handles all the business logic.
// Controller calls Service. Service calls Repository.
// Repository talks to MySQL database.
// =====================================================

import com.stationery.dto.ProductDTO;
import com.stationery.entity.Product;
import com.stationery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // ── Convert Product entity → ProductDTO ───────
    // (Used when SENDING data to frontend)
    private ProductDTO toDTO(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setCategory(p.getCategory());
        dto.setPrice(p.getPrice());
        dto.setStockQuantity(p.getStockQuantity());
        dto.setDescription(p.getDescription());
        dto.setImageUrl(p.getImageUrl());
        dto.setBrand(p.getBrand());
        dto.setAvailable(p.getAvailable());
        return dto;
    }

    // ── Convert ProductDTO → Product entity ───────
    // (Used when RECEIVING data from frontend)
    private Product toEntity(ProductDTO dto) {
        Product p = new Product();
        p.setName(dto.getName());
        p.setCategory(dto.getCategory());
        p.setPrice(dto.getPrice());
        p.setStockQuantity(dto.getStockQuantity());
        p.setDescription(dto.getDescription());
        p.setImageUrl(dto.getImageUrl());
        p.setBrand(dto.getBrand());
        p.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : true);
        return p;
    }

    // ── GET all products ───────────────────────────
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ── GET one product by ID ──────────────────────
    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id).map(this::toDTO);
    }

    // ── GET only available/in-stock products ───────
    public List<ProductDTO> getAvailableProducts() {
        return productRepository.findByAvailableTrue()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ── GET products by category ───────────────────
    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ── SEARCH products by keyword ─────────────────
    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ── GET all category names ─────────────────────
    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    // ── CREATE new product ─────────────────────────
    public ProductDTO createProduct(ProductDTO dto) {
        Product saved = productRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    // ── UPDATE existing product ────────────────────
    public Optional<ProductDTO> updateProduct(Long id, ProductDTO dto) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setCategory(dto.getCategory());
            existing.setPrice(dto.getPrice());
            existing.setStockQuantity(dto.getStockQuantity());
            existing.setDescription(dto.getDescription());
            existing.setImageUrl(dto.getImageUrl());
            existing.setBrand(dto.getBrand());
            if (dto.getAvailable() != null) {
                existing.setAvailable(dto.getAvailable());
            }
            return toDTO(productRepository.save(existing));
        });
    }

    // ── DELETE product ─────────────────────────────
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}