let keranjang = [];

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const nama = item.getAttribute('data-nama');
        const harga = item.getAttribute('data-harga');

        // Tampilkan pop-up konfirmasi
        document.getElementById('popup-nama').textContent = nama;
        document.getElementById('popup-harga').textContent = harga;
        document.getElementById('popup').style.display = 'block';

        // Menangani konfirmasi pesanan
        document.getElementById('confirm').onclick = () => {
            const quantity = document.getElementById('quantity').value;
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

    keranjang.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.nama} - Rp ${item.harga} x ${item.quantity}`;
        keranjangDiv.appendChild(div);
    });
}