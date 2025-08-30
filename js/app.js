// Toggle mobile menu
document.getElementById("menu-btn").onclick = () =>
  document.getElementById("mobile-menu").classList.toggle("hidden");

// Load existing cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart(cart.length);

function updateCart(n) {
  document.querySelector("#cart-count").textContent = n;
}

lucide.createIcons();

// Load products
async function loadProducts() {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  const products = await res.json();

  const container = document.getElementById("products-container");
  container.innerHTML = products.map(product => {
    const inCart = cart.includes(product.id);
    return `
      <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden group relative">
        <!-- Product image + title links to detail -->
        <a href="product.html?id=${product.id}" class="block">
          <div class="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src="${product.image}" alt="${product.title}"
              class="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"/>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">${product.title}</h3>
            <span class="text-xl font-bold text-black">$${product.price}</span>
          </div>
        </a>
        <!-- Add/Remove Cart -->
        <div class="p-4 pt-0">
          <button onclick="toggleCart(${product.id}, this)"
            class="w-full ${inCart ? 'bg-red-500 hover:bg-red-600' : 'bg-black hover:bg-black/80'} text-white text-xs py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center"
            data-id="${product.id}">
            <i data-lucide="shopping-cart" class="mr-2"></i> ${inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// Toggle add/remove product from cart
function toggleCart(id, btn) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.includes(id)) {
    // remove product
    cart = cart.filter(item => item !== id);
    // update button instantly
    btn.classList.remove("bg-red-500", "hover:bg-red-600");
    btn.classList.add("bg-black", "hover:bg-black/80");
    btn.innerHTML = `<i data-lucide="shopping-cart" class="mr-2"></i> Add to Cart`;
  } else {
    // add product
    cart.push(id);
    // update button instantly
    btn.classList.remove("bg-black", "hover:bg-black/80");
    btn.classList.add("bg-red-500", "hover:bg-red-600");
    btn.innerHTML = `<i data-lucide="shopping-cart" class="mr-2"></i> Remove from Cart`;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(cart.length);
  lucide.createIcons(); // re-render icons inside the updated button
}

loadProducts();
