
async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    lucide.createIcons();
    
    document.getElementById("product-detail").innerHTML = `
      <div class="grid grid-cols-2 gap-6">
        <img src="${product.image}" alt="${product.title}" class="w-full h-96 object-contain bg-gray-100 rounded-xl"/>
        <div>
          <h1 class="text-2xl font-bold mb-3">${product.title}</h1>
          <p class="text-gray-500 mb-4">${product.description}</p>
          <span class="text-2xl font-semibold">$${product.price}</span>
          <button onclick="toggleCart(${product.id}, this)"
            class="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-black/80 transition flex items-center justify-center">
                <i data-lucide="shopping-cart" class="mr-2"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  }


function toggleCart(id, btn) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.includes(id)) {
    cart = cart.filter(item => item !== id);
    btn.classList.remove("bg-red-500", "hover:bg-red-600");
    btn.classList.add("bg-black", "hover:bg-black/80");
    btn.innerHTML = `<i data-lucide="shopping-cart" class="mr-2"></i> Add to Cart`;
  } else {
    cart.push(id);
    btn.classList.remove("bg-black", "hover:bg-black/80");
    btn.classList.add("bg-red-500", "hover:bg-red-600");
    btn.innerHTML = `<i data-lucide="shopping-cart" class="mr-2"></i> Remove from Cart`;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(cart.length);
  lucide.createIcons();
}

  loadProduct();