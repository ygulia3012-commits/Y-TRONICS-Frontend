// UI INTERACTIONS (Cart Panel, Checkout)
function initUI() {
    const cartIcon = document.getElementById('cartIcon');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartPanel = document.getElementById('cartPanel');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartOverlay.classList.add('open');
            cartPanel.classList.add('open');
        });
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartOverlay.classList.remove('open');
            cartPanel.classList.remove('open');
        });
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartOverlay.classList.remove('open');
            cartPanel.classList.remove('open');
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Your cart is empty! Add some products first.');
            } else {
                const total = getCartTotal();
                showToast(`Thank you for shopping at Y-TRONICS! Total: ${formatPrice(total)}`);
                setTimeout(() => {
                    alert(`🎉 Order Placed!\n\nTotal Amount: ${formatPrice(total)}\n\nThank you for shopping at Y-TRONICS!`);
                    clearCart();
                    cartOverlay.classList.remove('open');
                    cartPanel.classList.remove('open');
                }, 500);
            }
        });
    }
}
