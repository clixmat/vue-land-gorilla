// tests/PokemonList.spec.ts
import PokemonList from '@/components/PokemonList.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('PokemonList.vue', () => {
    const pokemonList = [{ name: 'pikachu' }, { name: 'bulbasaur' }]

    it('renderiza la lista de Pokémon', () => {
        const wrapper = mount(PokemonList, {
            props: {
                pokemonList,
                currentPage: 1,
                totalPages: 2,
                nextUrl: 'https://pokeapi.co/next',
                prevUrl: 'https://pokeapi.co/prev',
            },
        })

        expect(wrapper.findAll('li')).toHaveLength(2)
        expect(wrapper.text()).toContain('pikachu')
    })

    it('emite el evento "nextPage" cuando se hace clic en el botón de siguiente', async () => {
        const wrapper = mount(PokemonList, {
            props: {
                pokemonList,
                currentPage: 1,
                totalPages: 2,
                nextUrl: 'https://pokeapi.co/next',
                prevUrl: 'https://pokeapi.co/prev',
            },
        })

        const nextButton = wrapper.find('[data-testid="next-button"]')
        expect(nextButton.exists()).toBe(true)
        await nextButton.trigger('click')

        expect(wrapper.emitted().nextPage).toBeTruthy()
    })

    it('emite el evento "prevPage" cuando se hace clic en el botón de anterior', async () => {
        const wrapper = mount(PokemonList, {
            props: {
                pokemonList,
                currentPage: 2,
                totalPages: 2,
                nextUrl: 'https://pokeapi.co/next',
                prevUrl: 'https://pokeapi.co/prev',
            },
        })

        const prevButton = wrapper.find('[data-testid="prev-button"]')
        expect(prevButton.exists()).toBe(true)
        await prevButton.trigger('click')

        expect(wrapper.emitted().prevPage).toBeTruthy()
    })
})
