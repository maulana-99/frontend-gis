import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Import view Home
import McdManagement from '../views/McdManagement.vue'; // Import view McdManagement
import Create from '../views/Create.vue'; // Import view Create
import Update from '../views/Update.vue'; // Import view Update
import Login from '../views/Login.vue'; // Import view Login

const routes = [
  { path: '/', component: Home, name: 'Home' }, // Route untuk Home
  { path: '/login', component: Login, name: 'Login' }, // Route untuk Login
  { path: '/mcd-management', component: McdManagement, name: 'McdManagement' }, // Route untuk McdManagement
  { path: '/create', component: Create, name: 'Create' }, // Route untuk Create
  { path: '/update/:id', component: Update, name: 'Update' }, // Route untuk Update dengan parameter id
];

const router = createRouter({
  history: createWebHistory(), // Menggunakan mode history untuk navigasi
  routes, // Daftar route yang telah didefinisikan
});

export default router; // Ekspor router untuk digunakan di aplikasi
