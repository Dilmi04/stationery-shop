// Cart is stored in sessionStorage so it stays while browser is open
let cart = JSON.parse(sessionStorage.getItem('papercraft_cart') || '[]');

/* ── SAVE cart to sessionStorage ── */
function saveCart() {
  sessionStorage.setItem('papercraft_cart', JSON.stringify(cart));
  renderCart();
}

/* ── ADD item to cart ── */
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    if (existing.qty >= product.stockQuantity) {
      showToast('Maximum stock reached for this item!', 'warning');
      return;
    }
    existing.qty++;
  } else {
    cart.push({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      imageUrl: product.imageUrl,
      maxQty:   product.stockQuantity,
      qty:      1
    });
  }
  saveCart();
  showToast(`✔  ${product.name} added to cart!`, 'success');
}

/* ── INCREASE quantity ── */
function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (item.qty >= item.maxQty) {
    showToast('Maximum stock reached!', 'warning');
    return;
  }
  item.qty++;
  saveCart();
}

/* ── DECREASE quantity ── */
function decreaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (item.qty <= 1) {
    removeFromCart(id);
    return;
  }
  item.qty--;
  saveCart();
}

/* ── REMOVE item from cart ── */
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  showToast('Item removed from cart', 'warning');
}

/* ── CLEAR entire cart ── */
function clearCart() {
  cart = [];
  saveCart();
  showToast('Cart cleared!', 'warning');
}

/* ── GET total price ── */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

/* ── GET total item count ── */
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ── RENDER cart sidebar ── */
function renderCart() {
  // Update cart count badge in navbar
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = getCartCount();

  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const totalEl  = document.getElementById('cartTotal');

  if (!itemsEl) return;

  if (cart.length === 0) {
    // Show empty message
    itemsEl.innerHTML = `
      <div class="cart-empty-msg">
        <i class="fa-regular fa-face-sad-tear"></i>
        <p>Your cart is empty</p>
        <small>Add some products to get started!</small>
      </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  // Show cart items
  if (footerEl) footerEl.style.display = 'flex';
  if (totalEl) totalEl.textContent = `LKR ${getCartTotal().toFixed(2)}`;

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">
        ${item.imageUrl
          ? `<img src="${item.imageUrl}" alt="${item.name}"/>`
          : `<i class="fa-solid fa-box-open"></i>`}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">LKR ${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

/* ── OPEN / CLOSE cart sidebar ── */
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

/* ── TOAST notification ── */
function showToast(message, type = '') {
  const toast = document.getElementById('toastMsg');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast-msg ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── INIT — render on page load ─ */
renderCart();