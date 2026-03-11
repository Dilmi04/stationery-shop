# 🖊️ PaperCraft — Stationery & School Supplies E-Commerce Platform

![PaperCraft Banner](https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=1200&h=300&fit=crop)

> A full-stack e-commerce web application for stationery and school supplies, built with Spring Boot, MySQL, and Vanilla JavaScript.

---

## 📋 Project Information

| Detail | Info |
|--------|------|
| **Project Name** | PaperCraft — Stationery & School Supplies |
| **Course** | CCS2552 — Service Oriented Web Applications |
| **GitHub** | https://github.com/Dilmi04/stationery-shop |

---

## 🌟 Features

### 🛍️ Customer Shop Page
- Browse 100+ stationery and school supply products
- **Search** — live search with smart suggestions ("No pens found? Try pencils!")
- **Category filter** — clickable chips for Pens, Pencils, Notebooks, Bags, etc.
- **Sort** — by price (low to high / high to low) and name (A-Z / Z-A)
- **Product cards** — hover to reveal Quick View and Add to Cart buttons
- **Product popup** — full details, price, stock count, and description
- **Shopping cart** — slide-in sidebar with add, remove, quantity control, and total price
- **Stock badges** — New, Low Stock, Out of Stock labels on cards
- **Toast notifications** — friendly messages when adding to cart

### 🛠️ Admin Panel
- **Dashboard** — 4 stats cards: Total Products, In Stock, Categories, Low Stock
- **Add product** — form to create new products with name, category, brand, price, stock, description, image URL
- **Edit product** — click Edit on any row to fill the form and update
- **Delete product** — confirmation popup before deleting
- **Search table** — filter the admin table by name, category, or brand
- **Status badges** — In Stock / Low Stock / Out of Stock shown per product

### 🎨 Design
- Luxury stationery boutique aesthetic
- Fonts: **Cormorant Garamond** (elegant serif) + **Outfit** (clean sans-serif)
- Color palette: warm ink black + amber/gold accents on cream paper background
- Smooth animations — cards fade in, modals spring open, cart slides in
- Fully responsive — works on desktop, tablet, and mobile
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
| Hibernate | ORM — maps Java objects to database tables |
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

## 🔌 REST API Endpoints

Base URL: `http://localhost:8080/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all products |
| `GET` | `/{id}` | Get single product by ID |
| `GET` | `/available` | Get only in-stock products |
| `GET` | `/category/{category}` | Get products by category |
| `GET` | `/search?keyword=pen` | Search products by keyword |
| `GET` | `/categories` | Get all category names |
| `POST` | `/` | Create a new product |
| `PUT` | `/{id}` | Update an existing product |
| `DELETE` | `/{id}` | Delete a product |

### Example API Response
```json
{
  "id": 1,
  "name": "Ballpoint Pen Blue (10-pack)",
  "category": "Pens",
  "price": 2.99,
  "stockQuantity": 150,
  "description": "Smooth writing ballpoint pens with blue ink.",
  "imageUrl": null,
  "brand": "Pilot",
  "available": true
}
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

### Step 1 — Set up the Database

Open CMD and run:
```bash
mysql -u root -p
```
```sql
CREATE DATABASE stationery_db;
exit
```

---

### Step 2 — Configure the Backend

Open `backend/src/main/resources/application.properties` and update your MySQL password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/stationery_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

---

### Step 3 — Run the Backend

1. Open **Spring Tool Suite (STS)**
2. Click **File → Import → Maven → Existing Maven Projects**
3. Browse to the `backend/` folder → Click **Finish**
4. Wait for Maven to download all dependencies
5. Right-click `StationeryApplication.java` → **Run As → Spring Boot App**

✅ Success message in Console:
```
>>> SUCCESS: 20 products loaded into database!
Started StationeryApplication in X seconds
Tomcat started on port(s): 8080
```

---

### Step 4 — Run the Frontend

1. Open **VS Code**
2. Open the `frontend/` folder
3. Right-click `index.html` → **Open with Live Server**
4. The shop opens in your browser at `http://127.0.0.1:5500`

---

### Step 5 — Test the API

Open Chrome and visit:
```
http://localhost:8080/api/products
```
You should see a JSON list of all products. ✅

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
| Card hover overlay buttons | Modern UX pattern — reduces visual clutter |
| Sticky search bar | Easy access while scrolling through products |
| Smart empty states | Friendly UX — guides users when nothing is found |

---

## 👩‍💻 Developer

**Dilmi**
University of Sri Jayewardenepura
Faculty of Computing
CCS2552 — Service Oriented Web Applications

---

## 📄 License

This project was created for academic purposes as part of the CCS2552 course assignment.

---

*Built with ☕ Java, 🌱 Spring Boot, and lots of 📝 stationery love!*
