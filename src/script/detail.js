const apiURL = 'https://fakestoreapi.com/products/1';

const product = JSON.parse(localStorage.getItem('selectedProduct'));
if (product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('title').textContent = product.title; 
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

  //tombol beli sekarang
  function beliSekarang() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const qty = parseInt(document.querySelector(".qty-input").value);

  if (!product || !qty) {
    alert("Produk atau jumlah tidak valid!");
    return;
  }

  //alert(`Anda akan membeli: ${product.title}\nJumlah: ${qty}\nTotal Harga: Rp ${(product.price * qty).toLocaleString('id-ID')}`);

}

// Pastikan tombol "Beli Sekarang" memiliki event listener:
document.getElementById("btn-beli-sekarang").addEventListener("click", beliSekarang);

//tambahkeranjang
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
  window.location.href = "";

}

//kategori
if (product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('title').textContent = product.title;
  document.getElementById('price').textContent = 'Rp' + product.price.toLocaleString('id-ID');
  document.getElementById('product-desc').textContent = product.description;

  // Tambahkan baris ini agar kategori muncul
  document.getElementById('category').textContent = formatKategori(product.category);

  function formatKategori(category) {
  switch (category) {
    case 'men\'s clothing':
      return 'Pakaian Pria';
    case 'women\'s clothing':
      return 'Pakaian Wanita';
    case 'jewelery':
      return 'Perhiasan';
    case 'electronics':
      return 'Elektronik';
    default:
      return category;
  }
}

}
