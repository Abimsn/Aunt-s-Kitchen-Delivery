document.addEventListener("DOMContentLoaded", () => {
    const totalHargaEl = document.getElementById("total-harga");
    const hitungTotalButton = document.getElementById("hitung-total");

    hitungTotalButton.addEventListener("click", () => {
        const menuItems = document.querySelectorAll(".menu-item");
        let total = 0;

        menuItems.forEach(item => {
            if (item.checked) {
                total += parseInt(item.dataset.harga, 10);
            }
        });

        totalHargaEl.textContent = total.toLocaleString("id-ID");
    });
});
