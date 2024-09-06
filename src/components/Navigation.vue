<template>
  <nav class="nav-bar">
    <ul class="nav-list">
      <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
      <li class="nav-item"><router-link class="nav-link" to="/mcd-management">McDonald's Management</router-link></li>
    </ul>
  </nav>
</template> 

<script>
// Komponen Navigation
export default {
  name: 'Navigation', // Nama komponen
}
</script>

<style>
.nav-bar {
  background-color: #333;
  padding: 10px 20px;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-right: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #555;
}
</style>
