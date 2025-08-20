<script setup lang="ts">
import { ref } from "vue"
import { fetchCountries } from "./services/countries"
import type { ICountry, Region } from "./types"

const countries = ref<ICountry[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const showModal = ref(false)

const searchName = ref("")
const selectedRegion = ref<Region | "">("")

const regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

async function loadCountries() {
  loading.value = true
  error.value = null
  countries.value = []
  try {
    countries.value = await fetchCountries(
      searchName.value || undefined,
      selectedRegion.value || undefined
    )
    showModal.value = true
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div class="page-container">
    <!-- Conteúdo principal centralizado -->
    <div class="content-card">
      <h1 class="text-3xl font-bold mb-6 text-center text-white">Lista de Países</h1>

      <div class="flex flex-wrap gap-4 justify-center mb-6">
        <input
          v-model="searchName"
          placeholder="Pesquisar por nome..."
          class="border px-4 py-2 rounded min-w-[200px]"
        />
        <select v-model="selectedRegion" class="border px-4 py-2 rounded">
          <option value="">Todas as regiões</option>
          <option v-for="r in regions" :key="r" :value="r">{{ r }}</option>
        </select>
        <button @click="loadCountries" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
          Pesquisar
        </button>
      </div>
    </div>

    <!-- Modal com pop-up acima do conteúdo -->
    <transition name="fade">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-card">
          <button @click="closeModal" class="close-button">&times;</button>
          <h2 class="text-2xl font-bold mb-4">Resultados da pesquisa</h2>

          <div v-if="loading" class="text-center">Carregando...</div>
          <div v-else-if="error" class="text-red-600">{{ error }}</div>
          <div v-else>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              <li v-for="c in countries" :key="c.name.common" class="p-4 border rounded shadow flex items-center gap-4">
                <img :src="c.flags.png" alt="flag" class="w-16 h-12 object-cover" />
                <div>
                  <h3 class="font-semibold">{{ c.name.common }}</h3>
                  <p>Região: {{ c.region }}</p>
                  <p>População: {{ c.population.toLocaleString() }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Página com background colorido */
.page-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #77ff6b, #15ff00);
  padding: 2rem;
}

/* Card centralizado com conteúdo */
.content-card {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

/* Modal sobrepondo o conteúdo */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  z-index: 50;
}

.modal-card {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

/* Botão de fechar */
.close-button {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 1.5rem;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
}

/* Animação fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
