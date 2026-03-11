package com.stationery.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "products")
public class Product {

    // id column — auto increments (1, 2, 3, 4...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // name column — cannot be empty
    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;

    // category column — e.g. Pens, Notebooks, Markers
    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;

    // price column — must be greater than 0
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false)
    private Double price;

    // stockQuantity column — how many are available
    @NotNull(message = "Stock quantity is required")
    @Min(value = 0)
    @Column(nullable = false)
    private Integer stockQuantity;

    // description column — can be long text
    @Column(columnDefinition = "TEXT")
    private String description;

    // imageUrl column — optional product image
    private String imageUrl;

    // brand column — e.g. Pilot, Staedtler
    private String brand;

    // available column — true if in stock, false if not
    @Column(nullable = false)
    private Boolean available = true;

    // ── Constructors ───
    public Product() {}

    // Full constructor — used by DataSeeder to add products
    public Product(String name, String category, Double price,
                   Integer stockQuantity, String description,
                   String imageUrl, String brand) {
        this.name          = name;
        this.category      = category;
        this.price         = price;
        this.stockQuantity = stockQuantity;
        this.description   = description;
        this.imageUrl      = imageUrl;
        this.brand         = brand;
        this.available     = true;
    }

    // ── Getters and Setters ───

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
}