let keranjang = [];

document.querySelectorAll('.Order-button').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const nama = item.getAttribute('data-nama');
        const harga = parseInt(item.getAttribute('data-harga'), 10); // Ubah harga menjadi angka

        // Tampilkan pop-up konfirmasi
        document.getElementById('popup-nama').textContent = nama;
        document.getElementById('popup-harga').textContent = harga;
        document.getElementById('popup').style.display = 'block';

        // Menangani konfirmasi pesanan
        document.getElementById('confirm').onclick = () => {
            const quantity = parseInt(document.getElementById('quantity').value, 10); // Ubah quantity menjadi angka
            if (!quantity || quantity <= 0) {
                alert("Masukkan jumlah yang valid!");
                return;
            }
            // Tambahkan item ke keranjang dengan kuantitas
            keranjang.push({ id, nama, harga, quantity });
            updateKeranjang();
            closePopup();
        };
    });
});

// Fungsi untuk menutup pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Menutup pop-up saat mengklik tanda 'x'
document.querySelector('.close').onclick = closePopup;

// Menutup pop-up saat mengklik di luar pop-up
window.onclick = function(event) {
    if (event.target == document.getElementById('popup')) {
        closePopup();
    }
};

function updateKeranjang() {
    const keranjangDiv = document.getElementById('keranjang');
    keranjangDiv.innerHTML = ''; // Kosongkan keranjang sebelumnya

    let total = 0; // Inisialisasi total belanjaan

    keranjang.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.nama} - Rp ${item.harga.toLocaleString('id-ID')} x ${item.quantity}`;
        keranjangDiv.appendChild(div);

        // Tambahkan ke total belanjaan
        total += item.harga * item.quantity;
    });

    // Tampilkan total belanjaan
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
    keranjangDiv.appendChild(totalDiv);
}
