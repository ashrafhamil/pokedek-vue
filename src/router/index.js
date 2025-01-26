import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';
import PokemonDetails from '../views/PokemonDetails.vue';

const routes = [
    { path: '/', component: PokemonList },
    { path: '/pokemon/:name', component: PokemonDetails, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
