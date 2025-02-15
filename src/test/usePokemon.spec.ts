// tests/usePokemon.spec.ts
import usePokemon from '@/composables/usePokemon'
import { describe, expect, it, vi } from 'vitest'

global.fetch = vi.fn((url) => {
    console.log('Mocked fetch called with:', url)

    if (url.includes('pokemon?limit=10')) {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    results: [{ name: 'pikachu' }, { name: 'bulbasaur' }],
                    next: 'next-url',
                    previous: null,
                }),
        })
    }

    return Promise.resolve({
        json: () => Promise.reject(new Error('Not found')),
    })
}) as unknown as typeof fetch

describe('usePokemon composable', () => {
    it('fetchPokemon obtiene la lista de Pokémon', async () => {
        const { pokemonList, fetchPokemon } = usePokemon()

        await fetchPokemon()

        console.log('Lista de Pokémon en el test:', pokemonList.value)

        expect(global.fetch).toHaveBeenCalledWith(
            'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
        )
        expect(pokemonList.value).toHaveLength(2)
        expect(pokemonList.value[0].name).toBe('pikachu')
    })
})
