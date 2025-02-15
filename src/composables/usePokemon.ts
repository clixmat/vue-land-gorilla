import { computed, ref } from 'vue'

interface Pokemon {
    name: string
}

export default function usePokemon() {
    const pokemonList = ref<Pokemon[]>([])
    const searchQuery = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
    const totalPages = ref(1)
    const nextUrl = ref<string | null>(null)
    const prevUrl = ref<string | null>(null)

    const fetchPokemon = async (
        url: string = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=0`,
    ) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            pokemonList.value = data.results
            nextUrl.value = data.next
            prevUrl.value = data.previous
            totalPages.value = Math.ceil(data.count / itemsPerPage)
        } catch (error) {
            console.error('Error fetching Pokémon:', error)
            pokemonList.value = []
        }
    }

    const searchPokemon = async () => {
        if (!searchQuery.value.trim()) {
            fetchPokemon()
            return
        }
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${searchQuery.value.toLowerCase()}`,
            )
            if (!response.ok) throw new Error('Pokémon no encontrado')
            const data = await response.json()
            pokemonList.value = [{ name: data.name }]
        } catch (error) {
            console.error('Error fetching Pokémon:', error)
            pokemonList.value = []
        }
    }

    const paginatedPokemon = computed(() => pokemonList.value)

    const nextPage = () => {
        if (nextUrl.value) fetchPokemon(nextUrl.value)
    }

    const prevPage = () => {
        if (prevUrl.value) fetchPokemon(prevUrl.value)
    }

    return {
        searchQuery,
        pokemonList: paginatedPokemon,
        currentPage,
        totalPages,
        nextUrl,
        prevUrl,
        fetchPokemon,
        searchPokemon,
        nextPage,
        prevPage,
    }
}
