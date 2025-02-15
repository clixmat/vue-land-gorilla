import PokemonSearch from '@/components/PokemonSearch.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('PokemonSearch.vue', () => {
    it('emite el evento "update:searchQuery" cuando el usuario escribe', async () => {
        const wrapper = mount(PokemonSearch, {
            props: { searchQuery: '' },
        })

        const input = wrapper.find('input')
        await input.setValue('pikachu')

        expect(wrapper.emitted()['update:searchQuery']).toBeTruthy()
        expect(wrapper.emitted()['update:searchQuery'][0]).toEqual(['pikachu'])
    })
})
