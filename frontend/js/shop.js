/* shop.js — redesigned with category chips + smart empty states */

let allProducts    = [];
let shownProducts  = [];
let activeCategory = '';
let lastKeyword    = '';  // tracks what the user last searched for

// ── SMART EMPTY STATE MESSAGES ─────────────────────
// When a search finds nothing, we suggest something related
const smartSuggestions = {
  // Pens & Writing
  'pen':        { suggest: 'pencils',       emoji: '✏️',  msg: 'pens' },
  'pencil':     { suggest: 'pens',          emoji: '🖊️',  msg: 'pencils' },
  'marker':     { suggest: 'highlighters',  emoji: '🖍️',  msg: 'markers' },
  'highlight':  { suggest: 'markers',       emoji: '🖊️',  msg: 'highlighters' },
  'ink':        { suggest: 'gel pens',      emoji: '🖋️',  msg: 'ink pens' },
  'chalk':      { suggest: 'markers',       emoji: '🖍️',  msg: 'chalk' },

  // Books & Paper
  'notebook':   { suggest: 'exercise books', emoji: '📓', msg: 'notebooks' },
  'book':       { suggest: 'notebooks',      emoji: '📚', msg: 'books' },
  'cr book':    { suggest: 'exercise books', emoji: '📒', msg: 'CR books' },
  'journal':    { suggest: 'notebooks',      emoji: '📔', msg: 'journals' },
  'paper':      { suggest: 'notebooks',      emoji: '📄', msg: 'paper' },
  'diary':      { suggest: 'planners',       emoji: '📅', msg: 'diaries' },

  // Bags & Boxes
  'bag':        { suggest: 'pencil cases',   emoji: '🎒', msg: 'bags' },
  'backpack':   { suggest: 'school bags',    emoji: '🎒', msg: 'backpacks' },
  'lunch':      { suggest: 'water bottles',  emoji: '🍱', msg: 'lunch boxes' },
  'water':      { suggest: 'lunch boxes',    emoji: '💧', msg: 'water bottles' },
  'bottle':     { suggest: 'lunch boxes',    emoji: '🍶', msg: 'bottles' },
  'pencil box': { suggest: 'pencil cases',   emoji: '✏️', msg: 'pencil boxes' },
  'case':       { suggest: 'school bags',    emoji: '💼', msg: 'cases' },
  'pouch':      { suggest: 'pencil cases',   emoji: '👜', msg: 'pouches' },

  // Art & Craft
  'paint':      { suggest: 'markers',        emoji: '🎨', msg: 'paints' },
  'brush':      { suggest: 'markers',        emoji: '🖌️', msg: 'brushes' },
  'color':      { suggest: 'color pencils',  emoji: '🌈', msg: 'color items' },
  'colour':     { suggest: 'color pencils',  emoji: '🌈', msg: 'colour items' },
  'crayon':     { suggest: 'color pencils',  emoji: '🖍️', msg: 'crayons' },
  'craft':      { suggest: 'art supplies',   emoji: '✂️', msg: 'craft items' },
  'glue':       { suggest: 'tape',           emoji: '🗂️', msg: 'glue' },
  'tape':       { suggest: 'glue sticks',    emoji: '📎', msg: 'tape' },
  'scissor':    { suggest: 'rulers',         emoji: '✂️', msg: 'scissors' },

  // Geometry & Maths
  'ruler':      { suggest: 'geometry sets',  emoji: '📐', msg: 'rulers' },
  'compass':    { suggest: 'rulers',         emoji: '🔵', msg: 'compasses' },
  'calculator': { suggest: 'geometry sets',  emoji: '🔢', msg: 'calculators' },
  'geometry':   { suggest: 'calculators',    emoji: '📐', msg: 'geometry items' },

  // Office
  'stapler':    { suggest: 'paper clips',    emoji: '📌', msg: 'staplers' },
  'clip':       { suggest: 'staplers',       emoji: '📎', msg: 'clips' },
  'folder':     { suggest: 'notebooks',      emoji: '📁', msg: 'folders' },
  'eraser':     { suggest: 'pencils',        emoji: '🧹', msg: 'erasers' },
  'sharpener':  { suggest: 'pencils',        emoji: '✏️', msg: 'sharpeners' },
};

// Funny fallback messages when nothing matches
const funnyFallbacks = [
  { emoji: '🔍', line1: "Hmm, we looked everywhere…",       line2: "Even behind the staplers. Nothing found!" },
  { emoji: '📦', line1: "That item seems to be hiding!",    line2: "Try a different word — we have over 100 products!" },
  { emoji: '🤔', line1: "Our pencils are stumped too.",     line2: "Try searching for pens, notebooks, or bags." },
  { emoji: '😅', line1: "Oops! Nothing matched that.",     line2: "Check your spelling or try a broader search." },
  { emoji: '🧐', line1: "We searched high and low…",       line2: "But found nothing. Try: pens, books, or bags!" },
  { emoji: '✏️', line1: "The ink has run dry on results!", line2: "Try a different keyword to find your product." },
];

function getSmartEmptyState(keyword, category) {

  // ── Category chip with no products (rare edge case) ──
  if (category && !keyword) {
    return `
      <div class="empty-state">
        <div class="empty-emoji">📭</div>
        <h3>No products in "${category}" yet</h3>
        <p>This category is coming soon! Browse our other categories in the meantime.</p>
        <button class="empty-browse-btn" onclick="selectChip(document.querySelector('.cat-chip'), '')">
          <i class="fa-solid fa-grid-2"></i> Browse All Products
        </button>
      </div>`;
  }

  // ── Keyword search returned nothing ──
  const kw = keyword.toLowerCase().trim();

  // Check if keyword matches any of our smart suggestions
  let matched = null;
  for (const [key, val] of Object.entries(smartSuggestions)) {
    if (kw.includes(key)) { matched = val; break; }
  }

  if (matched) {
    return `
      <div class="empty-state">
        <div class="empty-emoji">${matched.emoji}</div>
        <h3>Oops! No ${matched.msg} found.</h3>
        <p>We couldn't find anything for <strong>"${keyword}"</strong>.</p>
        <p class="empty-suggestion">Try searching for <strong>${matched.suggest}</strong> instead?</p>
        <div class="empty-actions">
          <button class="empty-search-btn" onclick="trySearch('${matched.suggest}')">
            <i class="fa-solid fa-magnifying-glass"></i> Search "${matched.suggest}"
          </button>
          <button class="empty-browse-btn" onclick="clearSearch()">
            <i class="fa-solid fa-grid-2"></i> Show All Products
          </button>
        </div>
      </div>`;
  }

  // No smart match — use a random funny fallback
  const fb = funnyFallbacks[Math.floor(Math.random() * funnyFallbacks.length)];
  return `
    <div class="empty-state">
      <div class="empty-emoji">${fb.emoji}</div>
      <h3>${fb.line1}</h3>
      <p>${fb.line2}</p>
      <div class="empty-actions">
        <button class="empty-browse-btn" onclick="clearSearch()">
          <i class="fa-solid fa-grid-2"></i> Show All Products
        </button>
      </div>
    </div>`;
}

const categoryIcons = {
  'Pens':       'fa-pen',      'Pencils':  'fa-pencil',
  'Notebooks':  'fa-book',     'Markers':  'fa-highlighter',
  'Geometry':   'fa-compass',  'Paper':    'fa-file',
  'Stationery': 'fa-paperclip','Adhesives':'fa-tape',
  'Office':     'fa-briefcase',
};
function getIcon(cat) { return categoryIcons[cat] || 'fa-box-open'; }

async function init() {
  try {
    allProducts   = await Api.getAll();
    shownProducts = [...allProducts];
    renderProducts(shownProducts);
    loadCategoryChips();
  } catch {
    document.getElementById('productGrid').innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-plug-circle-xmark"></i>
        <h3>Cannot connect to server</h3>
        <p>Make sure Spring Boot is running at localhost:8080, then refresh.</p>
      </div>`;
    document.getElementById('resultsCount').textContent = 'Connection failed';
  }
}

function renderProducts(products) {
  const grid    = document.getElementById('productGrid');
  const countEl = document.getElementById('resultsCount');
  countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;

  if (products.length === 0) {
    grid.innerHTML = getSmartEmptyState(lastKeyword, activeCategory);
    return;
  }

  grid.innerHTML = products.map((p, idx) => {
    const outOfStock = !p.available || p.stockQuantity === 0;
    const lowStock   = !outOfStock && p.stockQuantity <= 10;
    const isNew      = p.id <= 5;
    let badge = '';
    if      (outOfStock) badge = `<span class="badge badge-out">Out of Stock</span>`;
    else if (lowStock)   badge = `<span class="badge badge-low">Only ${p.stockQuantity} left</span>`;
    else if (isNew)      badge = `<span class="badge badge-fresh">New</span>`;

    const imgContent = p.imageUrl
      ? `<img src="${p.imageUrl}" alt="${p.name}"/>`
      : `<i class="fa-solid ${getIcon(p.category)}"></i>`;

    const stockLabel = outOfStock ? 'out' : (lowStock ? 'low' : '');
    const stockText  = outOfStock ? 'Out of Stock' : `${p.stockQuantity} in stock`;

    const safeP = JSON.stringify(p).replace(/"/g, '&quot;');

    return `
      <div class="product-card" style="animation-delay:${idx * 0.04}s">
        <div class="card-img">
          ${imgContent}
          ${badge}
          <div class="card-img-overlay">
            <button class="overlay-btn" onclick="event.stopPropagation(); openProductModal(${p.id})">
              <i class="fa-solid fa-eye"></i> Quick View
            </button>
            <button class="overlay-btn" onclick="event.stopPropagation(); addToCart(${safeP})" ${outOfStock ? 'disabled' : ''}>
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-category"><i class="fa-solid ${getIcon(p.category)}"></i> ${p.category}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-brand">${p.brand ? 'by ' + p.brand : ''}</div>
          <div class="card-footer-row">
            <div class="card-price">LKR ${p.price.toFixed(2)} <small>/unit</small></div>
            <span class="stock-pill ${stockLabel}">${stockText}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn-add-cart"
            onclick="addToCart(${safeP})"
            ${outOfStock ? 'disabled' : ''}>
            <i class="fa-solid fa-basket-shopping"></i>
            <span>${outOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>`;
  }).join('');
}

async function loadCategoryChips() {
  try {
    const cats  = await Api.getCategories();
    const strip = document.getElementById('categoryChips');
    cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className   = 'cat-chip';
      btn.innerHTML   = `<i class="fa-solid ${getIcon(cat)}"></i> ${cat}`;
      btn.onclick     = () => selectChip(btn, cat);
      strip.appendChild(btn);
    });
  } catch {}
}

function selectChip(el, category) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeCategory = category;
  lastKeyword    = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearch').style.display = 'none';
  shownProducts = category ? allProducts.filter(p => p.category === category) : [...allProducts];
  applySortAndRender();
}

function filterByCategory() {
  const cat = document.getElementById('categoryFilter').value;
  shownProducts = cat ? allProducts.filter(p => p.category === cat) : [...allProducts];
  applySortAndRender();
}

let searchTimer;
async function handleSearch() {
  clearTimeout(searchTimer);
  const kw = document.getElementById('searchInput').value.trim();
  document.getElementById('clearSearch').style.display = kw ? 'block' : 'none';
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.cat-chip').classList.add('active');
  activeCategory = '';
  searchTimer = setTimeout(async () => {
    lastKeyword = kw;   // ← save what user searched
    if (!kw) { shownProducts = [...allProducts]; }
    else {
      try { shownProducts = await Api.search(kw); }
      catch {
        shownProducts = allProducts.filter(p =>
          p.name.toLowerCase().includes(kw.toLowerCase()) ||
          (p.brand && p.brand.toLowerCase().includes(kw.toLowerCase())) ||
          p.category.toLowerCase().includes(kw.toLowerCase())
        );
      }
    }
    applySortAndRender();
  }, 320);
}

// Called when user clicks the suggestion button in empty state
function trySearch(keyword) {
  const input = document.getElementById('searchInput');
  input.value = keyword;
  input.dispatchEvent(new Event('input'));
  document.getElementById('clearSearch').style.display = 'block';
  // Scroll to search bar
  document.querySelector('.controls-bar').scrollIntoView({ behavior: 'smooth' });
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearch').style.display = 'none';
  lastKeyword    = '';
  activeCategory = '';
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.cat-chip').classList.add('active');
  shownProducts = [...allProducts];
  applySortAndRender();
}

function applySortAndRender() {
  const sort   = document.getElementById('sortFilter').value;
  let   sorted = [...shownProducts];
  if (sort === 'price-asc')  sorted.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') sorted.sort((a,b) => b.price - a.price);
  if (sort === 'name-asc')   sorted.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'name-desc')  sorted.sort((a,b) => b.name.localeCompare(a.name));
  renderProducts(sorted);
}

async function openProductModal(id) {
  const overlay = document.getElementById('modalOverlay');
  const modal   = document.getElementById('productModal');
  const body    = document.getElementById('modalBody');
  overlay.classList.add('open');
  modal.classList.add('open');
  body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;padding:80px;"><div class="spinner"></div></div>`;
  try {
    const p          = await Api.getById(id);
    const outOfStock = !p.available || p.stockQuantity === 0;
    const imgHtml    = p.imageUrl
      ? `<div class="modal-img"><img src="${p.imageUrl}" alt="${p.name}"/></div>`
      : `<div class="modal-img"><i class="fa-solid ${getIcon(p.category)}"></i></div>`;
    const safeP = JSON.stringify(p).replace(/"/g,"'");
    body.innerHTML = `
      ${imgHtml}
      <div class="modal-info">
        <div class="modal-category">${p.category}</div>
        <h2 class="modal-name">${p.name}</h2>
        <div class="modal-brand">${p.brand ? 'by ' + p.brand : ''}</div>
        <p class="modal-desc">${p.description || 'No description available.'}</p>
        <div class="modal-meta">
          <div class="meta-pill"><strong>LKR ${p.price.toFixed(2)}</strong><small>Price</small></div>
          <div class="meta-pill"><strong>${p.stockQuantity}</strong><small>In Stock</small></div>
          <div class="meta-pill"><strong>${p.available ? '✔ Yes' : '✗ No'}</strong><small>Available</small></div>
        </div>
        <button class="modal-add-btn" onclick="addToCart(${safeP}); closeModal();" ${outOfStock ? 'disabled' : ''}>
          <i class="fa-solid fa-basket-shopping"></i>
          ${outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>`;
  } catch {
    body.innerHTML = `<div style="padding:60px;text-align:center;color:#c00;"><i class="fa-solid fa-circle-exclamation" style="font-size:2rem;display:block;margin-bottom:12px;"></i>Failed to load product.</div>`;
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
}

init();