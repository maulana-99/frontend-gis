<template>
  <div class="fk">
    <div class="form-container">
      <!-- Tombol untuk membatalkan perubahan dan kembali ke halaman sebelumnya -->
      <button @click="cancel" class="close-button">
        <i class="fas fa-times"></i>
      </button>
      <h1>Update McDonald</h1>
      
      <!-- Form untuk memperbarui informasi McDonald's -->
      <form @submit.prevent="updateMcDonald">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="mcd.name" required>
        </div>
        <div>
          <label for="latitude">Latitude:</label>
          <input type="text" id="latitude" v-model="mcd.latitude" required>
        </div>
        <div>
          <label for="longitude">Longitude:</label>
          <input type="text" id="longitude" v-model="mcd.longitude" required>
        </div>
        <!-- Tombol untuk menyimpan perubahan -->
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Update', // Nama komponen ini adalah 'Update'
  data() {
    return {
      // Menyimpan informasi McDonald's yang akan diperbarui
      mcd: {
        name: '',
        latitude: '',
        longitude: ''
      }
    }
  },
  mounted() {
    this.fetchMcDonald(); // Ambil data McDonald's setelah komponen dimuat
  },
  methods: {
    // Fungsi untuk mengambil data McDonald's berdasarkan ID dari URL
    async fetchMcDonald() {
      try {
        const response = await fetch(`http://localhost:8080/mcdonalds/${this.$route.params.id}`);
        const data = await response.json();
        this.mcd = data.data.mcdonalds[0]; // Simpan data McDonald's yang diambil
      } catch (error) {
        console.error('Error fetching McDonald:', error); // Tangani error jika terjadi
      }
    },
    // Fungsi untuk memperbarui data McDonald's
    async updateMcDonald() {
      try {
        // Konversi latitude dan longitude ke tipe angka
        this.mcd.latitude = parseFloat(this.mcd.latitude);
        this.mcd.longitude = parseFloat(this.mcd.longitude);
        
        // Kirim request PUT ke server untuk memperbarui data McDonald's
        const response = await fetch(`http://localhost:8080/mcdonalds/${this.$route.params.id}`, {
          method: 'PUT', // Metode PUT untuk memperbarui data
          headers: {
            'Content-Type': 'application/json' // Tipe konten adalah JSON
          },
          body: JSON.stringify(this.mcd) // Mengirim data McDonald's sebagai JSON
        });
        
        const data = await response.json();
        if (data.success) {
          this.$router.push('/mcd-management'); // Arahkan ke halaman manajemen McDonald's jika berhasil
        } else {
          console.error('Error updating McDonald:', data.message); // Tangani error jika terjadi
        }
      } catch (error) {
        console.error('Error updating McDonald:', error); // Tangani error jika terjadi
      }
    },
    // Fungsi untuk membatalkan perubahan dan kembali ke halaman sebelumnya
    cancel() {
      this.$router.go(-1); // Kembali ke halaman sebelumnya
    }
  }
}
</script>


<style scoped>
.fk {
  color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.form-container {
  background-color: #333;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  max-width: 400px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ddd;
  font-size: 20px;
  cursor: pointer;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 280px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #ddd;
  outline: 1px solid #ddd;
}

button[type="submit"] {
  background-color: #213B6D;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  margin: 20px auto 0;
  display: block;
}

button[type="submit"]:hover {
  background-color: #45a049;
}
</style>