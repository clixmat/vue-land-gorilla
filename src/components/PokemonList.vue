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
        <p>Página {{ currentPage }} de {{ totalPages }}</p>
        <button @click="emit('nextPage')" :disabled="!nextUrl" data-testid="next-button">
            Siguiente
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

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
span {
    font-size: 18px;
}
button {
    background-color: #5868d2;
    border-radius: 4px;
    border: none;
    color: #ffffff;
    cursor: pointer;
    height: 44px;
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
p {
    margin: 16px;
    display: inline-block;
}
</style>
