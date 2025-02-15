# VUE3-LAND_GORILLA

Sitio web en GitHub pages: https://clixmat.github.io/vue-land-gorilla/

Este proyecto es una aplicación en Vue 3 que permite listar, buscar y paginar Pokémon utilizando la API de [PokeAPI](https://pokeapi.co/). La aplicación está construida utilizando la **API de composición** y **composables** para una mejor organización y reutilización del código.

## 📁 Estructura del Proyecto

```
📦 src
┣ 📂 components
┃ ┣ 📜 PokemonSearch.vue
┃ ┣ 📜 PokemonList.vue
┃ ┣ 📂 composables
┃ ┣ 📜 usePokemon.ts
┃ ┣ 📜 App.vue
┣ 📂 test
┃ ┣ 📜 PokemonList.spec.ts
┃ ┣ 📜 usePokemon.spec.ts
┃ ┣ 📜 PokemonSearch.spec.ts
```

---

## 📌 **Componentes**

### `PokemonSearch.vue`
Este componente representa un campo de búsqueda donde los usuarios pueden ingresar el nombre de un Pokémon para buscarlo en la API.

- **Props:** `searchQuery` (valor actual de búsqueda)
- **Emits:** `update:searchQuery` (se emite cuando el usuario escribe en el input)
- **Uso de API Composition:** Utiliza `defineProps`, `defineEmits` y `watch` para la reactividad de la búsqueda.

```vue
<PokemonSearch v-model:searchQuery="searchQuery" />
```

### `PokemonList.vue`
Este componente muestra la lista de Pokémon obtenidos de la API y permite la paginación entre resultados.

- **Props:**
  - `pokemonList` (lista de Pokémon)
  - `currentPage` (página actual)
  - `totalPages` (total de páginas)
  - `nextUrl` y `prevUrl` (URLs para paginación)
- **Emits:** `nextPage`, `prevPage` (para cambiar de página)
- **Uso de API Composition:** Utiliza `defineProps` y `defineEmits` para la comunicación entre componentes.

```vue
<PokemonList
  :pokemonList="pokemonList"
  :currentPage="currentPage"
  :totalPages="totalPages"
  :nextUrl="nextUrl"
  :prevUrl="prevUrl"
  @nextPage="nextPage"
  @prevPage="prevPage"
/>
```

---

## 📌 **Composable: `usePokemon.ts`**

El **composable** `usePokemon.ts` maneja la lógica de negocio, como obtener la lista de Pokémon, buscar un Pokémon específico y manejar la paginación.

### **¿Qué hace?**
✅ API_URL determina la URL de inicio con la que se realizaran el fetch.  
✅ Obtiene la lista de Pokémon (paginada en grupos de 10 configurable si se necesita modificar la cantidad).  
✅ Permite buscar un Pokémon específico por nombre.  
✅ Maneja la paginación de resultados usando `nextUrl` y `prevUrl`.  
✅ Usa `ref`, `computed` y `watch` para la reactividad.  

### **Cómo se usa en `App.vue`**

```ts
import usePokemon from './composables/usePokemon';
const { pokemonList, searchQuery, currentPage, totalPages, nextUrl, prevUrl, fetchPokemon, searchPokemon, nextPage, prevPage } = usePokemon();
```

---

## 📌 **Integración en `App.vue`**

`App.vue` integra los componentes y el composable para que la aplicación funcione correctamente.

```vue
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
```

### **📜 PokemonList.vue**
Lista de Pokémon con paginación.
- Renderiza `pokemonList`.
- Botones para paginar (`prevPage`, `nextPage`).
- Deshabilita botones según `prevUrl` y `nextUrl`.

### **🛠 usePokemon.ts (Composable)**
Maneja la lógica de obtención y búsqueda de Pokémon.
- `fetchPokemon()` obtiene 20 Pokémon por página.
- `searchPokemon()` filtra por nombre.

## ⚙️ Reactividad y Uso de Hooks

### **`ref` para manejo del estado reactivo**
En `usePokemon.ts`, utilizamos `ref` para manejar valores reactivos como `pokemonList` y `searchQuery`:
```ts
const pokemonList = ref([])
const searchQuery = ref('')
```
Estos valores cambian dinámicamente cuando se obtienen nuevos datos o cuando el usuario escribe en la barra de búsqueda.

### **`watch` para reaccionar a cambios en la búsqueda**
`watch` permite ejecutar la función `searchPokemon` automáticamente cuando `searchQuery` cambia:
```ts
watch(searchQuery, async (newQuery) => {
    if (newQuery) await searchPokemon()
    else await fetchPokemon()
})
```
Esto garantiza que la lista se actualice sin necesidad de que el usuario presione un botón.

### **`computed` para valores derivados**
En `PokemonList.vue`, usamos `computed` para manejar la paginación basada en los datos obtenidos:
```ts
const paginatedPokemon = computed(() => pokemonList.value)
```
Estos valores se actualizan automáticamente cuando `nextUrl` o `prevUrl` cambian.

## 🧪 Tests Unitarios
Se utilizan `vitest` y `@vue/test-utils` para testear los componentes y el composable.

### **✅ Tests para `PokemonList.vue`**
Ubicado en `test/PokemonList.spec.ts`:
- **Renderiza correctamente la lista de Pokémon.**
- **Emite el evento `nextPage` cuando se hace clic en "Siguiente".**
- **Emite el evento `prevPage` cuando se hace clic en "Anterior".**

### **✅ Tests para `usePokemon.ts` (Composable)**
Ubicado en `test/usePokemon.spec.ts`:
- **`fetchPokemon()` obtiene y almacena la lista de Pokémon.**

### **Ejecutar los Tests**
Para correr los tests:
```sh
npm run test
```

### **¿Cómo usa la API Composition?**
- `setup()` en `App.vue` usa `usePokemon.ts` para manejar la lógica.
- `watch(searchQuery, searchPokemon)` actualiza la lista de Pokémon en tiempo real.
- `onMounted(fetchPokemon)` carga la primera página al iniciar la app.

---

## 🚀 **Ejecutar el Proyecto**

### 1️⃣ Instalar dependencias:
```sh
npm install
```

### 2️⃣ Ejecutar la aplicación:
```sh
npm run dev
```

---

## 📌 **Conclusión**
Este proyecto demuestra cómo **modularizar** y **organizar** una aplicación en Vue 3 utilizando la API de composición y los composables. Con esta estructura, la lógica de negocio se mantiene separada de la vista, facilitando la escalabilidad y el mantenimiento del código. 🚀












