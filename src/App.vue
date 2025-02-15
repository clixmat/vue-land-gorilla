<template>
    <div class="container">
        <div>
            <PokemonSearch v-model:searchQuery="searchQuery" />
            <PokemonList
                :pokemonList="pokemonList"
                :currentPage="currentPage"
                :totalPages="totalPages"
                :nextUrl="nextUrl"
                :prevUrl="prevUrl"
                @nextPage="nextPage"
                @prevPage="prevPage"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'

import PokemonSearch from './components/PokemonSearch.vue'
import PokemonList from './components/PokemonList.vue'
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
}
</style>
