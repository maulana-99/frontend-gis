import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; // Updated to new name

const routes = [
  {
    path: '/',
    name: 'HomePage', // Updated to new name
    component: HomePage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
