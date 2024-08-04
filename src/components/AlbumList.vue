<template>
  <div>
    <h2>Album List</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">Error fetching albums: {{ error }}</div>
    <ul v-if="!loading && !error">
      <li v-for="album in albums" :key="album.id">
        {{ album.title }} by {{ album.artist }} ({{ album.price }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AlbumList',
  data() {
    return {
      albums: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchAlbums();
  },
  methods: {
    async fetchAlbums() {
      try {
        const response = await fetch('http://localhost:8080/albums');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.albums = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
.error {
  color: red;
}
</style>
