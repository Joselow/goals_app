<script setup lang="ts">
import GoalsList from '@/components/Goal/GoalsList.vue';
import ToastItem from '@/common/ToastItem.vue';
import { reactive, ref } from 'vue';
import { markAsUntransferable } from 'worker_threads';

const DATA = reactive({
  YES_NO: true,
  TITLE: 'Welcome to this marvel',
  DATA: 'Hi masters, Goals App es tu compañero personal para ayudarte a establecer, rastrear y alcanzar tus objetivos de manera fácil y efectiva. Ya sea que estés planeando tus metas diarias, semanales o anuales, Goals App está aquí para hacer que el proceso sea divertido y alcanzable.',
  DATA_EN :'Goals App is your support parner to sett, track and reach your INCREIBLE GOALS easly and effective.If you are planing your daily, weely, o anuals goals, Goasl App is here to make funny and posible all the procees'
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
