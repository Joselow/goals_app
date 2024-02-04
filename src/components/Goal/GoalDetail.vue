<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'

import CustomModal from '@/common/CustomModal.vue';
import { useGoals } from '@/composables/useGoals';
import type { Goal } from '@/types';

const { goalsTry, updateGoalsTryTwo, getGoal, theGoal } = useGoals()

const props = defineProps<{ id: string }>()

const deadline = reactive({
  num: 3,
  text: 'weeks',
})

const findInGoals = (idGoal: string) => {
  return goalsTry.value.find(({ id }) => id === idGoal)
}

const findTheGoal = () => {
  if (goalsTry.value.length){
    theGoal.value = findInGoals(props.id)
  } else {
    getGoal(props.id)
  }
}

findTheGoal()

const deadlinesModal = ref(false)
const openDeadlinesModal = () => deadlinesModal.value = true
const closeDeadlinesModal =() => deadlinesModal.value = false

const handleSettDeadlines = () => {
  openDeadlinesModal()
}

const settDeadlines = async() => {
  const deadlinesValue = await generateDeadlines()
  if (theGoal.value) {
    theGoal.value.deadlines = deadlinesValue    
    
    await updateGoalsTryTwo({ ...toRaw(theGoal.value)})
    closeDeadlinesModal()
  }
}

const generateDeadlines = (): Promise<Goal['deadlines']> => {
  const deadlines: Goal['deadlines']  = []
  const deadlineNum = deadline.num
  const deadlineText = deadline.text.slice(0, deadline.text.length - 1)
  
  return new Promise((resolve) => {
    for (let number = 0; number < deadlineNum ; number++) {
      deadlines[number] = { num: number+1, text: deadlineText, completed: false }
    }
    resolve(deadlines)    
  })
}

</script>

<template>
  GOAL_ID: {{ theGoal?.id }} 
  <hr>
  Deadline:
  {{ theGoal?.deadlines?? 'No hay ' }}
  <CustomModal
    :show="deadlinesModal"
    max-width="sm"

  >
    <div class="py-6 px-4 relative">
      <h2 class="text-lg font-medium dark:text-gray-100" >
        Sett your Deadlines
      </h2>         
      <button
        class="absolute right-1 top-0 text-md hover:text-red-600 transition-all font-black text-red-500 rounded py-1 px-2"
        @click="closeDeadlinesModal">
        <i class="pi pi-times"></i>
      </button>  
      
      <main class="my-6">
        <form action="" @submit.prevent>
          <h2 class="text-md font-medium dark:text-gray-100" >
            How much time will you devote to these taks to achieve your goal?
          </h2>   
          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="mt-2">
              <input type="text" id="number_time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="deadline.num" 
              >
            </div>        
            <div class="mt-2 w-full">
              <select id="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="deadline.text" 
              >
                <option value="days">days</option>
                <option selected value="weeks">weeks</option>
                <option value="years">years</option>
              </select>
            </div>
          </div>
        </form>
      </main>       
    
        <footer class="flex justify-end">
          <button class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
            @click="settDeadlines"
          >
            ESTABLECER
          </button>
        </footer>
    </div>
  </CustomModal>

  <div  v-if="theGoal?.strict">
    <h1
      class="bg-black text-2xl text-red-400 font-extrabold"
    >  
      {{ theGoal.deadlines?.length ? 'update DEADLINES' : 'YOU NEED SETT THE DEADLINES'  }}
    </h1>
    <button class="btn"  @click="handleSettDeadlines">      
      {{ theGoal.deadlines?.length ? 'UPDATE' : 'SEET'  }}
    </button>
  </div>

  <div>
    <div class="grid grid-cols-1 grid-rows-3 mss:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="ow-span-2 col-span-2 rounded-lg border border-red-600 p-6 ">
        <div class="col-span-2 rounded-lg border p-y1 px-3">
          Calificaciones 
          <ul class="flex gap-2">
            <template v-for="item in theGoal?.deadlines" :key="item">
              <li>
                {{ item.num }}
                {{ item.text }}
                <i class="pi pi-star"></i>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="order-3 md:order-none row-span-3 rounded-lg border border-red-200 p-6">
        <div  class="rounded-md border flex-basis-10">
          Notas:
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore eveniet totam recusandae libero amet laborum culpa adipisci, quia, vel consequatur commodi explicabo corporis quasi perspiciatis nesciunt numquam debitis sed. Consequatur.
        </div>
        <div class="rounded-md border flex-basis-2">
          Comentarios:
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident officia libero doloremque at. Reprehenderit explicabo possimus eaque magni minus veniam optio illo. Obcaecati perferendis, mollitia porro commodi soluta id maxime.

        </div>
      </div>

      <div class="col-span-2  grid sm:grid-cols-2 gap-4 ">
        <div class="">
          <span class="text-center block"> PRIORIDADES</span>
          <div class="rounded-lg border border-blue-200 p-3">
            <div>
              XDA <i class="pi pi-delete-left"></i>
            </div>
            <div>
              XD <i class="pi pi-delete-left"></i>
            </div>
            <div>
              ... +
            </div>
          </div>
        </div>
        <div >
          <span class="text-center block"> NO PRIO</span>

          <div class="rounded-lg border border-blue-200 p-3">
            <div>
              XDA <i class="pi pi-delete-left"></i>
            </div>
            <div>
              XD <i class="pi pi-delete-left"></i>
            </div>
            <div>
              ... +
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
