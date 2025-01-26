<template>
    <div class="container py-5">
        <Loader v-if="loading" />

        <div v-else class="card shadow-lg p-4 text-center fade-in">
            <h1 class="text-capitalize fw-bold">{{ pokemon.name }}</h1>
            <div class="d-flex justify-content-center">
                <img :src="pokemon.image" class="pokemon-img" :alt="pokemon.name" />
            </div>

            <!-- Two-Column Layout -->
            <div class="pokemon-info mt-4 d-flex flex-column flex-md-row justify-content-between">
                <!-- Left Column -->
                <div class="pokemon-stats text-md-start text-center">
                    <p class="fs-5"><strong>Height:</strong> {{ pokemon.height }}</p>
                    <p class="fs-5"><strong>Weight:</strong> {{ pokemon.weight }}</p>
                    <p class="fs-5"><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
                </div>

                <!-- Right Column -->
                <div class="pokemon-types text-md-start text-center">
                    <p class="fs-5"><strong>Type(s):</strong>
                        <span v-for="type in pokemon.types" :key="type" class="badge bg-primary mx-1">
                            {{ type }}
                        </span>
                    </p>
                    <p class="fs-5"><strong>Abilities:</strong>
                        <span v-for="ability in pokemon.abilities" :key="ability" class="badge bg-success mx-1">
                            {{ ability }}
                        </span>
                    </p>
                </div>
            </div>

            <!-- Base Stats -->
            <div class="stats-container mt-4">
                <h3 class="fw-bold">Base Stats</h3>
                <div class="row justify-content-center">
                    <div v-for="stat in pokemon.stats" :key="stat.name" class="col-6 col-md-4">
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

            <!-- Moves -->
            <!-- <div class="moves-container mt-4">
                <h3 class="fw-bold">Moves (First 5)</h3>
                <ul class="list-group list-group-flush">
                    <li v-for="move in pokemon.moves.slice(0, 5)" :key="move" class="list-group-item">
                        {{ move }}
                    </li>
                </ul>
            </div> -->

            <!-- Held Items -->
            <!-- <div v-if="pokemon.held_items.length > 0" class="mt-4">
                <h3 class="fw-bold">Held Items</h3>
                <ul class="list-group list-group-flush">
                    <li v-for="item in pokemon.held_items" :key="item" class="list-group-item">
                        {{ item }}
                    </li>
                </ul>
            </div> -->

            <router-link to="/" class="btn btn-outline-primary mt-4">Back to List</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Loader from '../components/Loader.vue';

const route = useRoute();
const pokemon = ref({
    name: '',
    image: '',
    height: '',
    weight: '',
    base_experience: '',
    abilities: [],
    types: [],
    stats: [],
});

const loading = ref(true);

onMounted(async () => {
    window.scrollTo(0, 0);
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);

        pokemon.value = {
            name: response.data.name,
            image: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
            height: response.data.height,
            weight: response.data.weight,
            base_experience: response.data.base_experience,
            abilities: response.data.abilities.map(a => a.ability.name),
            types: response.data.types.map(t => t.type.name),
            stats: response.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
            // moves: response.data.moves.map(m => m.move.name),
            // held_items: response.data.held_items.map(i => i.item.name),
        };

        // Wait until Vue renders the DOM completely before hiding loader
        await nextTick();
    } catch (error) {
        console.error("Error fetching Pokémon details:", error);
    } finally {
        loading.value = false;
    }
});

const abilities = computed(() => pokemon.value.abilities.join(', '));
const types = computed(() => pokemon.value.types.join(', '));
</script>

<style scoped>
.pokemon-img {
    width: 180px;
    height: auto;
}

/* Two-column layout on desktop */
.pokemon-info {
    display: flex;
    flex-direction: column;
}

/* On Desktop: Align items side by side */
@media (min-width: 768px) {
    .pokemon-info {
        flex-direction: row;
        justify-content: space-between;
    }
    
    .pokemon-stats .pokemon-types {
        text-align: left;
    }
}

/* Smooth Fade-in Animation */
.fade-in {
    opacity: 0;
    animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.card {
    max-width: 600px;
    margin: auto;
    border-radius: 15px;
    border: none;
    background: #f8f9fa;
    padding: 20px;
}

.stat-card {
    text-align: center;
    margin-bottom: 10px;
}

.progress {
    height: 20px;
    border-radius: 10px;
    background-color: #e9ecef;
    overflow: hidden;
}

.progress-bar {
    font-weight: bold;
}

@media (max-width: 768px) {
    .pokemon-img {
        width: 140px;
    }
}
</style>
