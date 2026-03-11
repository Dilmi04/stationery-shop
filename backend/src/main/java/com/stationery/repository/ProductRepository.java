package com.stationery.repository;

// =====================================================
// ProductRepository.java — REPOSITORY (Database Queries)
// File: backend/src/main/java/com/stationery/repository/ProductRepository.java
//
// This file handles all database queries.
// Spring creates the actual SQL automatically from
// the method names — we just define what we want.
// =====================================================

import com.stationery.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find all products where available = true
    List<Product> findByAvailableTrue();

    // Find products by category (ignores upper/lowercase)
    List<Product> findByCategoryIgnoreCase(String category);

    // Get all unique category names
    @Query("SELECT DISTINCT p.category FROM Product p ORDER BY p.category")
    List<String> findAllCategories();

    // Search products by name, category, or brand
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name)     LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.brand)    LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);

    // Find products where stock is very low
    @Query("SELECT p FROM Product p WHERE p.stockQuantity <= :threshold")
    List<Product> findLowStockProducts(@Param("threshold") int threshold);
}