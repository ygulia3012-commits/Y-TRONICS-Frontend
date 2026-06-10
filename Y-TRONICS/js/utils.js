// UTILITY FUNCTIONS
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1c1c1e;
        color: white;
        padding: 12px 24px;
        border-radius: 40px;
        z-index: 1000;
        font-size: 0.9rem;
        animation: fadeOut ${duration / 1000}s forwards;
        white-space: nowrap;
        max-width: 90vw;
        white-space: normal;
        text-align: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateX(-50%) scale(1); }
            70% { opacity: 1; transform: translateX(-50%) scale(1); }
            100% { opacity: 0; transform: translateX(-50%) scale(0.9); visibility: hidden; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), duration);
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
