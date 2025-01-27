import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonDetailsStore = defineStore('pokemonDetails', {
    state: () => ({
        selectedPokemon: null,
    }),
    actions: {
        async fetchPokemonDetails(name) {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                this.selectedPokemon = {
                    id: response.data.id,
                    name: response.data.name,
                    image: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
                    height: response.data.height,
                    weight: response.data.weight,
                    base_experience: response.data.base_experience,
                    abilities: response.data.abilities.map(a => a.ability.name),
                    types: response.data.types.map(t => t.type.name),
                    stats: response.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
                    moves: response.data.moves.map(m => m.move.name),
                };
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
            }
        },

        updatePokemonDetails(updatedPokemon) {
            this.selectedPokemon = { ...updatedPokemon };
        },
    },
});

// todo: fix logic on how to use only pokemonStore.js.
// todo: changes made by user should globally affected.
// todo: solve path issue if user change the pokemon name.