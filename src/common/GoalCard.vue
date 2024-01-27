<template>
  <div class="relative hover:scale-105 transition-all cursor-pointer">
    <section
      class="h-full shadow-lg transition-all duration-300 border  border-gray-600
      bg-black rounded-xl "
      @click="$emit('go')"
    >
      <div class="p-4 ">
        <div class="font-bold bg-gradient-to-l from-green-200 via-pink-600 to-yellow-700  text-transparent  bg-clip-text  ">      
          <slot name="title">
            <h2 class="text-2xl font-semibold mb-4">Título de la Tarjeta</h2>
          </slot>
        </div>
        <main>
          <slot/>
        </main>
      </div>
      
    </section>
    <div class="absolute right-0 bottom-0 text-end me-3">
      <slot name="action">
        <button class=" text-gray-500 text-xs hover:text-red-600 "
          @click="$emit('wait')"
        >
          leave
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['go', 'wait'])
</script>

<style scoped>
/* Agrega tus estilos adicionales aquí si es necesario */
</style>
