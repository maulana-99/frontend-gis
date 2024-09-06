<template>
  <div class="fk">
    <div class="form-container">
      <!-- Tombol untuk membatalkan login dan kembali ke halaman sebelumnya -->
      <button @click="cancel" class="close-button">
        <i class="fas fa-times"></i>
      </button>
      <h1>Login</h1>
      
      <!-- Form login dengan event @submit.prevent untuk mencegah reload halaman -->
      <form @submit.prevent="login">
        <!-- Pesan error jika login gagal -->
        <p v-if="message" class="error-message">{{ message }}</p>
        
        <!-- Input untuk username -->
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" required>
        </div>
        
        <!-- Input untuk password -->
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        
        <!-- Tombol submit untuk login -->
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'; // Import library js-cookie untuk menyimpan cookie

export default {
  data() {
    return {
      // Menyimpan input user untuk username dan password
      user: {
        username: '',
        password: ''
      },
      // Menyimpan pesan error atau notifikasi
      message: ''
    };
  },
  methods: {
    // Fungsi login untuk mengirim data username dan password ke server
    async login() {
      // Validasi jika username atau password tidak diisi
      if (!this.user.username || !this.user.password) {
        this.message = 'All fields are required';
        return;
      }

      try {
        // Mengirim request ke server untuk login
        const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST', // Metode POST untuk mengirim data
          headers: {
            'Content-Type': 'application/json' // Tipe konten adalah JSON
          },
          body: JSON.stringify(this.user) // Mengirim data user sebagai JSON
        });

        // Jika respons tidak ok, tampilkan pesan error
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            this.message = errorData.message || 'Username or password is incorrect';
          } else {
            this.message = 'Username or password is incorrect';
          }
          throw new Error(this.message); // Lempar error jika login gagal
        }

        // Jika login berhasil, dapatkan token dari respons
        const data = await response.json();
        console.log('Login successful:', data);

        const token = data.token; // Simpan token
        Cookies.set('token', token, { expires: 1 }); // Simpan token di cookie dengan waktu kedaluwarsa 1 hari

        this.message = ''; // Kosongkan pesan error
        this.$router.push('/mcd-management'); // Arahkan ke halaman manajemen McDonald's
      } catch (error) {
        console.error('Error:', error); // Menampilkan error di konsol
      }
    },
    // Fungsi untuk membatalkan login dan kembali ke halaman utama
    cancel() {
      this.$router.push('/'); // Arahkan ke halaman utama
    }
  }
};
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
  position: relative; /* Add this line */
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

input[type="text"], input[type="password"] {
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
</style>
