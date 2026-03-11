// All products stored here
let adminProducts = [];

// ID of product being deleted
let deleteTargetId = null;

/* ── LOAD everything on page start ── */
async function initAdmin() {
  await loadAdminProducts();
}

/* ── LOAD all products from API ── */
async function loadAdminProducts() {
  try {
    adminProducts = await Api.getAll();
    renderTable(adminProducts);
    updateStats(adminProducts);
  } catch (err) {
    document.getElementById('adminTableBody').innerHTML = `
      <tr>
        <td colspan="8" class="table-loading-msg" style="color:#c00;">
          <i class="fa-solid fa-circle-exclamation"></i>
          &nbsp; Cannot connect to backend. Make sure Spring Boot is running on port 8080.
        </td>
      </tr>`;
  }
}

/* ── RENDER stats cards ─── */
function updateStats(products) {
  document.getElementById('statTotal').textContent      = products.length;
  document.getElementById('statInStock').textContent    = products.filter(p => p.available && p.stockQuantity > 0).length;
  const cats = new Set(products.map(p => p.category));
  document.getElementById('statCategories').textContent = cats.size;
  document.getElementById('statLowStock').textContent   = products.filter(p => p.stockQuantity < 10).length;
}

/* ── RENDER products table ─── */
function renderTable(products) {
  const tbody = document.getElementById('adminTableBody');

  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="table-loading-msg">No products found.</td>
      </tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => {

    // Status badge
    let statusBadge;
    if (!p.available || p.stockQuantity === 0) {
      statusBadge = `<span class="status-badge status-out-stock"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`;
    } else if (p.stockQuantity < 10) {
      statusBadge = `<span class="status-badge status-low-stock"><i class="fa-solid fa-triangle-exclamation"></i> Low Stock</span>`;
    } else {
      statusBadge = `<span class="status-badge status-in-stock"><i class="fa-solid fa-circle-check"></i> In Stock</span>`;
    }

    return `
      <tr>
        <td><strong>#${p.id}</strong></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>${p.brand || '—'}</td>
        <td><strong>LKR ${p.price.toFixed(2)}</strong></td>
        <td>${p.stockQuantity}</td>
        <td>${statusBadge}</td>
        <td>
          <div class="action-btns">
            <button class="btn-edit-row" onclick="startEdit(${p.id})">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="btn-delete-row" onclick="openDeleteModal(${p.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

/* ── SAVE product (Create OR Update) ─── */
async function saveProduct() {
  const editId = document.getElementById('editId').value;

  // Read form values
  const data = {
    name:          document.getElementById('f_name').value.trim(),
    category:      document.getElementById('f_category').value.trim(),
    brand:         document.getElementById('f_brand').value.trim() || null,
    price:         parseFloat(document.getElementById('f_price').value),
    stockQuantity: parseInt(document.getElementById('f_stock').value),
    description:   document.getElementById('f_desc').value.trim() || null,
    imageUrl:      document.getElementById('f_image').value.trim() || null,
    available:     true
  };

  // Validation
  if (!data.name) {
    showToast('Please enter a product name!', 'error'); return;
  }
  if (!data.category) {
    showToast('Please enter a category!', 'error'); return;
  }
  if (isNaN(data.price) || data.price <= 0) {
    showToast('Please enter a valid price!', 'error'); return;
  }
  if (isNaN(data.stockQuantity) || data.stockQuantity < 0) {
    showToast('Please enter a valid stock quantity!', 'error'); return;
  }

  try {
    if (editId) {
      // UPDATE existing product
      await Api.update(Number(editId), data);
      showToast('✔  Product updated successfully!', 'success');
    } else {
      // CREATE new product
      await Api.create(data);
      showToast('✔  Product created successfully!', 'success');
    }
    resetForm();
    await loadAdminProducts();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

/* ── START editing a product ─── */
function startEdit(id) {
  const p = adminProducts.find(x => x.id === id);
  if (!p) return;

  // Fill form with product data
  document.getElementById('editId').value       = p.id;
  document.getElementById('f_name').value       = p.name;
  document.getElementById('f_category').value   = p.category;
  document.getElementById('f_brand').value      = p.brand    || '';
  document.getElementById('f_price').value      = p.price;
  document.getElementById('f_stock').value      = p.stockQuantity;
  document.getElementById('f_desc').value       = p.description || '';
  document.getElementById('f_image').value      = p.imageUrl  || '';

  // Change form title to show "Edit" mode
  document.getElementById('formTitle').innerHTML =
    `<i class="fa-solid fa-pen"></i> Edit Product #${p.id}`;

  // Scroll to form
  document.querySelector('.admin-form-panel').scrollIntoView({ behavior: 'smooth' });
}

/* ── RESET form to empty ── */
function resetForm() {
  document.getElementById('editId').value     = '';
  document.getElementById('f_name').value     = '';
  document.getElementById('f_category').value = '';
  document.getElementById('f_brand').value    = '';
  document.getElementById('f_price').value    = '';
  document.getElementById('f_stock').value    = '';
  document.getElementById('f_desc').value     = '';
  document.getElementById('f_image').value    = '';

  document.getElementById('formTitle').innerHTML =
    `<i class="fa-solid fa-plus"></i> Add New Product`;
}

/* ── DELETE confirm modal ── */
function openDeleteModal(id) {
  deleteTargetId = id;
  document.getElementById('deleteOverlay').classList.add('open');
  document.getElementById('deleteModal').classList.add('open');

  document.getElementById('confirmDeleteBtn').onclick = async () => {
    try {
      await Api.remove(deleteTargetId);
      showToast('Product deleted successfully!', 'success');
      closeDeleteModal();
      await loadAdminProducts();
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  };
}

function closeDeleteModal() {
  document.getElementById('deleteOverlay').classList.remove('open');
  document.getElementById('deleteModal').classList.remove('open');
  deleteTargetId = null;
}

/* ── FILTER table by search box ── */
function filterTable() {
  const keyword  = document.getElementById('tableSearch').value.toLowerCase();
  const filtered = adminProducts.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.category.toLowerCase().includes(keyword) ||
    (p.brand && p.brand.toLowerCase().includes(keyword))
  );
  renderTable(filtered);
}

/* ── TOAST notification ── */
function showToast(message, type = '') {
  const toast = document.getElementById('toastMsg');
  if (!toast) return;
  toast.textContent = message;
  toast.className   = `toast-msg ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── START ── */
initAdmin();