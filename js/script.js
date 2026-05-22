let cart = [];

const products = [
  { id: 1, name: "Wireless Earbuds", price: 1299, img: "https://picsum.photos/id/20/300/300" },
  { id: 2, name: "Noise Cancelling Headphones", price: 2499, img: "https://picsum.photos/id/201/300/300" },
  { id: 3, name: "Trendy Hoodie", price: 899, img: "https://picsum.photos/id/251/300/300" },
  { id: 4, name: "Premium T-Shirt", price: 599, img: "https://picsum.photos/id/180/300/300" },
  { id: 5, name: "Bluetooth Earphones", price: 799, img: "https://picsum.photos/id/133/300/300" },
  { id: 6, name: "Cargo Pants", price: 1199, img: "https://picsum.photos/id/60/300/300" },
  { id: 7, name: "Smart Watch", price: 2199, img: "https://picsum.photos/id/367/300/300" },
  { id: 8, name: "Denim Jacket", price: 1499, img: "https://picsum.photos/id/201/300/300" },
  { id: 9, name: "Wireless Neckband", price: 999, img: "https://picsum.photos/id/133/300/300" },
  { id: 10, name: "Oversized T-Shirt", price: 699, img: "https://picsum.photos/id/251/300/300" }
];

function displayProducts(filteredProducts) {
  const container = document.getElementById('products');
  container.innerHTML = '';

  filteredProducts.forEach(product => {
    container.innerHTML += `
      <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <img src="${product.img}" class="w-full h-56 object-cover">
        <div class="p-5">
          <h3 class="font-semibold text-lg">${product.name}</h3>
          <p class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 mt-2">₹${product.price}</p>
          <button onclick="addToCart(${product.id})" 
                  class="mt-5 w-full bg-gradient-to-r from-pink-600 to-blue-600 text-white py-3.5 rounded-2xl hover:scale-105 transition font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  alert(`${product.name} added to cart! 🛍️`);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
  window.location.href = 'cart.html';
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);
});

// Initialize
displayProducts(products);