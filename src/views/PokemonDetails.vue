<template>
    <div class="container py-5">
        <Loader v-if="loading" />

        <div v-else-if="selectedPokemon" class="card shadow-lg p-4 text-center fade-in">
            <h1 class="text-capitalize fw-bold">{{ selectedPokemon.name }}</h1>
            <div class="d-flex justify-content-center">
                <img :src="selectedPokemon.image" class="pokemon-img" :alt="selectedPokemon.name" />
            </div>

            <!-- Two-Column Layout -->
            <div class="pokemon-info mt-4 d-flex flex-column flex-md-row justify-content-between">
                <div class="pokemon-stats text-md-start text-center">
                    <p class="fs-5"><strong>Height:</strong> {{ selectedPokemon.height }}</p>
                    <p class="fs-5"><strong>Weight:</strong> {{ selectedPokemon.weight }}</p>
                    <p class="fs-5"><strong>Base Experience:</strong> {{ selectedPokemon.base_experience }}</p>
                </div>

                <div class="pokemon-types text-md-end text-center">
                    <p class="fs-5"><strong>Type(s):</strong>
                        <span v-for="type in selectedPokemon.types" :key="type" class="badge bg-primary mx-1">
                            {{ type }}
                        </span>
                    </p>
                    <p class="fs-5"><strong>Abilities:</strong>
                        <span v-for="ability in selectedPokemon.abilities" :key="ability" class="badge bg-success mx-1">
                            {{ ability }}
                        </span>
                    </p>
                </div>
            </div>

            <!-- Base Stats with Progress Bars -->
            <div class="stats-container my-4">
                <h3 class="fw-bold">Base Stats</h3>
                <div class="row justify-content-center">
                    <div v-for="stat in selectedPokemon.stats" :key="stat.name" class="col-12 col-md-6">
                        <div class="stat-card">
                            <strong>{{ stat.name.toUpperCase() }}</strong>
                            <div class="progress">
                                <div class="progress-bar bg-info" role="progressbar"
                                    :style="{ width: stat.value + '%' }" :aria-valuenow="stat.value" aria-valuemin="0"
                                    aria-valuemax="150">
                                    {{ stat.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Moves Section -->
            <div class="moves-container my-2">
                <h3 class="fw-bold text-center">Top 5 Moves</h3>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                    <span v-for="move in selectedPokemon.moves.slice(0, 5)" :key="move" class="badge move-badge">
                        {{ move }}
                    </span>
                </div>
            </div>

            <!-- Edit Button -->
            <button class="btn btn-warning mt-3" @click="showEditModal = true">Edit Pokémon</button>

            <!-- Reusable Edit Modal Component -->
            <EditPokemonModal v-if="showEditModal" :pokemon="editablePokemon" @update="updatePokemonDetails"
                @close="showEditModal = false" />

            <router-link to="/" class="btn btn-outline-primary mt-4">Back to List</router-link>
        </div>

        <div v-else class="text-center">
            <p class="fs-5">No Pokémon data found.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { usePokemonDetailsStore } from '../store/pokemonDetailsStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import Loader from '../components/Loader.vue';
import EditPokemonModal from '../components/EditPokemonModal.vue';
import '../assets/PokemonDetails.css';

const route = useRoute();
const store = usePokemonDetailsStore();
const { selectedPokemon } = storeToRefs(store);
const { fetchPokemonDetails, updatePokemonDetails } = store;

const loading = ref(true);
const showEditModal = ref(false);
const editablePokemon = ref({});

onMounted(async () => {
    window.scrollTo(0, 0);
    loading.value = true;
    await fetchPokemonDetails(route.params.name);
    await nextTick();
    loading.value = false;
});

// Watch for selectedPokemon changes and update editablePokemon
watch(selectedPokemon, (newPokemon) => {
    if (newPokemon) {
        editablePokemon.value = { ...newPokemon };
    }
}, { immediate: true });
</script>

<style scoped></style>
