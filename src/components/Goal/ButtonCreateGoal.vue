<script setup lang="ts">
import { ref } from 'vue';

import StoreGoal from './StoreGoal.vue';

const storeGoal = ref< InstanceType<typeof StoreGoal> | null >(null)

</script>

<template>
  <StoreGoal ref="storeGoal"/>

  <button class="border rounded-lg p-2 flex items-center flex-col justify-center  hover:text-green-600
    hover:bg-green-900/20"
    @click="storeGoal?.handleCreateGoal()"
  >        
    <i class="pi pi-plus text-3xl"></i>
    <!-- Solo cuando esta en  PC xd-->
    <span class="text-xs pt-1 text-green-600 font-bold">press +</span>
  </button>
</template>
