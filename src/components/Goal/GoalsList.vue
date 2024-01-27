<script setup lang="ts">
// import goals from '@/mocks/goasl.json'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ButtonCreateGoal from './ButtonCreateGoal.vue';
import Card from '@/common/GoalCard.vue'
import StrictBudge from '@/common/StrictBudge.vue'
import ConfirmModal from '@/common/ConfirmModal.vue';
import { useGoals } from '@/composables/useGoals'

const { getGoals, goals, deleteGoal } = useGoals()

getGoals()
const router = useRouter()
const goToGoal = (id: string) => {
  console.log('aaaaaaaaaaaa');
  router.push({
        name: 'goal',
        params: {
          id
        },
      })
}

const showAlertModal = ref(false)
const openAlertModal = () => showAlertModal.value = true
const closeAlertModal = () => showAlertModal.value = false

const idToDelete = ref('')

const handleDeleteGoal = (id: string) => {
  openAlertModal()
  idToDelete.value = id
}

const confirmDeleteGoal = () => {  
  try {
    deleteGoal(idToDelete.value)
    closeAlertModal()
  } catch (error) {
    alert('something went wrong ')
  }
}
</script>

<template>
  <ConfirmModal
    @close="closeAlertModal"
    @confirm="confirmDeleteGoal"
    :show="showAlertModal"
  />
  <div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <template v-for="{ id, strict, name } in goals" :key="id"  >
        <li>              
          <Card class="h-full "  @go="goToGoal(id)" @wait="handleDeleteGoal(id)"       > 
            <template #title>
              <StrictBudge :strict="strict" />
              {{ name }}
            </template>
          </Card>
        </li> 
      </template>      
      <ButtonCreateGoal/>
    </ul>
    
  </div>
  </template>

<style scoped>

</style>