<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h3>Edit Pokémon Details</h3>

            <label>Name:</label>
            <input type="text" v-model="editablePokemon.name" class="form-control mb-2" />

            <label>Height:</label>
            <input type="number" v-model="editablePokemon.height" class="form-control mb-2" />

            <label>Weight:</label>
            <input type="number" v-model="editablePokemon.weight" class="form-control mb-2" />

            <label>Base Experience:</label>
            <input type="number" v-model="editablePokemon.base_experience" class="form-control mb-2" />

            <button class="btn btn-success mb-2" @click="saveChanges">Save</button>
            <button class="btn btn-secondary" @click="$emit('close')">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    pokemon: Object,
});
const emit = defineEmits(['update', 'close']);

// Create a deep copy of the Pokémon object
const editablePokemon = ref(JSON.parse(JSON.stringify(props.pokemon)));

// Watch for changes in props.pokemon and update editablePokemon accordingly
watch(
    () => props.pokemon,
    (newPokemon) => {
        editablePokemon.value = JSON.parse(JSON.stringify(newPokemon));
    },
    { immediate: true, deep: true }
);

// Emit updated data and close modal
const saveChanges = () => {
    emit('update', editablePokemon.value);
    emit('close');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 350px;
    text-align: center;
}

.modal-content input {
    width: 100%;
    padding: 8px;
}
</style>
