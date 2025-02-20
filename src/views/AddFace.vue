<template>
    <div class="container py-4">
      <h2 class="text-center mb-4">Ajouter un Visage</h2>
      <form @submit.prevent="addFace" class="border p-4 rounded shadow-sm bg-light">
        <!-- Champ Nom -->
        <div class="mb-3">
          <label for="name" class="form-label">Nom :</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control"
            placeholder="Entrez un nom"
            required
          />
        </div>
        <!-- Champ Image -->
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
        <!-- Bouton Ajouter -->
        <button type="submit" class="btn btn-primary w-100">
          Ajouter
        </button>
      </form>
  
      <!-- Message de succès -->
      <div v-if="message" class="alert alert-success mt-4" role="alert">
        {{ message }}
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
    name: "AddFace",
    data() {
      return {
        name: "",
        message: "",
        error: "",
      };
    },
    methods: {
      async addFace() {
        this.message = "";
        this.error = "";
  
        try {
          const formData = new FormData();
          formData.append("name", this.name);
          formData.append("file", this.$refs.fileInput.files[0]);
  
          const response = await axios.post(
            "http://localhost:8000/add_face",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
  
          this.message = response.data.message;
          this.name = "";
          this.$refs.fileInput.value = null;
        } catch (err) {
          this.error = err.response?.data?.detail || "Une erreur est survenue.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optionnel : Styles personnalisés supplémentaires */
  </style>
  