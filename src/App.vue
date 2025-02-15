<template>
    <div class="container">
        <div>
            <img src="https://lh3.googleusercontent.com/3TSaKxXGo2wT0lu0AyNUBnkk6wkCC2AzOhJyy3JXIPm-AmZ1k9DSAroWeBUyePswCZSs5lVp3mPF7HzUpY9VPlyOV5eddITONINr3WSqLNLm=e365-w512"
                alt="pokemon_logo">
            <PokemonSearch v-model:searchQuery="searchQuery" />
            <PokemonList :pokemonList="pokemonList" :currentPage="currentPage" :totalPages="totalPages"
                :nextUrl="nextUrl" :prevUrl="prevUrl" @nextPage="nextPage" @prevPage="prevPage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'

import PokemonList from './components/PokemonList.vue'
import PokemonSearch from './components/PokemonSearch.vue'
import usePokemon from './composables/usePokemon'

const {
    currentPage,
    fetchPokemon,
    nextPage,
    nextUrl,
    pokemonList,
    prevPage,
    prevUrl,
    searchPokemon,
    searchQuery,
    totalPages,
} = usePokemon()

watch(searchQuery, searchPokemon)
onMounted(() => fetchPokemon())
</script>

<style>
body {
    font-family: 'Roboto', serif;
    margin: 0;
    padding: 0;
}
.container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 32px;
    img {
        display: flex;
        margin: auto;
        padding: 16px;
        width: 200px;
    }
}
</style>
