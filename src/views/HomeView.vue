<script setup lang="ts">
import GoalsList from '@/components/Goal/GoalsList.vue';
import ToastItem from '@/common/ToastItem.vue';
import { reactive } from 'vue';

const DATA = reactive({
  YES_NO: true,
  TITLE: 'Welcome to this marvel',
  DATA: 'Hi masters, Goals App es tu compañero personal para ayudarte a establecer, rastrear y alcanzar tus objetivos de manera fácil y efectiva. Ya sea que estés planeando tus metas diarias, semanales o anuales, Goals App está aquí para hacer que el proceso sea divertido y alcanzable.',
  DATA_EN :'Goals App is your supportive companion to set, track and achieve your amazing goals easily and effectively.Whether you are planning your daily, weekly or yearly goals, Goals App is here to make the whole process fun and possible.'
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-5">
    <ToastItem css=" bg-slate-950"
      v-if="DATA.YES_NO"
      @remove="DATA.YES_NO = false"
    >
      <h1> {{ DATA.TITLE }} </h1>
      <p class="text-green-600">
        {{ DATA.DATA_EN }}
      </p>
    </ToastItem>
  </div>
  <main>
    <GoalsList></GoalsList>
  </main>
</template>
