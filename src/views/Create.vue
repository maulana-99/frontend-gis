<template>
  <div class="fk">
    <div class="form-container">
      <button @click="cancel" class="close-button">
        <i class="fas fa-times"></i>
      </button>
      <form @submit.prevent="createMcDonalds">
        <p v-if="message" class="error-message">{{ message }}</p>
        <h2>Create McDonald's</h2>
        <input type="text" id="name" v-model="mcd.name" placeholder="Name" />
        <input type="text" id="latitude" v-model="mcd.latitude" placeholder="Latitude" />
        <input type="text" id="longitude" v-model="mcd.longitude" placeholder="Longitude" />
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
// Komponen CreatePage
export default {
  name: 'CreatePage', // Nama komponen
  data() {
    return {
      mcd: {
        name: '', // Nama McDonald's
        latitude: '', // Latitude McDonald's
        longitude: '' // Longitude McDonald's
      },
      message: '' // Pesan error atau sukses
    }
  },
  methods: {
    async createMcDonalds() {
      // Cek apakah semua field yang diperlukan sudah diisi
      if (!this.mcd.name || !this.mcd.latitude || !this.mcd.longitude) {
        this.message = 'All fields are required';
        return;
      }

      try {
        const mcdData = {
          name: this.mcd.name, // Nama McDonald's
          latitude: parseFloat(this.mcd.latitude), // Latitude McDonald's
          longitude: parseFloat(this.mcd.longitude) // Longitude McDonald's
        };

        const response = await fetch('http://localhost:8080/mcdonalds', {
          method: 'POST', // Metode HTTP POST
          headers: { 'Content-Type': 'application/json' }, // Header permintaan
          body: JSON.stringify(mcdData) // Data yang dikirim dalam format JSON
        });
        if (response.ok) {
          this.$router.push({ name: 'McdManagement' }); // Redirect ke halaman McdManagement
        } else {
          this.message = 'Failed to create McDonalds'; // Pesan error jika gagal
        }
      } catch (error) {
        this.message = 'Error creating McDonalds: ' + error.message; // Pesan error jika ada exception
        console.error('Error creating McDonalds:', error); // Log error ke console
      }
    },
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

h2 {
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

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
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

.close-button:hover {
  color: #fff;
}
</style>
