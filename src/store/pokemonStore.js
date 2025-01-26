import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        pokemons: [],
        searchQuery: '',
    }),
    getters: {
        filteredPokemon(state) {
            return state.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }
    },
    actions: {
        async fetchPokemons() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
                const results = response.data.results;

                this.pokemons = await Promise.all(
                    results.map(async (pokemon) => {
                        const details = await axios.get(pokemon.url);
                        return {
                            id: details.data.id,
                            name: details.data.name,
                            image: details.data.sprites.other['official-artwork'].front_default || details.data.sprites.front_default,
                            height: details.data.height,
                            weight: details.data.weight,
                        };
                    })
                );
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        },
    },
});
