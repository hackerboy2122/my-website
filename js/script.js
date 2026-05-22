// Dummy Product Database Array with Luxury Premium Images
const products = [
    { id: 1, name: "Premium Royal Gulab Jamun", category: "Sweets", price: 320, description: "Soft, golden-fried dumplings soaked in saffron syrup.", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop", bestseller: true },
    { id: 2, name: "Kolkata Spongy Rasgulla", category: "Sweets", price: 280, description: "Light, spongy and melt-in-the-mouth cottage cheese balls.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop", bestseller: false },
    { id: 3, name: "Luxury Silver Kaju Katli", category: "Sweets", price: 850, description: "Premium cashews blended with pure sugar and silver vark.", image: "https://images.unsplash.com/photo-1605197585662-79344400e96b?q=80&w=600&auto=format&fit=crop", bestseller: true },
    { id: 4, name: "Desi Ghee Motichoor Laddu", category: "Sweets", price: 450, description: "Granulated gram flour droplets cooked perfectly in desi ghee.", image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600&auto=format&fit=crop", bestseller: true },
    { id: 5, name: "Crispy Saffron Jalebi", category: "Sweets", price: 300, description: "Traditional Indian sweet deep-fried and soaked in kesar syrup.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop", bestseller: false },
    { id: 6, name: "Crispy Punjabi Khasta Samosa", category: "Snacks", price: 20, description: "Flaky pastry stuffed with perfectly spiced mashed potatoes and peas.", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop", bestseller: true },
    { id: 7, name: "Shahi Pyaaz Kachori", category: "Snacks", price: 30, description: "Crisp, deep-fried kachori stuffed with spicy onion blend.", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop", bestseller: false }
];

let cart = [];

// Initialize Lucide Icons and Render Items on Load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderProducts(products);
    setupThemeToggle();
});

// Render Beautiful Dynamic Product Cards Framework
function renderProducts(items) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    items.forEach(product => {
        const bestsellerBadge = product.bestseller ? `<span class="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-md">Bestseller 🔥</span>` : '';
        
        const cardHtml = `
            <div class="relative bg-white dark:bg-amber-900/40 rounded-3xl overflow-hidden shadow-lg border border-amber-100 dark:border-amber-800/60 transform hover:-translate-y-1.5 transition-all duration-300 group">
                ${bestsellerBadge}
                <div class="h-52 w-full overflow-hidden relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="p-6 space-y-3">
                    <div class="flex justify-between items-start gap-2">
                        <h3 class="text-base font-bold font-serif leading-tight">${product.name}</h3>
                        <span class="text-lg font-black text-orange-600 dark:text-orange-400 shrink-0">₹${product.price}</span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-300 line-clamp-2">${product.description}</p>
                    <button onclick="addToCart(${product.id})" class="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-bold rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-md">
                        <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                        <span>Add to Sweet Box</span>
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
    lucide.createIcons();
}

// Category Filter Processing
function filterProducts(category) {
    // Update active button state styling
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        if(btn.innerText.includes(category) || (category === 'All' && btn.innerText === 'All Items')) {
            btn.className = "category-btn px-6 py-2 rounded-full text-sm font-bold bg-orange-500 text-white shadow-md transition-all";
        } else {
            btn.className = "category-btn px-6 py-2 rounded-full text-sm font-bold bg-white dark:bg-amber-900 text-amber-950 dark:text-white border border-amber-200 dark:border-amber-800 shadow-sm hover:bg-orange-50 transition-all";
        }
    });

    if (category === 'All') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Shopping Cart Functional Operations
function addToCart(id) {
    const item = products.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
}

function updateCartQuantity(id, change) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(c => c.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    // Update cart count icon badge
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalCount;

    // Render cart sidebar items list panel
    const listContainer = document.getElementById('cart-items-list');
    listContainer.innerHTML = '';
    
    let subtotal = 0;

    if (cart.length === 0) {
        listContainer.innerHTML = `<p class="text-center py-10 opacity-60 text-sm">Aapka box abhi khali hai. Kuch swaad jodiye!</p>`;
    } else {
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            listContainer.innerHTML += `
                <div class="flex items-center justify-between border-b border-amber-100 dark:border-amber-900 pb-3">
                    <div class="flex items-center space-x-3">
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl shadow-inner">
                        <div>
                            <h4 class="font-bold text-xs leading-tight">${item.name}</h4>
                            <p class="text-xs text-orange-500 font-bold mt-0.5">₹${item.price} x ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-1.5 border border-amber-200 dark:border-amber-800 rounded-lg p-0.5 bg-gray-50 dark:bg-amber-900">
                        <button onclick="updateCartQuantity(${item.id}, -1)" class="px-1.5 text-xs font-bold hover:text-red-500">-</button>
                        <span class="text-xs font-bold px-1">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 1)" class="px-1.5 text-xs font-bold hover:text-green-500">+</button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('cart-total').innerText = `₹${subtotal}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('hidden');
}

// Modal Form Controls
document.getElementById('cart-btn').addEventListener('click', toggleCart);

function openCheckout() {
    if (cart.length === 0) {
        alert("Pehle cart mein kuch add karein bhai! 😊");
        return;
    }
    toggleCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function handleOrderSubmit(e) {
    e.preventDefault();
    alert("🎉 Order Successful!\nAapka premium sweet box 45 minutes mein ready ho jayega!");
    cart = [];
    updateCartUI();
    closeCheckout();
}

// Dark / Light Mode Toggle Interface Logic
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
        lucide.createIcons();
    });
}