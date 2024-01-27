<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="relative max-w-5xl m-auto p-4 sm:p-6">
    <div class="absolute ">
      <RouterLink  class="rounded-full px-3 py-1 bg-green-500 " 
        v-show="$route.name !== 'home'"
        to="/">
        <i class="font-extrabold text-black text-xs pi pi-arrow-left"></i>
      </RouterLink>
    </div>
    <h1 class="text-center font-black text-4xl">Exceed your goals </h1>
  </header>

  <main class="max-w-5xl m-auto mt-6 p-4 sm:p-6">
    <RouterView />
  </main>
</template>

