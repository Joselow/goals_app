<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, onUnmounted } from 'vue'
import Modal from '@/common/CustomModal.vue'
import { type Goal } from '@/types/index'
import { useGoals } from '@/composables/useGoals'
import StrictBudge from '@/common/StrictBudge.vue'

const { createGoal } = useGoals()

const nameInputForm = ref<HTMLInputElement | null>(null)

const goal: Goal = reactive({
  id: '',
  date: new Date(),
  name: "",
  // tasks: [
  //   { id: "1", name: "Tarea 1", priority: true },
  //   { id: "2", name: "Tarea 2", priority: false },
  // ],
  // notes: [
  //   { id: "101", content: "Nota 1" },
  //   { id: "102", content: "Nota 2" },
  // ],
  strict: false,
  // deadlines: [
  //   { num: 1, text: "Primera fecha", completed: false },
  //   { num: 2, text: "Segunda fecha", completed: true },
  // ],
  // comment: "Comentario sobre el proyecto A",
  completed: false,
})

const show = ref(false)
const openModal = () => show.value = true
const closeModal = () => show.value = false

const handleCreateGoal = async() => {
  goal.name = ''
  goal.strict = false  
  openModal()  
  
  nextTick(() =>{
    nameInputForm.value?.focus()
  })
}

const storeGoal = () => {
  try {  
    createGoal({ ...goal})
    closeModal()
  } catch (error) {
    alert('something went wrong')
  }
}

defineExpose({ handleCreateGoal })

const plusEvent = (event: KeyboardEvent) => {
  if (show.value) return
  if (event.key === '+' || event.code === 'NumpadAdd') {
    handleCreateGoal()
    console.log('aaaaaaaaaa');
    
  }
}
onMounted(() => {
  window.addEventListener('keydown', plusEvent)
})
onUnmounted(() => {
  window.removeEventListener('keydown', plusEvent)

})

</script>
<template>
  <Modal :show="show" :closeable="true" @close="show = false" max-width="sm">
    <div class="py-6 px-4 relative">
      <div class="text-center p-1 mb-2 font-bold text-white">Your Goal 
        <StrictBudge :strict="goal.strict" />      
      </div>

      <button
        class="absolute right-1 top-0  btn text-md hover:text-red-600  transition-all font-black text-red-500 rounded py-1 px-2"
        @click="closeModal">
        <i class="pi pi-times"></i>
      </button>

      <div>
        <form class="max-w-sm mx-auto" @submit.prevent="storeGoal">
          <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name"
              ref="nameInputForm"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:outline-none focus:ring focus:ring-amber-300
                block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
              placeholder="Learning to play piano" required 
              v-model="goal.name">
          </div>
          <div class="items-start mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is Strict?</label>
    
              <div class="w-full flex gap-2 justify-center text-white ">
                <button
                  type="button"
                  class="w-4/12 border border-red-400  rounded-md px-4 py-1 transition duration-300 ease-in-out hover:bg-red-800 transform hover:scale-105"
                  :class="{ 'bg-red-900 ': goal.strict}"
                  @click="goal.strict = true"
                  >
                  <span class="font-black">Yes 😈</span>
                </button>

                <button
                  type="button"
                  class="w-4/12 border border-green-400 rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-green-700 transform hover:scale-105"
                  :class="{ 'bg-green-500 ': !goal.strict}"
                  @click="goal.strict = false"
                  >
                  <span class=" font-bold">Nop 😎</span>
                </button>
              </div>

            <!-- <label class="relative inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            
            </label> -->
          </div>
          <div class="flex justify-end mt-2">
            <button type="submit"
              class="rounded-lg text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-1.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Submit 
            </button>
          </div>
        </form>
      </div>
    </div>

  </Modal>
</template>

<style scoped></style>