# 🖊️ PaperCraft - Stationery & School Supplies E-Commerce Platform

 A full-stack e-commerce web application for stationery and school supplies, built with Spring Boot, MySQL, and Vanilla JavaScript.
 
---

- **Name:** S.A.D.Sandunika
- **Index Number:** FC221045

---

## 🌟 Features

### 🛍️ Customer Shop Page
- Browse 50+ stationery and school supply products
- **Search** - live search with smart suggestions ("No pens found? Try pencils!")
- **Category filter** - clickable chips for Pens, Pencils, Notebooks, Bags, etc.
- **Sort** - by price (low to high / high to low) and name (A-Z / Z-A)
- **Product cards** - hover to reveal Quick View and Add to Cart buttons
- **Product popup** - full details, price, stock count, and description
- **Shopping cart** - slide-in sidebar with add, remove, quantity control, and total price
- **Stock badges** - New, Low Stock, Out of Stock labels on cards
- **Toast notifications** - friendly messages when adding to cart

### 🛠️ Admin Panel
- **Dashboard** - 4 stats cards: Total Products, In Stock, Categories, Low Stock
- **Add product** - form to create new products with name, category, brand, price, stock, description, image URL
- **Edit product** - click Edit on any row to fill the form and update
- **Delete product** - confirmation popup before deleting
- **Search table** - filter the admin table by name, category, or brand
- **Status badges** - In Stock / Low Stock / Out of Stock shown per product

---

## 🌟 Project Overview
PaperCraft is a modern, responsive platform designed for students to browse and manage school supplies. The project demonstrates a complete integration between a professional front-end interface and a robust Spring Boot back-end.

## 🛠️ Tech Stack
* **Front-End:** HTML5, CSS3, JavaScript
* **Back-End:** Java 17, Spring Boot, Spring Data JPA
* **Database:** MySQL
* **Tools:** Spring Tool Suite (STS), MySQL Workbench, Git
---

## 🔌 API Endpoints

Base URL: `http://localhost:8080/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all products |
| GET | `/{id}` | Get single product by ID |
| GET | `/available` | Get only in-stock products |
| GET | `/category/{category}` | Get products by category |
| GET | `/search?keyword=pen` | Search products by keyword |
| GET | `/categories` | Get all category names |
| POST | `/` | Create a new product |
| PUT | `/{id}` | Update an existing product |
| DELETE | `/{id}` | Delete a product |
---

## 📁 Project Structure

```
stationery-shop/
│
├── 📁 frontend/                        # All frontend files
│   ├── 📄 index.html                   # Main shop page
│   ├── 📄 admin.html                   # Admin panel
│   ├── 📁 css/
│   │   └── 📄 style.css               # All styles and animations
│   └── 📁 js/
│       ├── 📄 api.js                   # Communicates with Spring Boot API
│       ├── 📄 cart.js                  # Shopping cart logic
│       ├── 📄 shop.js                  # Shop page — search, filter, render
│       └── 📄 admin.js                 # Admin CRUD operations
│
└── 📁 backend/                         # Spring Boot application
    ├── 📄 pom.xml                      # Maven dependencies
    └── 📁 src/main/
        ├── 📁 java/com/stationery/
        │   ├── 📄 StationeryApplication.java    # Main entry point
        │   ├── 📁 entity/
        │   │   └── 📄 Product.java             # Database entity
        │   ├── 📁 repository/
        │   │   └── 📄 ProductRepository.java   # Database queries
        │   ├── 📁 service/
        │   │   └── 📄 ProductService.java      # Business logic
        │   ├── 📁 controller/
        │   │   └── 📄 ProductController.java   # REST API endpoints
        │   ├── 📁 dto/
        │   │   └── 📄 ProductDTO.java          # Data transfer object
        │   └── 📁 config/
        │       ├── 📄 WebConfig.java           # CORS configuration
        │       └── 📄 DataSeeder.java          # Auto-loads sample products
        └── 📁 resources/
            └── 📄 application.properties      # Database connection settings
```

---

## 🚀 How to Run Locally

### 1. Database Setup
1. Create a MySQL database named `stationery_db`.
2. Update the `src/main/resources/application.properties` file with your MySQL username and password.
3. The tables will be automatically created by Hibernate on the first run.

### 2. Backend (Spring Boot)
1. Import the `stationery-backend` folder into **Spring Tool Suite (STS)**.
2. Run the project as a **Spring Boot App**.
3. The API will be available at `http://localhost:8080/api/products`.

### 3. Frontend
1. Open the `index.html` file in any modern web browser.

