// Konfigurasi Data
const waNumber = "6281515521739";
const pricePerUnit = 15000;
let userEmail = null;
let cart = [];

// Daftar 30 Tema Buku
const themes = [
    "Dinosaurus Cilik", "Putri Bunga", "Hewan Laut", "Luar Angkasa", 
    "Kelinci Pesta", "Kendaraan Kota", "Peri Hutan", "Donat Lucu",
    "Kucing Menari", "Unicorn Ajaib", "Monster Imut", "Alat Musik",
    "Cita-cita Cilik", "Burung Merpati", "Rumah Boneka", "Salju Dingin",
    "Piknik Sore", "Safari Seru", "Batik Cilik", "Robot Sahabat",
    "Hantu Sahabat", "Taman Bermain", "Super Hero", "Dunia Permen",
    "Pesawat Kertas", "Istana Awan", "Buah Segar", "Abjad Hewan",
    "Angka Pelangi", "Cerita Rakyat"
];

// 1. Inisialisasi Produk
const productGrid = document.getElementById('product-grid');

function renderProducts() {
    themes.forEach((theme, index) => {
        const bgHue = (index * 137) % 360; // Warna pastel unik tiap produk
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-box" style="background-color: hsl(${bgHue}, 80%, 93%)">
                🎨
            </div>
            <h3 class="text-xl font-bold text-gray-700 mb-1">${theme}</h3>
            <p class="text-pink-400 font-bold mb-4">Rp ${pricePerUnit.toLocaleString('id-ID')}</p>
            <button onclick="addToCart('${theme}')" class="btn-add">
                Tambah Pesanan 🎀
            </button>
        `;
        productGrid.appendChild(card);
    });
}

// 2. Logika Keranjang
function addToCart(itemName) {
    if (!userEmail) {
        alert("Silakan Login dengan Gmail dulu ya, Kak! ✨");
        return;
    }
    cart.push(itemName);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const floatingCart = document.getElementById('floating-cart');
    
    cartCount.innerText = `${cart.length} Buku terpilih`;
    
    if (cart.length > 0) {
        floatingCart.classList.remove('cart-hidden');
    } else {
        floatingCart.classList.add('cart-hidden');
    }
}

// 3. Logika Login (Simulasi)
document.getElementById('login-btn').addEventListener('click', () => {
    const email = prompt("Masukkan Email Gmail Anda:");
    if (email && email.includes("@gmail.com")) {
        userEmail = email;
        document.getElementById('login-btn').classList.add('hidden');
        document.getElementById('user-info').classList.remove('hidden');
        document.getElementById('display-name').innerText = `Halo, ${email.split('@')[0]}!`;
    } else {
        alert("Gunakan alamat Gmail yang valid ya!");
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    userEmail = null;
    cart = [];
    updateCartUI();
    document.getElementById('login-btn').classList.remove('hidden');
    document.getElementById('user-info').classList.add('hidden');
});

// 4. Checkout via WhatsApp
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;

    const totalHarga = cart.length * pricePerUnit;
    const daftarBuku = cart.map((item, i) => `${i + 1}. ${item}`).join('%0A');
    
    const text = `Halo Tinta Imajinasi! 🎀%0A%0A` +
                 `Saya ingin memesan paket mewarnai PDF:%0A${daftarBuku}%0A%0A` +
                 `*Total:* Rp ${totalHarga.toLocaleString('id-ID')}%0A` +
                 `*Email Pembeli:* ${userEmail}%0A%0A` +
                 `Mohon info pembayarannya ya! ✨`;

    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
});

// Jalankan fungsi saat halaman dimuat
renderProducts();
