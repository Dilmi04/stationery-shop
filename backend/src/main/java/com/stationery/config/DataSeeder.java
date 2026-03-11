package com.stationery.config;

// =====================================================
// DataSeeder.java — AUTO PRODUCT LOADER
// File: backend/src/main/java/com/stationery/config/DataSeeder.java
//
// When Spring Boot starts, this runs automatically.
// It checks: is the products table empty?
// If YES  → it inserts all 20 products below.
// If NO   → it does nothing (so data is not doubled).
//
// YOU DO NOT NEED TO ADD PRODUCTS MANUALLY.
// Just run Spring Boot and all 20 products appear!
// =====================================================

import com.stationery.entity.Product;
import com.stationery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) {

        // Only insert if the table is completely empty
        if (productRepository.count() == 0) {

            System.out.println(">>> Loading 20 sample products into database...");

            // ── PENS ──────────────────────────────────────
            productRepository.save(new Product(
                "Ballpoint Pen Blue (10-pack)", "Pens", 2.99, 150,
                "Smooth writing ballpoint pens with blue ink. Medium tip for everyday writing. Comfortable grip and reliable ink flow.",
                null, "Pilot"));

            productRepository.save(new Product(
                "Gel Pen Set Black (5-pack)", "Pens", 5.49, 80,
                "Premium gel pens with quick-dry black ink. 0.5mm fine tip for precise writing. Ideal for exams and note-taking.",
                null, "Uni-ball"));

            productRepository.save(new Product(
                "Fountain Pen Classic", "Pens", 12.99, 40,
                "Elegant fountain pen with stainless steel nib. Smooth ink flow with refillable cartridge system.",
                null, "Parker"));

            // ── PENCILS ───────────────────────────────────
            productRepository.save(new Product(
                "HB Pencil Set (12-pack)", "Pencils", 2.99, 200,
                "High-quality HB graphite pencils, pre-sharpened and ready to use. Perfect for writing and light sketching.",
                null, "Staedtler"));

            productRepository.save(new Product(
                "Color Pencils (24 colors)", "Pencils", 7.99, 90,
                "Vibrant color pencils with soft core for smooth blending. 24 colors including metallic shades.",
                null, "Faber-Castell"));

            productRepository.save(new Product(
                "Mechanical Pencil 0.5mm", "Pencils", 3.49, 110,
                "Precision mechanical pencil with 0.5mm HB lead. Retractable tip and comfortable rubber grip.",
                null, "Pentel"));

            productRepository.save(new Product(
                "Eraser White Vinyl (3-pack)", "Pencils", 1.49, 300,
                "Clean-erasing white vinyl erasers. No smudge, no tear. Works on pencil and light pen marks.",
                null, "Pentel"));

            productRepository.save(new Product(
                "Pencil Sharpener Dual Hole", "Pencils", 0.99, 250,
                "Dual hole sharpener for standard and jumbo pencils. Transparent casing to see when to empty.",
                null, "Staedtler"));

            // ── NOTEBOOKS ─────────────────────────────────
            productRepository.save(new Product(
                "A4 Ruled Notebook 200 Pages", "Notebooks", 3.99, 175,
                "Premium hardcover A4 notebook with ruled pages. High-quality paper that does not bleed through.",
                null, "Classmate"));

            productRepository.save(new Product(
                "Spiral Notebook A5 100 Pages", "Notebooks", 2.49, 160,
                "Lightweight spiral-bound A5 notebook with perforated pages. Easy to tear out and carry.",
                null, "Classmate"));

            productRepository.save(new Product(
                "Graph Paper Notebook A4", "Notebooks", 4.49, 70,
                "A4 notebook with 5mm graph paper. Essential for maths, engineering, and science students.",
                null, "Camlin"));

            // ── MARKERS ───────────────────────────────────
            productRepository.save(new Product(
                "Highlighter Set (6 Colors)", "Markers", 4.99, 120,
                "Fluorescent highlighters in 6 colors: yellow, pink, green, orange, blue, purple. Chisel tip.",
                null, "Stabilo"));

            productRepository.save(new Product(
                "Whiteboard Markers (4 Colors)", "Markers", 5.99, 85,
                "Dry-erase whiteboard markers in black, red, blue, and green. Chisel tip for thick lines.",
                null, "Expo"));

            productRepository.save(new Product(
                "Permanent Marker Black (2-pack)", "Markers", 2.49, 130,
                "Waterproof permanent markers. Works on paper, plastic, glass, and wood. Quick drying.",
                null, "Sharpie"));

            // ── GEOMETRY ──────────────────────────────────
            productRepository.save(new Product(
                "Geometry Set 6-Piece", "Geometry", 4.49, 95,
                "Complete geometry set including compass, protractor, two set squares, ruler, and pencil.",
                null, "Camlin"));

            productRepository.save(new Product(
                "Clear Plastic Ruler 30cm", "Geometry", 0.99, 320,
                "Transparent plastic ruler with cm and inch markings. Durable and accurate.",
                null, "Maped"));

            // ── STATIONERY ────────────────────────────────
            productRepository.save(new Product(
                "Sticky Notes 3x3 inch (4-pack)", "Stationery", 3.49, 140,
                "Self-adhesive sticky notes in 4 assorted colors. 100 sheets per pad. Repositionable.",
                null, "3M Post-it"));

            productRepository.save(new Product(
                "Student Scissors 7-inch", "Stationery", 1.99, 110,
                "Ergonomic student scissors with stainless steel blades. Safe rounded tip design.",
                null, "Maped"));

            productRepository.save(new Product(
                "Glue Stick Large 40g", "Stationery", 1.49, 190,
                "Non-toxic washable glue stick. Smooth application, dries clear and transparent.",
                null, "UHU"));

            // ── OFFICE ────────────────────────────────────
            productRepository.save(new Product(
                "A4 Printer Paper 500 Sheets", "Paper", 8.99, 60,
                "Premium 80gsm bright white A4 paper. Suitable for laser and inkjet printers.",
                null, "Double A"));

            System.out.println(">>> SUCCESS: 20 products loaded into database!");
            System.out.println(">>> Open http://localhost:8080/api/products to verify.");

        } else {
            System.out.println(">>> Products already exist in database. Skipping seed.");
        }
    }
}