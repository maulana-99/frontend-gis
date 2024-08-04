<template>
  <div>
    <h1>Welcome to the Album Store</h1>
    <AlbumList />
  </div>
</template>

<script>
import AlbumList from '@/components/AlbumList.vue';

export default {
  name: 'HomePage', // Updated to multi-word
  components: {
    AlbumList
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
