<template>
    <div class="container py-4">
      <h2 class="text-center mb-4">Reconnaître un Visage</h2>
      <form @submit.prevent="recognizeFace" class="border p-4 rounded shadow-sm bg-light">
        <div class="mb-3">
          <label for="image" class="form-label">Image :</label>
          <input
            type="file"
            id="image"
            ref="fileInput"
            class="form-control"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          Reconnaître
        </button>
      </form>
  
      <!-- Spinner de chargement -->
      <div v-if="loading" class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
  
      <!-- Résultat -->
      <div v-if="annotatedImage && !loading" class="mt-4 text-center">
        <h3 class="mb-3">Résultat :</h3>
        <img :src="annotatedImage" alt="Annotated Result" class="img-fluid rounded border" />
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
    name: "AppReconnaissance",
    data() {
      return {
        annotatedImage: null,
        error: "",
        loading: false, // État pour le chargement
      };
    },
    methods: {
      async recognizeFace() {
        this.annotatedImage = null;
        this.error = "";
        this.loading = true; // Activer le spinner
  
        try {
          const formData = new FormData();
          formData.append("file", this.$refs.fileInput.files[0]);
  
          const response = await axios.post("http://localhost:8000/recognize2", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            responseType: "blob",
          });
          console.log(response.data);
          
          this.annotatedImage = URL.createObjectURL(response.data);
        } catch (err) {
          this.error = err.response?.data?.detail || "Une erreur est survenue.";
        } finally {
          this.loading = false; // Désactiver le spinner
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optionnel : Personnalisation supplémentaire pour le spinner */
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  </style>
  