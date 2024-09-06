<template>
  <div>
    <header class="header">
      <!-- Tombol untuk mendapatkan lokasi pengguna -->
      <button class="location-button" @click="locateUser">Get Your Location</button>
      <!-- Tombol untuk menuju halaman login -->
      <button class="login-button" @click="goToLogin">Login</button>
    </header>
    <!-- Elemen untuk menampilkan peta -->
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'; // Import library Leaflet untuk menampilkan peta

// Fungsi untuk menghitung jarak menggunakan rumus Haversine
function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180; // Mengubah derajat ke radian
  }
  
  var lat1 = coords1[0];
  var lon1 = coords1[1];
  var lat2 = coords2[0];
  var lon2 = coords2[1];
  var R = 6371; // Radius bumi dalam kilometer
  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  
  // Menghitung jarak antara dua koordinat
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  
  return d; // Mengembalikan jarak dalam kilometer
}

// Fungsi untuk memuat data McDonald's dan menambahkannya ke peta
function loadMcDonalds(userCoords, map) {
  fetch('http://localhost:8080/mcdonalds') // Mengambil data McDonald's dari API
    .then(response => response.json()) // Mengubah respons menjadi JSON
    .then(data => {
      data.data.mcdonalds.forEach(mcd => {
        var mcdCoords = [mcd.latitude, mcd.longitude]; // Koordinat McDonald's
        var distance = haversineDistance(userCoords, mcdCoords).toFixed(2); // Menghitung jarak pengguna dengan McDonald's
        
        // Menambahkan marker McDonald's ke peta dengan pop-up berisi nama dan jarak
        L.marker(mcdCoords)
          .addTo(map)
          .bindPopup(`<b>${mcd.name}</b><br>Distance: ${distance} km`);
      });
    })
    .catch(error => console.error('Error loading McDonalds:', error)); // Menangani kesalahan jika gagal memuat data
}

export default {
  name: 'Map',
  mounted() {
    // Inisialisasi peta dengan pusat awal di koordinat [0, 0] dan zoom level 2
    this.map = L.map('map').setView([0, 0], 2);
    
    // Menambahkan tile layer dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
    // Memanggil fungsi untuk menemukan lokasi pengguna
    this.locateUser();
  },
  methods: {
    // Fungsi untuk mendapatkan lokasi pengguna
    locateUser() {
      if (navigator.geolocation) { // Mengecek apakah geolokasi didukung
        navigator.geolocation.getCurrentPosition(position => {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var userCoords = [latitude, longitude];
          
          // Mengubah tampilan peta berdasarkan koordinat pengguna
          this.map.setView(userCoords, 15);
          
          // Menambahkan marker di lokasi pengguna
          L.marker(userCoords)
            .addTo(this.map)
            .bindPopup("You are here") // Menampilkan pop-up pada marker
            .openPopup();
          
          // Memuat data McDonald's di sekitar lokasi pengguna
          loadMcDonalds(userCoords, this.map);
        }, () => {
          alert("Unable to retrieve your location."); // Jika gagal mendapatkan lokasi pengguna
        });
      } else {
        alert("Geolocation is not supported by your browser."); // Jika browser tidak mendukung geolokasi
      }
    },
    // Fungsi untuk berpindah ke halaman login
    goToLogin() {
      this.$router.push('/login'); // Mengarahkan ke route /login
    }
  }
}
</script>

<style>
#map {
  height: calc(100vh - 50px);
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  height: 50px;
}

.location-button,
.login-button {
  padding: 8px 16px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.location-button:hover,
.login-button:hover {
  background-color: #777;
}
</style>
