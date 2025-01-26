<template>
    <div class="container py-4">

        <Loader v-if="loading" />

        <div v-else>
            <h1 class="text-center">Pokémon List</h1>
            <input type="text" class="form-control mb-3" placeholder="Search Pokémon..." v-model="searchQuery" />

            <div class="row">
                <div v-for="pokemon in filteredPokemon" :key="pokemon.id" class="col-md-3 col-sm-6 mb-4">
                    <div class="card text-center shadow-sm" @click="goToDetails(pokemon.name)">
                        <div class="image-container">
                            <img :src="pokemon.image" class="pokemon-img" :alt="pokemon.name" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
                            <p class="card-text">Height: {{ pokemon.height }}</p>
                            <p class="card-text">Weight: {{ pokemon.weight }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';

const store = usePokemonStore();
const { pokemons, filteredPokemon } = storeToRefs(store);
const { fetchPokemons } = store;
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
    loading.value = true;
    await fetchPokemons();
    loading.value = false;
});

const searchQuery = storeToRefs(store).searchQuery;

const goToDetails = (name) => {
    router.push(`/pokemon/${name}`);
};
</script>

<style scoped>
.card {
    cursor: pointer;
    transition: transform 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

.card:hover {
    transform: scale(1.05);
}

.image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
}

/* Pokémon Image: Grows based on card size */
.pokemon-img {
    width: 80%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.2s ease-in-out;
}

.card:hover .pokemon-img {
    transform: scale(1.4);
}

/* todo: refactor and extract CSS styles */
</style>
