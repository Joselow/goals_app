<script setup lang="ts">
import { ref } from 'vue';

import StoreGoal from './StoreGoal.vue';

const storeGoal = ref< InstanceType<typeof StoreGoal> | null >(null)

</script>

<template>
  <StoreGoal ref="storeGoal"/>

  <button class="border rounded-lg p-2 flex items-center justify-center  hover:text-green-600
    hover:bg-green-900/20"
    @click="storeGoal?.handleCreateGoal()"
  >        
    <i class="pi pi-plus text-3xl"></i>
  </button>
</template>
