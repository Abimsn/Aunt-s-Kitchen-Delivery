let keranjang = [];

        document.querySelectorAll('.Order-button').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                const nama = item.getAttribute('data-nama');
                const harga = parseInt(item.getAttribute('data-harga'), 10);

                document.getElementById('chart-nama').textContent = nama;
                document.getElementById('chart-harga').textContent = harga;
                document.getElementById('chart').style.display = 'block';

                document.getElementById('confirm').onclick = () => {
                    const quantity = parseInt(document.getElementById('quantity').value, 10);
                    if (!quantity || quantity <= 0) {
                        alert("Masukkan jumlah yang valid!");
                        return;
                    }
                    keranjang.push({ id, nama, harga, quantity });
                    updateKeranjang();
                    closechart();
                };
            });
        });

        document.getElementById('pembayaran').onclick = () => {
            localStorage.setItem('keranjang', JSON.stringify(keranjang));
            
            window.location.href = 'pembayaran.html';
        };

        function closechart() {
            document.getElementById('chart').style.display = 'none';
        }

        document.querySelector('.close').onclick = closechart;

        window.onclick = function (event) {
            if (event.target == document.getElementById('chart')) {
                closechart();
            }
        };

        function updateKeranjang() {
            const keranjangDiv = document.getElementById('isi-keranjang');
            keranjangDiv.innerHTML = '';

            let total = 0;

            keranjang.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'keranjang-item';

                const itemText = document.createElement('span');
                itemText.textContent = `${item.nama} - Rp ${item.harga.toLocaleString('id-ID')} x ${item.quantity}`;
                div.appendChild(itemText);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Hapus';
                deleteButton.className = 'hapus-button';
                deleteButton.onclick = () => {
                    keranjang.splice(index, 1);
                    updateKeranjang();
                };
                div.appendChild(deleteButton);

                keranjangDiv.appendChild(div);

                total += item.harga * item.quantity;
            });

            if (keranjang.length === 0) {
                keranjangDiv.innerHTML = '<p>Keranjang kosong</p>';
            } else {
                const totalDiv = document.createElement('div');
                totalDiv.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
                keranjangDiv.appendChild(totalDiv);
            }

            const jumlahItem = keranjang.length;
            document.getElementById('jumlah-item').textContent = jumlahItem;
        }

        function showKeranjangPopup() {
            document.getElementById('popup-keranjang').style.display = 'block';
        }

        function closeKeranjangPopup() {
            document.getElementById('popup-keranjang').style.display = 'none';
        }

        document.querySelector('.close-keranjang').onclick = closeKeranjangPopup;

        window.onclick = function (event) {
            if (event.target == document.getElementById('popup-keranjang')) {
                closeKeranjangPopup();
            }
        };