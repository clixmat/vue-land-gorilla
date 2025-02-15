<template>
    <div>
        <ul>
            <li v-for="pokemon in pokemonList" :key="pokemon.name">
                <span>{{ pokemon.name }}</span>
            </li>
        </ul>
        <button @click="emit('prevPage')" :disabled="!prevUrl" data-testid="prev-button">
            Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="emit('nextPage')" :disabled="!nextUrl" data-testid="next-button">
            Siguiente
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
    currentPage: Number,
    nextUrl: String,
    pokemonList: Array,
    prevUrl: String,
    totalPages: Number,
})

const emit = defineEmits(['nextPage', 'prevPage'])
</script>

<style scoped>
button {
    background-color: #5868d2;
    border-radius: 4px;
    border: none;
    color: #ffffff;
    cursor: pointer;
    height: 44px;
    margin: 5px;
    outline: none;
    padding: 8px 16px;
    width: 100px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin: 16px 0;
    text-transform: capitalize;
}
</style>
