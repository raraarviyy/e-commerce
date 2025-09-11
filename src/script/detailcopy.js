const apiURL = 'https://fakestoreapi.com/products/1';

const product = JSON.parse(localStorage.getItem('selectedProduct'));
if (product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('title').textContent = product.title; // Corrected ID from 'product-title' to 'title'
  document.getElementById('price').textContent = 'Rp' + product.price.toLocaleString('id-ID');
  document.getElementById('product-desc').textContent = product.description;
}



// Quantity buttons
function decreaseQty() {
    const input = document.querySelector('.qty-input');
    let qty = parseInt(input.value);
    if (qty > 1) {
      input.value = qty - 1;
    }
  }

  function increaseQty() {
    const input = document.querySelector('.qty-input');
    let qty = parseInt(input.value);
    input.value = qty + 1;
  }

function tambahKeranjang() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const qty = parseInt(document.querySelector(".qty-input").value);
  alert("Produk berhasil ditambahkan ke keranjang!");
  
  if (!product || !qty) return;

  const cartKey = "keranjang";
  const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    // Kalau produk sudah ada, tambahkan jumlahnya
    existingCart[existingItemIndex].quantity += qty;
  } else {
    // Kalau belum ada, tambahkan produk baru ke keranjang
    existingCart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: qty,
    });
  }

  // Simpan ke localStorage
  localStorage.setItem(cartKey, JSON.stringify(existingCart));

  // Redirect ke halaman keranjang
  window.location.href = "keranjang.html";

}


function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}

function tambahKeranjang() {
  if (!isLoggedIn()) {
    window.location.href = "daftar.html";
    return;
  }

  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const qty = parseInt(document.querySelector(".qty-input").value);
  alert("Produk berhasil ditambahkan ke keranjang!");

  if (!product || !qty) return;

  const cartKey = "keranjang";
  const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    existingCart[existingItemIndex].quantity += qty;
  } else {
    existingCart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: qty,
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(existingCart));

  window.location.href = "keranjang.html";
}

function beliSekarang() {
  if (!isLoggedIn()) {
    window.location.href = "daftar.html";
    return;
  }

  // Misalnya simpan produk yang ingin dibeli dulu, lalu arahkan ke checkout
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const qty = parseInt(document.querySelector(".qty-input").value);
  localStorage.setItem("langsungBeli", JSON.stringify({ ...product, quantity: qty }));

  window.location.href = "checkout.html";
}
