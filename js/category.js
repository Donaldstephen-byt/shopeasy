
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");

      let products = [];

      document.getElementById("category-title").textContent = category;

      for (const category of categories) {
          const res = await fetch(
            `https://fakestoreapi.com/products/category/${category}`
          );
        const products = await res.json();

        const container = document.getElementById("product-container");


        const cart = getCart();

        container.innerHTML = products
          .map((product) => {
            const inCart = cart.some((item) => item.id === product.id);

            return `
        <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden group relative">
          <!-- Product image + title links to detail -->
          <a href="product.html?id=${product.id}" class="block">
            <div class="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src="${product.image}" alt="${product.title}"
                class="h-full w-full object-contain transform transition-transform duration-500 group-hover:scale-105"/>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">${
                product.title
              }</h3>
              <span class="text-xl font-bold text-black">$${
                product.price
              }</span>
            </div>
          </a>
          <!-- Add/Remove Cart -->
          <div class="p-4 pt-0">
            <button onclick="toggleCart(${product.id}, '${product.title.replace(
              /'/g,
              "\\'"
            )}', ${product.price}, '${product.image}', this)"
              class="w-full ${
                inCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-black hover:bg-black/80"
              } text-white text-xs py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center"
              data-id="${product.id}">
              <i data-lucide="shopping-cart" class="mr-2"></i> ${
                inCart ? "Remove from Cart" : "Add to Cart"
              }
            </button>
          </div>
        </div>
      `;
          })
          .join("");

        lucide.createIcons(); 
      }

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

   lucide.createIcons();