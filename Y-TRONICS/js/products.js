// PRODUCT DISPLAY & RENDERING
let productsData = [];
let currentFilter = 'all';

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        productsData = data.products;
        renderProducts();
        loadCartFromStorage();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderProducts() {
    let filtered = productsData;
    if (currentFilter !== 'all') {
        filtered = productsData.filter(p => p.category === currentFilter);
    }
    
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:60px;">No products found</div>';
        return;
    }
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img">
                <i class="fab fa-apple"></i>
            </div>
            ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
            <div class="product-title">${product.name}</div>
            <div class="product-desc">${product.desc}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    if (cartCount) cartCount.textContent = getCartItemCount();
    
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart-msg">Your cart is empty 🛍️</div>';
        if (cartTotalPrice) cartTotalPrice.textContent = '₹0';
        return;
    }
    
    cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <p>${item.name}</p>
                <small class="cart-item-price">${formatPrice(item.price)}</small>
                <div>Qty: ${item.quantity}</div>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    
    if (cartTotalPrice) {
        cartTotalPrice.textContent = formatPrice(getCartTotal());
    }
}
