document.addEventListener('DOMContentLoaded', () => {
    // data keranjang dari localStorage
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const orderList = document.getElementById("order-list");
    let totalHarga = 0;

    // Memperbarui total harga
    function updateTotal() {
        document.getElementById("total-price").textContent = totalHarga.toLocaleString("id-ID");
    }

    // Isi keranjang
    keranjang.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.nama} - Rp ${item.harga.toLocaleString('id-ID')} x ${item.quantity}`;

        // Tombol hapus
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => {
            // Menghapus item dari keranjang
            keranjang.splice(index, 1);
            localStorage.setItem('keranjang', JSON.stringify(keranjang)); // Menyimpan ke localStorage
            orderList.removeChild(listItem); // Hapus item dari tampilan
            totalHarga -= item.harga * item.quantity; // mengurangi total harga
            updateTotal(); // update total harga
        };

        listItem.appendChild(deleteButton); // Tambahkan tombol hapus ke list keranjang
        orderList.appendChild(listItem); // Tambahkan ke order list di keranjang
        totalHarga += item.harga * item.quantity; // Menghitung total harga
    });

    // total harga
    updateTotal();

    // pembayaran
    document.getElementById("confirm-payment").onclick = () => {
        alert("Pembayaran berhasil! Terima kasih telah berbelanja.");
        localStorage.removeItem('keranjang'); // Hapus keranjang setelah pembayaran
        window.location.href = 'index.html'; // Kembali ke halaman utama
    };
});