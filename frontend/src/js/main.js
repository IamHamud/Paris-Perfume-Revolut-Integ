// ======= LUXURY PERFUME PRODUCT DATA =======
const products = {
  female: [
    { name: 'Rose Noir', image: 'pexels-valeriya-965989.jpg', price: 150, reviews: '567', description: 'Dark & Romantic' },
    { name: 'Golden Elegance', image: 'pexels-jessbaileydesign-755992.jpg', price: 180, reviews: '423', description: 'Luxurious & Sophisticated' }
  ]
};

// ======= CAROUSEL IMAGES (For visual beauty only) =======
const carouselImages = [
  { name: 'Crystal Dreams', image: 'pexels-cottonbro-6487163.jpg', description: 'Fresh & Ethereal' },
  { name: 'Velvet Passion', image: 'pexels-mart-production-8450344.jpg', description: 'Sensual & Bold' },
  { name: 'Pearl Essence', image: 'pexels-ksu-eli-studio-78564297-8723294.jpg', description: 'Pure & Delicate' },
  { name: 'Amber Mystique', image: 'pexels-cottonbro-9511241.jpg', description: 'Mysterious & Warm' },
  { name: 'Silk Blossom', image: 'pexels-olly-3774939.jpg', description: 'Soft & Feminine' }
];

// ======= CART ELEMENTS HELPERS =======
function refreshCartElements() {
  // Handles both ../ and src/ based on current page
  window.cartDrawer = document.getElementById('cartDrawer');
  window.backdrop = document.getElementById('backdrop');
  window.cartContentContainer = document.getElementById('cartItem');
}
refreshCartElements();

// ======= RENDER PRODUCTS FOR INDEX =======
const productGrid = document.getElementById('product-grid');

// Only render if on index.html
function renderProducts(gender) {
  if (!productGrid) return;
  productGrid.innerHTML = '';
  products[gender].forEach(prod => {
    // Large Product Card for Main Products
    const div = document.createElement('div');
    div.className = 'group text-center bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 p-8';
    div.onclick = () => {
      localStorage.setItem('selectedProduct', JSON.stringify(prod));
      window.location.href = 'src/pages/product.html';
    };
    
    div.innerHTML = `
      <div class="relative overflow-hidden rounded-2xl mb-6">
        <img src="src/images/${prod.image}" alt="${prod.name}" class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="mb-6">
        <h3 class="font-bold text-2xl text-gray-800 mb-3">${prod.name}</h3>
        <p class="text-lg text-gray-600 mb-4">${prod.description}</p>
        <p class="text-3xl font-bold text-rose-600 mb-2">$${prod.price}.00</p>
        <p class="text-sm text-gray-400">${prod.reviews} reviews ⭐⭐⭐⭐⭐</p>
      </div>
    `;
    
    // Buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'space-y-3';
    
    // Add to Cart button (stops propagation)
    const addButton = document.createElement('button');
    addButton.className = 'w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105';
    addButton.textContent = 'Add to Cart';
    addButton.onclick = (e) => {
      e.stopPropagation();
      addToCart({ ...prod, qty: 1 });
    };
    buttonContainer.appendChild(addButton);
    
    // Buy Now button (stops propagation)
    const buyButton = document.createElement('button');
    buyButton.className = 'w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105';
    buyButton.textContent = '💳 Buy Now';
    buyButton.onclick = (e) => {
      e.stopPropagation();
      buyNow({ ...prod, qty: 1 });
    };
    buttonContainer.appendChild(buyButton);
    
    div.appendChild(buttonContainer);
    productGrid.appendChild(div);
  });
}

// ======= RENDER CAROUSEL =======
function renderCarousel() {
  const carouselTrack = document.getElementById('carousel-track');
  if (!carouselTrack) return;
  
  // Create doubled array for seamless loop
  const doubledImages = [...carouselImages, ...carouselImages];
  
  carouselTrack.innerHTML = doubledImages.map(item => `
    <div class="carousel-item flex-shrink-0">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src="src/images/${item.image}" alt="${item.name}" class="w-full h-64 object-cover" />
        <div class="p-4 text-center">
          <h4 class="font-semibold text-gray-800">${item.name}</h4>
          <p class="text-sm text-gray-600">${item.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

if (productGrid) {
  // Auto-render products (no tabs needed, only female products)
  renderProducts('female');
  // Render the carousel
  renderCarousel();
}

// ======= BUY NOW WITH REVOLUT POP-UP =======
// Revolut Integration - Simplified version based on working example
async function buyNow(product) {
    console.log('buyNow called with product:', product);
    
    try {
        // Import RevolutCheckout (using the correct ESM URL like working example)
        const { default: RevolutCheckout } = await import('https://unpkg.com/@revolut/checkout/esm');
        
        // Create the order - this follows the working example pattern
        const response = await fetch('http://localhost:5177/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: Math.round(product.price * 100), // Convert to cents
                currency: 'USD',
                name: product.name,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();
        console.log('Order created:', order);

        // Initialize the widget - exactly like working example
        const { payWithPopup } = await RevolutCheckout(
            order.revolutPublicOrderId,
            "sandbox"
        );

        // Configure card pop-up - simplified like working example
        payWithPopup({
            onSuccess() {
                console.log('Payment successful!');
                // Clear cart if buying from cart
                if (typeof clearCart === 'function') {
                    clearCart();
                }
            },
            onError() {
                console.log('Payment failed');
            },
        });

    } catch (error) {
        console.error('Error in buyNow:', error);
    }
}

// Make buyNow available globally
window.buyNow = buyNow;

// ======= QUICK CHECKOUT FROM CART DRAWER =======
async function quickCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        console.log('Cart is empty');
        return;
    }
    
    // Close cart drawer
    closeCart();
    
    // Calculate total and create order description
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemNames = cart.map(item => `${item.name} (${item.qty}x)`).join(', ');
    const orderDescription = `Paris Perfumes Order: ${itemNames}`;
    
    try {
        // Import RevolutCheckout
        const { default: RevolutCheckout } = await import('https://unpkg.com/@revolut/checkout/esm');
        
        // Create order with backend
        const response = await fetch('http://localhost:5177/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: Math.round(totalAmount * 100), // Convert to cents
                currency: 'USD',
                name: orderDescription,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const order = await response.json();
        console.log('Quick checkout order created:', order);

        // Initialize Revolut checkout
        const { payWithPopup } = await RevolutCheckout(
            order.revolutPublicOrderId,
            "sandbox"
        );

        // Show payment popup
        payWithPopup({
            onSuccess() {
                console.log(`Payment Successful! Your order for $${totalAmount.toFixed(2)} has been confirmed.`);
                // Clear cart after successful payment
                clearCart();
            },
            onError() {
                console.log('Payment failed. Please try again.');
            },
        });

    } catch (error) {
        console.error('Error in quick checkout:', error);
    }
}

// Make quickCheckoutCart available globally
window.quickCheckoutCart = quickCheckoutCart;

// ======= ADD TO CART / CART UTILS =======
function addToCart(item) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(i => i.name === item.name);
    if (existingIndex !== -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    refreshCartElements();
    openCart();
    renderCartItems();
  } catch (e) {
    console.error('Error adding to cart:', e);
  }
}

function updateCartQuantity(itemName, change) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(i => i.name === itemName);
    if (itemIndex !== -1) {
      cart[itemIndex].qty += change;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      refreshCartElements();
      renderCartItems();
    }
  } catch (e) {
    console.error('Error updating cart quantity:', e);
  }
}

function removeFromCart(itemName) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    refreshCartElements();
    renderCartItems();
  } catch (e) {
    console.error('Error removing from cart:', e);
  }
}

function clearCart() {
  try {
    localStorage.setItem('cart', JSON.stringify([]));
    refreshCartElements();
    renderCartItems();
  } catch (e) {
    console.error('Error clearing cart:', e);
  }
}

// ======= RENDER CART DRAWER ITEMS =======
function renderCartItems() {
  refreshCartElements();
  if (!window.cartContentContainer) return;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let imgPrefix = 'src/images/';
  // If on product.html or cart.html in src/pages, adjust path
  if (window.location.pathname.includes('/pages/')) imgPrefix = '../images/';

  window.cartContentContainer.innerHTML = cart.length
    ? cart.map(item => `
      <div class="flex gap-4 mb-4 border-b pb-4">
        <img src="${imgPrefix}${item.image}" class="w-20 h-24 object-cover rounded" />
        <div class="flex-1">
          <p class="font-semibold">${item.name}</p>
          <p class="text-sm text-gray-600">${item.description || 'Luxury Fragrance'}</p>
          <p class="text-sm mt-1">$${(item.price * item.qty).toFixed(2)}</p>
          <div class="flex items-center mt-2">
            <button onclick="updateCartQuantity('${item.name}', -1)" class="px-2 py-1 border rounded">-</button>
            <span class="px-3">Qty: ${item.qty}</span>
            <button onclick="updateCartQuantity('${item.name}', 1)" class="px-2 py-1 border rounded">+</button>
            <button onclick="removeFromCart('${item.name}')" class="ml-4 text-red-500 text-sm">Remove</button>
          </div>
        </div>
      </div>
    `).join('')
    : '<p class="text-center text-gray-500">Your cart is empty.</p>';

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotalElement = document.getElementById('cartSubtotal');
  const totalElement = document.getElementById('cartTotal');
  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// ======= CART DRAWER OPEN/CLOSE =======
function openCart() {
  refreshCartElements();
  if (window.cartDrawer && window.backdrop) {
    window.cartDrawer.classList.remove('translate-x-full');
    window.backdrop.classList.remove('hidden');
    renderCartItems();
  }
}

function closeCart() {
  refreshCartElements();
  if (window.cartDrawer && window.backdrop) {
    window.cartDrawer.classList.add('translate-x-full');
    window.backdrop.classList.add('hidden');
  }
}

// ======= CLOSE ON BACKDROP CLICK =======
if (window.backdrop) {
  window.backdrop.addEventListener('click', closeCart);
}

// ======= STATIC DFYNE PRODUCTS HANDLING (for index.html section) =======
document.querySelectorAll('.dfyne-product').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const image = card.dataset.image;
      const reviews = card.querySelector('p:nth-child(3)')?.textContent.match(/\d+/)?.[0] || '0';
      localStorage.setItem('selectedProduct', JSON.stringify({ name, price, image, reviews }));
      window.location.href = 'src/pages/product.html';
    }
  });
  const addButton = document.createElement('button');
  addButton.className = 'bg-black text-white px-4 py-2 mt-2 rounded hover:opacity-90';
  addButton.textContent = 'Add to Cart';
  addButton.onclick = (e) => {
    e.stopPropagation();
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const image = card.dataset.image;
    const reviews = card.querySelector('p:nth-child(3)')?.textContent.match(/\d+/)?.[0] || '0';
    addToCart({ name, price, image, reviews, qty: 1 });
  };
  card.appendChild(addButton);
});

// ======= INIT ON LOAD FOR ALL PAGES =======
document.addEventListener('DOMContentLoaded', () => {
  refreshCartElements();
  // If cart drawer exists, render cart items
  if (window.cartDrawer) renderCartItems();

  // If add-to-cart button exists (on product.html), set up handler
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    // Get selected product from localStorage
    const selected = JSON.parse(localStorage.getItem('selectedProduct')) || { name: 'F Crop Top', image: 'f-crop.jpg', price: 120, reviews: '160' };
    addBtn.addEventListener('click', () => {
      addToCart({ ...selected, qty: 1 });
      openCart(); // force open every time
    });
  }
});
