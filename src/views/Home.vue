<template>
  <div>
    <!-- Komponen Map digunakan di dalam template Home -->
    <Map />
  </div>
</template>

<script>
// Import komponen Map dari folder 'components'
import Map from '../components/Map.vue';

export default {
  name: 'Home', // Nama komponen ini adalah 'Home'
  
  components: {
    // Mendaftarkan komponen Map agar bisa digunakan di dalam template
    Map,
  }
}
</script>
