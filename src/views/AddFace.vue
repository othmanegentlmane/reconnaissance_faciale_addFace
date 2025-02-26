<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Ajouter un Visage</h2>
    <form @submit.prevent="addFaces" class="border p-4 rounded shadow-sm bg-light">
      <!-- Choix entre image unique ou lot d'images -->
      <div class="mb-3">
        <label for="mode" class="form-label">Mode :</label>
        <select v-model="mode" class="form-select" required>
          <option value="single">Image Unique</option>
          <option value="batch">Lot d'Images</option>
        </select>
      </div>
      
      <!-- Afficher le champ Nom seulement en mode "single" -->
      <div v-if="mode === 'single'" class="mb-3">
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

      <!-- Champ Image(s) -->
      <div class="mb-3">
        <label for="image" class="form-label">Image(s) :</label>
        <input
          type="file"
          id="image"
          ref="fileInput"
          class="form-control"
          accept="image/*"
          :multiple="mode === 'batch'"  
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
      mode: "single", 
      message: "",
      error: "",
    };
  },
  methods: {
    async addFaces() {
      this.message = "";
      this.error = "";

      const formData = new FormData();

      
      if (this.mode === "batch") {
        const files = this.$refs.fileInput.files;
        if (files.length === 0) {
          this.error = "Veuillez sélectionner des fichiers.";
          return;
        }
        Array.from(files).forEach((file) => {
          formData.append("files", file);
          formData.append("names", this.name);  // Ajout du nom même en mode lot
        });
      } else {
        // Si mode "unique", on envoie un seul fichier
        formData.append("file", this.$refs.fileInput.files[0]);
        formData.append("name", this.name);
      }

      try {
        let api = "";
        if (this.mode === "single") api = "http://localhost:8000/add_face";
        else api = "http://localhost:8000/add_faces";

        const response = await axios.post(api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

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
