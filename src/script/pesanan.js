function rupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

async function loadCheckoutProduct() {
  const pesanan = JSON.parse(localStorage.getItem('pesanan')) || [];
  
  if (pesanan.length === 0) {
    document.getElementById('product').innerHTML = "Tidak ada pesanan!";
    return;
  }

  const container = document.getElementById('product');
  container.innerHTML = "";

  let subtotal = 0;
  const ongkir = 10000;

  for (const item of pesanan) {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
      const data = await res.json();
      const harga = data.price * 16000;
      const totalHargaProduk = harga * item.quantity;

      subtotal += totalHargaProduk;

      container.innerHTML += `
        <div class="flex gap-4 mb-4 border-b pb-4">
          <img src="${data.image}" alt="${data.title}" class="w-24 h-24 object-contain bg-gray-100 p-2 rounded">
          <div>
            <p class="font-semibold">${data.title}</p>
            <p class="text-orange-600 font-bold">${rupiah(harga)}</p>
            <p>Qty: ${item.quantity}</p>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Gagal load produk:', error);
    }
  }

  document.getElementById('subtotal').textContent = rupiah(subtotal);
  document.getElementById('ongkir').textContent = rupiah(ongkir);
  document.getElementById('total').textContent = rupiah(subtotal + ongkir);
}

document.addEventListener("DOMContentLoaded", loadCheckoutProduct);
