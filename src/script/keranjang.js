const cartKey = "keranjang";
const pesananKey = "pesanan";
const rupiah = n => "Rp" + (n * 16000).toLocaleString("id-ID");

function loadCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  document.getElementById("cart-count").innerText = `(${cart.length})`;
}

function changeQuantity(id, delta) {
  const cart = loadCart();
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = Math.max(1, item.quantity + delta);
    saveCart(cart);
    renderCart();
  }
}

function removeFromCart(id) {
  let cart = loadCart();
  cart = cart.filter(p => p.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const container = document.getElementById("product-container");
  const totalEl = document.getElementById("total-harga");
  const checkoutContainer = document.getElementById("checkout-container");

  container.innerHTML = "";
  checkoutContainer.innerHTML = "";

  const cart = loadCart();

  cart.forEach((product, index) => {
    const el = document.createElement("div");
    el.className = "flex flex-col sm:flex-row border rounded-lg p-4 shadow gap-4";

    el.innerHTML = `
      <div class="flex items-start">
        <input type="checkbox" checked class="w-5 h-5 accent-amber-700 mt-2 item-check" data-index="${index}">
      </div>
      <div class="w-full sm:w-32 flex-shrink-0">
        <img src="${product.image}" class="object-contain w-full aspect-square" />
      </div>
      <div class="flex-1 space-y-2">
        <h2 class="text-sm font-semibold text-gray-800">${product.category}</h2>
        <p class="text-sm text-gray-600 leading-tight">${product.title}</p>
        <p class="text-sm font-semibold">${rupiah(product.price)}</p>
        <div class="flex items-center gap-2">
          <button class="bg-gray-300 px-2 rounded" onclick="changeQuantity(${product.id}, -1)">-</button>
          <span class="px-3">${product.quantity}</span>
          <button class="bg-gray-300 px-2 rounded" onclick="changeQuantity(${product.id}, 1)">+</button>
        </div>
      </div>
      <div class="flex items-center justify-end gap-4">
        <button onclick="removeFromCart(${product.id})" class="text-xl hover:text-red-500">🗑️</button>
      </div>
    `;
    container.appendChild(el);
  });

  updateTotal(cart);

  // Checkbox listener
  document.querySelectorAll('.item-check').forEach(cb => {
    cb.addEventListener('change', () => updateTotal(cart));
  });

  // Tambahkan tombol checkout di bawah total
  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Beli Sekarang";
  checkoutBtn.className = "mt-4 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition";
  checkoutBtn.addEventListener('click', () => checkoutSelectedItems(cart));
  checkoutContainer.appendChild(checkoutBtn);

  document.getElementById("cart-count").innerText = `(${cart.length})`;
}

function updateTotal(cart) {
  const checkboxes = document.querySelectorAll('.item-check');
  let total = 0;

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      const product = cart[i];
      total += product.price * product.quantity;
    }
  });

  document.getElementById("total-harga").innerText = rupiah(total);
}

function checkoutSelectedItems(cart) {
  const checkboxes = document.querySelectorAll('.item-check');
  const selectedItems = [];

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      selectedItems.push(cart[i]);
    }
  });

  if (selectedItems.length === 0) {
    alert("Pilih setidaknya satu produk untuk checkout.");
    return;
  }

  localStorage.setItem(pesananKey, JSON.stringify(selectedItems));
  window.location.href = "detailpesan.html";
}

document.addEventListener("DOMContentLoaded", renderCart);
