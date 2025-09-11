const productList = document.getElementById('product-list');
const template = document.getElementById('produk-template');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const clone = template.content.cloneNode(true);
      clone.querySelector('img').src = product.image;
      clone.querySelector('.price').textContent = 'Rp' + product.price.toLocaleString('id-ID');
      clone.querySelector('.title').textContent = product.title;
      // Saat link diklik, simpan detail produk
      clone.querySelector('a').addEventListener('click', () => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
      });

      // Tombol checkout juga simpan data dan redirect
      clone.querySelector('.checkout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        alert('Anda harus daftar terlebih dahulu!');
        window.location.href = 'daftar.html';
      });

     clone.querySelector('.keranjang-btn').addEventListener('click', (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('Anda harus daftar terlebih dahulu!');
    window.location.href = 'daftar.html';
    return;
  }

  const cartKey = 'keranjang';
  const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    existingCart[existingItemIndex].quantity += 1;
  } else {
    existingCart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(existingCart));
  alert('Anda harus daftar terlebih dahulu!');
  window.location.href = 'daftar.html';
});

      productList.appendChild(clone);
    });
  });

  //kategori
 async function loadProducts() {
    const res = await fetch('https://fakestoreapi.com/products?limit=4'); // Limit to 4 products
    const products = await res.json();
    const container = document.getElementById('products');

    products.forEach(product => {
      const card = document.createElement('div');
     card.className = "bg-white rounded shadow-md p-4 w-72";

card.innerHTML = `
  <div class="flex flex-row items-center justify-between gap-4">
    <div class="flex flex-col justify-between text-left">
      <h2 class="text-sm font-semibold mb-2">${product.title}</h2>
      <p class="text-md font-bold">$${product.price}</p>
    </div>
    <img src="${product.image}" alt="${product.title}" class="w-24 h-24 object-contain  rounded" />
  </div>
`;
        container.appendChild(card);
      });
    }

    loadProducts();

    // Saat user klik produk di homepage
function goToDetail(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "detail.html";
}