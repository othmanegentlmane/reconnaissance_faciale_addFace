<template>
    <nav class="navbar navbar-expand-lg text-white shadow-md" style="background-color: #e3f2fd;">
      <div class="container-fluid">
        <img src="@/assets/RF.jpg" alt="Logo" class="logo-image mr-4" />
        <router-link class="navbar-brand" to="/">Reconnaissance Faciale</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/add-face" class="nav-link">Add Face</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reconnaissance" class="nav-link">Reconnaissance Image</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/video-reconnaissance" class="nav-link">Reconnaissance Video</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AppNavbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 1rem;
  }
  
  .logo-image {
    width: 40px; /* Réduisez la largeur ici */
    height: auto; /* Ajuste automatiquement la hauteur pour conserver les proportions */
    object-fit: contain; /* Préserve les proportions de l'image */
  }
  
  .navbar-list {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  
  .navbar-item {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  
  .navbar-item:hover {
    text-decoration: underline;
  }
  </style>
  