<script setup lang="ts">
// import goals from '@/mocks/goasl.json'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ButtonCreateGoal from './ButtonCreateGoal.vue';
import Card from '@/common/GoalCard.vue'
import StrictBudge from '@/common/StrictBudge.vue'
import ConfirmModal from '@/common/ConfirmModal.vue';
import { useGoals } from '@/composables/useGoals'

const { getReallyGoalsTryTwo, goalsTry, deleteGoalTryTwo } = useGoals()

getReallyGoalsTryTwo()

const router = useRouter()
const goToGoal = (id: string) => {
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

const confirmDeleteGoal = async () => {  
  await deleteGoalTryTwo(idToDelete.value)
  closeAlertModal()
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
      <template v-for="{ id, strict, name } in goalsTry" :key="id"  >
        <li>              
          <Card class="h-full " @go="goToGoal(id)" @wait="handleDeleteGoal(id)"       > 
            <template #title>
              <StrictBudge :strict="strict" />
              {{ name }}
            </template>
            <template #action>
              <span>
                leave                
              </span>
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