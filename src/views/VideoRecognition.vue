<template>
    <div class="container py-4">
      <h2 class="text-center mb-4">Reconnaître un Visage dans une Vidéo</h2>
      <form @submit.prevent="recognizeVideo" class="border p-4 rounded shadow-sm bg-light">
        <div class="mb-3">
          <label for="video" class="form-label">Vidéo :</label>
          <input
            type="file"
            id="video"
            ref="fileInput"
            class="form-control"
            accept="video/*"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          Analyser la Vidéo
        </button>
      </form>
  
      <!-- Spinner de chargement -->
      <div v-if="loading" class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
  
      <!-- Résultat -->
      <div v-if="results.length && !loading" class="mt-4">
        <h3 class="mb-3">Résultats :</h3>
        <div class="row">
          <div
            v-for="(result, index) in results"
            :key="index"
            class="col-md-4 mb-4 d-flex flex-column align-items-center"
          >
            <p><strong>Nom :</strong> {{ result.name }}</p>
            <p><strong>Temps :</strong> {{ result.timestamp }} secondes</p>
            <img
              :src="'data:image/jpeg;base64,' + result.frame"
              alt="Frame"
              class="img-fluid img-thumbnail rounded"
            />
          </div>
        </div>
      </div>
  
      <!-- Message d'erreur -->
      <div v-if="error" class="alert alert-danger mt-4" role="alert">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AppReconnaissanceVideo",
    data() {
      return {
        results: [],
        error: "",
        loading: false,
      };
    },
    methods: {
      async recognizeVideo() {
        this.results = [];
        this.error = "";
        this.loading = true;
  
        try {
          const formData = new FormData();
          formData.append("file", this.$refs.fileInput.files[0]);
  
          const response = await axios.post("http://localhost:8000/recognize_video", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
  
          this.results = response.data.results;
        } catch (err) {
          this.error = err.response?.data?.detail || "Une erreur est survenue.";
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  
  /* Optionnel : Personnalisation de la taille des images */
  .img-thumbnail {
    max-height: 150px; /* Vous pouvez ajuster la taille à votre convenance */
    object-fit: cover;
  }
  </style>
  