import { ref } from 'vue'
import { getGoalsS,addGoal  } from '@/services/indexedDB'
import { DatabaseError } from '@/ManagementErrors/Index'
import type { Goal } from '@/types'

const goalsTry = ref<Goal []>([])

export function useGoaslService() {

  const getGoalsTry = async() => {
    try {
      goalsTry.value = await getGoalsS()    
    } catch (error) {
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      }
      else {
        alert('Sorry somenthing went wrong xd')
      }
    }
  }

  const addGoalsTry = async(data: Goal) => {
    try {
      await addGoal(data)
      goalsTry.value.push(data)
    } catch (error) {
      console.log(error);
      
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      }
      // else if (error instanceof ValidationError) {
      //   alert('Errores de validacion wn manco qlo')
      // }
      else {
        alert('Sorry somenthing went wrong xd')
      }
    }

  }

  return {
    getGoalsTry, goalsTry,
    addGoalsTry
  }
}