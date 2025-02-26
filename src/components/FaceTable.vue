<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Liste des Visages Enregistrés</h2>
    <div v-if="faces.length > 0" class="text-center mb-4">
      <p>Total des visages : {{ faces.length }}</p>
    </div>

    <!-- Tableau des visages -->
    <div v-if="faces.length > 0" class="border p-4 rounded shadow-sm bg-light">
      <table class="table table-striped">
        <thead class="table-primary">
          <tr>
            <th scope="col" class="text-center">ID</th>
            <th scope="col" class="text-center">Nom</th>
            <th scope="col" class="text-center">Image</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(face, index) in paginatedFaces" :key="index">
            <td class="text-center">{{ face.id + 1 }}</td>
            <td class="text-center">{{ face.name }}</td>
            <td class="text-center">
              <img
                :src="'data:image/jpeg;base64,' + face.image"
                alt="Image du visage"
                class="img-thumbnail"
                width="100"
              />
            </td>
            <td class="text-center">
              <div class="d-flex justify-content-center align-items-center">
                <button @click="confirmDelete(face.id)" class="btn btn-danger">
                  Supprimer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                    />
                    <path
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="d-flex justify-content-center mt-4">
        <button
          class="btn btn-primary"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Précédent
        </button>
        <span class="mx-3">Page {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="btn btn-primary"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Suivant
        </button>
      </div>
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

    <!-- Message de succès -->
    <div v-if="successMessage" class="alert alert-success mt-4" role="alert">
      {{ successMessage }}
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
      successMessage: null,
      currentPage: 1,
      itemsPerPage: 5, // Nombre d'éléments par page
    };
  },
  computed: {
    // Nombre total de pages
    totalPages() {
      return Math.ceil(this.faces.length / this.itemsPerPage);
    },
    // Faces à afficher sur la page actuelle
    paginatedFaces() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.faces.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.fetchFaces();
  },
  methods: {
    async fetchFaces() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:8000/faces1");
        this.faces = response.data;
      } catch (error) {
        this.error = "Erreur lors de la récupération des visages.";
      } finally {
        this.loading = false;
      }
    },
    confirmDelete(faceId) {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer ce visage ?")) {
        this.deleteFace(faceId);
      }
    },
    async deleteFace(faceId) {
      this.loading = true;
      this.error = null;
      this.successMessage = null; // Réinitialiser le message de succès
      try {
        // Appel à l'API pour supprimer le visage
        await axios.delete(`http://localhost:8000/reset_database/${faceId}`);
        // Afficher le message de succès
        this.successMessage = "Visage supprimé avec succès.";
        // Recharger la liste des visages après la suppression
        this.fetchFaces();
      } catch (error) {
        this.error = "Erreur lors de la suppression du visage.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.table {
  border-radius: 10px;
  overflow: hidden;
}
.img-thumbnail {
  object-fit: cover;
}
</style>
