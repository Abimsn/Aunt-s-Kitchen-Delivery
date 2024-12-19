document.addEventListener('DOMContentLoaded', () => {
    // Ambil data keranjang dari localStorage
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const orderList = document.getElementById("order-list");
    let totalHarga = 0;

    // Fungsi untuk memperbarui tampilan total harga
    function updateTotal() {
        document.getElementById("total-price").textContent = totalHarga.toLocaleString("id-ID");
    }

    // Menampilkan isi keranjang
    keranjang.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.nama} - Rp ${item.harga.toLocaleString('id-ID')} x ${item.quantity}`;

        // Tambahkan tombol hapus
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => {
            // Hapus item dari keranjang
            keranjang.splice(index, 1);
            localStorage.setItem('keranjang', JSON.stringify(keranjang)); // Simpan kembali ke localStorage
            orderList.removeChild(listItem); // Hapus item dari tampilan
            totalHarga -= item.harga * item.quantity; // Kurangi total harga
            updateTotal(); // Perbarui total harga
        };

        listItem.appendChild(deleteButton); // Tambahkan tombol hapus ke list item
        orderList.appendChild(listItem); // Tambahkan list item ke order list
        totalHarga += item.harga * item.quantity; // Hitung total harga
    });

    // Menampilkan total harga
    updateTotal();

    // Konfirmasi pembayaran
    document.getElementById("confirm-payment").onclick = () => {
        alert("Pembayaran berhasil! Terima kasih telah berbelanja.");
        localStorage.removeItem('keranjang'); // Hapus keranjang setelah pembayaran
        window.location.href = 'index.html'; // Kembali ke halaman utama
    };
});