const API_BASE = 'http://localhost:8080/api/products';

const Api = {

  // GET all products
  async getAll() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Could not load products');
    return res.json();
  },

  // GET one product by ID
  async getById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  // GET products by category
  async getByCategory(category) {
    const res = await fetch(`${API_BASE}/category/${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Could not load category');
    return res.json();
  },

  // GET search results
  async search(keyword) {
    const res = await fetch(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  // GET all category names
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Could not load categories');
    return res.json();
  },

  // POST create new product
  async create(data) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Could not create product');
    return res.json();
  },

  // PUT update existing product
  async update(id, data) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Could not update product');
    return res.json();
  },

  // DELETE product
  async remove(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Could not delete product');
    return true;
  }
};