<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Liste des Visages Enregistrés</h2>

    <!-- Tableau des visages -->
    <div v-if="faces.length > 0" class="border p-4 rounded shadow-sm bg-light">
      <table class="table table-striped">
        <thead class="table-primary">
          <tr>
            <th scope="col" class="text-center">ID</th>
            <th scope="col" class="text-center">Nom</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(face, index) in faces" :key="index">
            <td class="text-center">{{ face.id + 1 }}</td>
            <td class="text-center">{{ face.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucun visage n'est enregistré -->
    <div v-else class="alert alert-warning text-center">
      Aucun visage enregistré pour le moment.
    </div>

    <!-- Spinner de chargement -->
    <div v-if="loading" class="d-flex justify-content-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
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
  data() {
    return {
      faces: [],
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchFaces();
  },
  methods: {
    async fetchFaces() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:8000/faces");
        this.faces = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des visages.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
  
  <style scoped>
/* Ajustement du style pour correspondre à ton composant */
.table {
  border-radius: 10px;
  overflow: hidden;
}
</style>
  