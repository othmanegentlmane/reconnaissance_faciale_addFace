<template>
    <div>
      <Navbar />
      
      <div class="content">
        <FaceTable v-if="$route.path === '/'"/>
        <!-- Contenu des routes enfants -->
        <router-view />
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import FaceTable from '../components/FaceTable.vue';
  
  export default {
    name: 'MainPage',
    components: {
      Navbar,FaceTable
    },
  };
  </script>
  
  <style scoped>
  .content {
    padding: 20px;
  }
  </style>
  