<template>
    <div>
        <input v-model="query" @input="emitSearch" placeholder="Buscar Pokémon..." />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    searchQuery: String,
})

const emit = defineEmits(['update:searchQuery'])

const query = ref(props.searchQuery || '')

watch(query, (newValue) => {
    emit('update:searchQuery', newValue)
})

const emitSearch = () => {
    emit('update:searchQuery', query.value)
}
</script>

<style scoped>
input {
    border-radius: 4px;
    border: 1px solid #5868d2;
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    outline: none;
    padding: 16px 8px;
    width: 300px;
}
</style>
