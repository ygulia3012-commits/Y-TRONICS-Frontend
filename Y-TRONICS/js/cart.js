// CART MANAGEMENT
let cart = [];

function addToCart(productId) {
    const product = window.productsData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    saveToLocalStorage('y-tronics-cart', cart);
    showToast(`✓ ${product.name} added to cart`);
}

function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(id);
    } else {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity = newQuantity;
            updateCartUI();
            saveToLocalStorage('y-tronics-cart', cart);
        }
    }
}

function removeFromCart(id) {
    const item = cart.find(i => i.id === id);
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    saveToLocalStorage('y-tronics-cart', cart);
    if (item) showToast(`Removed ${item.name} from cart`);
}

function clearCart() {
    cart = [];
    updateCartUI();
    saveToLocalStorage('y-tronics-cart', cart);
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function loadCartFromStorage() {
    const savedCart = getFromLocalStorage('y-tronics-cart');
    if (savedCart && Array.isArray(savedCart)) {
        cart = savedCart;
        updateCartUI();
    }
}
