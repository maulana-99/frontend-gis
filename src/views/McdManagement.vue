<template>
  <div class="mcdonalds-management">
    <div class="header-mcd">
      <div class="header-content">
        <h1>McDonald's Management</h1>
      </div>
      <!-- Tombol logout untuk keluar dari aplikasi -->
      <button @click="logout" class="btn btn-logout">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
    <div class="table-container">
      <!-- Tombol untuk membuat entri McDonald's baru -->
      <div class="create-container">
        <router-link to="/create" class="create-btn">
          <button class="btn btn-primary">
            <i class="fas fa-plus"></i> Create
          </button>
        </router-link>
      </div>
      <!-- Tabel untuk menampilkan daftar McDonald's -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iterasi melalui data McDonald's dan menampilkan setiap entri -->
          <tr v-for="mcd in mcds" :key="mcd.id">
            <td>{{ mcd.name }}</td>
            <td>{{ mcd.latitude }}</td>
            <td>{{ mcd.longitude }}</td>
            <td class="actions-column">
              <div class="actions">
                <!-- Link ke halaman edit untuk entri McDonald's tertentu -->
                <router-link :to="'/update/' + mcd.id" class="action-link">
                  <button class="btn btn-edit">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </router-link>
                <!-- Tombol untuk menghapus entri McDonald's -->
                <button @click="confirmDelete(mcd.id)" class="btn btn-delete">
                  <i class="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'; // Import library js-cookie untuk menyimpan cookie

export default {
  name: 'McdManagement', // Nama komponen ini adalah 'McdManagement'
  data() {
    return {
      mcds: [] // Menyimpan daftar McDonald's
    }
  },
  beforeMount() {
    // Periksa apakah token ada di cookie sebelum komponen dimuat
    const token = Cookies.get('token');
    if (!token) {
      this.$router.push('/login'); // Arahkan ke halaman login jika token tidak ada
    }
  },
  mounted() {
    this.fetchMcDonalds(); // Ambil data McDonald's setelah komponen dimuat
  },
  methods: {
    // Fungsi untuk mengambil data McDonald's dari server
    async fetchMcDonalds() {
      try {
        const response = await fetch('http://localhost:8080/mcdonalds');
        const data = await response.json();
        this.mcds = data.data.mcdonalds; // Simpan data McDonald's dalam variabel mcds
      } catch (error) {
        console.error('Error fetching McDonalds:', error); // Tangani error jika terjadi
      }
    },
    // Fungsi untuk mengkonfirmasi penghapusan McDonald's
    confirmDelete(id) {
      if (window.confirm('Are you sure you want to delete this McDonald?')) {
        this.deleteMcDonalds(id); // Panggil fungsi deleteMcDonalds jika pengguna mengkonfirmasi
      }
    },
    // Fungsi untuk menghapus entri McDonald's
    async deleteMcDonalds(id) {
      try {
        const response = await fetch(`http://localhost:8080/mcdonalds/${id}`, {
          method: 'DELETE' // Metode DELETE untuk menghapus data
        });
        const data = await response.json();
        if (data.success) {
          this.fetchMcDonalds(); // Ambil kembali data McDonald's setelah penghapusan
        } else {
          console.error('Error deleting McDonald:', data.message); // Tangani error jika terjadi
        }
      } catch (error) {
        console.error('Error deleting McDonald:', error); // Tangani error jika terjadi
      }
    },
    // Fungsi untuk logout dan menghapus token dari cookie
    logout() {
      Cookies.remove('token');
      this.$router.push('/login'); // Arahkan ke halaman login setelah logout
    }
  }
}
</script>


<style scoped>
.mcdonalds-management {
  background-color: #7d7d7d;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header-mcd {
  background-color: #333;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.header-content {
  flex: 1;
  display: flex;
  justify-content: center;
}

.btn-logout {
  background-color: #8b0000;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

.table-container {
  background-color: #d5d5d5;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  margin-top: 20px;
}

.create-container {
  margin-bottom: 10px;
  text-align: left;
}

.create-btn .btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #fff;
}

.actions-column {
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.btn-edit {
  background-color: #17a2b8;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 5px;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
}

thead {
  background-color: #BEBEBE;
  color: #fff;
}
</style>
