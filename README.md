# 🖊️ PaperCraft - Stationery & School Supplies E-Commerce Platform

![PaperCraft Banner](https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=1200&h=300&fit=crop)

> A full-stack e-commerce web application for stationery and school supplies, built with Spring Boot, MySQL, and Vanilla JavaScript.

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

### 🎨 Design
- Luxury stationery boutique aesthetic
- Fonts: **Cormorant Garamond** (elegant serif) + **Outfit** (clean sans-serif)
- Color palette: warm ink black + amber/gold accents on cream paper background
- Smooth animations - cards fade in, modals spring open, cart slides in
- Fully responsive - works on desktop, tablet, and mobile
- Category chip strip for quick browsing

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| HTML5 | Page structure |
| CSS3 | Styling, animations, responsive design |
| Vanilla JavaScript | All interactivity and API calls |



### Backend
| Technology | Purpose |
|-----------|---------|
| Java 17 | Programming language |
| Spring Boot 3.2 | Backend framework |
| Spring Web | REST API creation |
| Spring Data JPA | Database communication |
| Spring Validation | Input validation |
| Hibernate | ORM - maps Java objects to database tables |
| MySQL | Relational database |
| Maven | Dependency management and build tool |

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

```

---

## 🗄️ Database

**Database name:** `stationery_db`

**Products table columns:**

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (auto) | Primary key |
| name | VARCHAR | Product name |
| category | VARCHAR | Product category |
| price | DOUBLE | Price per unit |
| stock_quantity | INT | Number in stock |
| description | TEXT | Full product description |
| image_url | VARCHAR | Optional product image link |
| brand | VARCHAR | Brand name |
| available | BIT | true = in stock |

**Categories available:**
`Pens` · `Pencils` · `Notebooks` · `Markers` · `Exercise Books` · `Geometry` · `Art & Craft` · `Office` · `Paper` · `Pencil Cases` · `Lunch Boxes` · `Water Bottles` · `School Bags`

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have these installed:
- ☕ Java JDK 17 or above
- 🗄️ MySQL Server 8.0
- 🌱 Spring Tool Suite (STS) 4
- 💻 VS Code with Live Server extension
- 🔧 Maven (included with STS)

---

---

## 📸 Pages Overview

### 🛍️ Shop Page (`index.html`)
- Luxury hero banner with animated gradient
- Category chip strip for quick filtering
- Sticky search bar with sort dropdown
- Product grid with hover effects
- Cart sidebar slides in from the right
- Product detail modal with spring animation

### 🛠️ Admin Panel (`admin.html`)
- Stats dashboard with 4 metric cards
- Add/Edit product form on the left
- Full product table with search on the right
- Delete confirmation popup

---

## 🎨 Design Decisions

| Decision | Reason |
|----------|--------|
| Cormorant Garamond font | Gives a premium, luxury stationery feel |
| Warm amber/gold accent color | Represents paper and ink naturally |
| Dark navy navbar | Strong contrast, professional look |
| Card hover overlay buttons | Modern UX pattern - reduces visual clutter |
| Sticky search bar | Easy access while scrolling through products |
| Smart empty states | Friendly UX - guides users when nothing is found |

---
