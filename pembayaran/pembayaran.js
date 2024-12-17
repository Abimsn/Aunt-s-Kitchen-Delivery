let map, geocoder, marker;
let totalHarga = 0;

// Inisialisasi Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -6.200000, lng: 106.816666 }, // Jakarta
        zoom: 13,
    });

    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker({
        map: map,
        position: { lat: -6.200000, lng: 106.816666 },
        draggable: true,
    });

    marker.addListener("dragend", () => {
        const position = marker.getPosition();
        console.log(`Lat: ${position.lat()}, Lng: ${position.lng()}`);
    });
}

// Tambahkan menu ke daftar pesanan
document.getElementById("add-menu").addEventListener("click", () => {
    const menuSelect = document.getElementById("menu-select");
    const selectedOption = menuSelect.options[menuSelect.selectedIndex];
    const harga = parseInt(selectedOption.value);

    // Perbarui daftar pesanan
    const orderList = document.getElementById("order-list");
    const listItem = document.createElement("li");
    listItem.textContent = selectedOption.text;
    orderList.appendChild(listItem);

    // Perbarui total harga
    totalHarga += harga;
    document.getElementById("total-price").textContent = totalHarga.toLocaleString("id-ID");
});

// Cari lokasi berdasarkan alamat
document.getElementById("find-location").addEventListener("click", () => {
    const address = document.getElementById("address-input").value;
    if (!address) {
        alert("Masukkan alamat pengantaran!");
        return;
    }

    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            const location = results[0].geometry.location;
            map.setCenter(location);
            marker.setPosition(location);
        } else {
            alert("Geocode gagal: " + status);
        }
    });
});
