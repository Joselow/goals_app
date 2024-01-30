import { ref } from 'vue'
import { getGoalsS, addGoal, deleteGoal  } from '@/services/indexedDB'
import { DatabaseError, ValidationError } from '@/ManagementErrors/Index'
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
      // console.log(error);
      
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      }
      else if (error instanceof ValidationError) {
        console.log(error.errors);  
        // alert(`Errores de validacion wn manco qlo ${JSON.parse(error.errors)}`)
      }
      else {
        alert('Sorry somenthing went wrong xd')
      }
    }

  }

  const deleteGoalTry = async (id: string) => {
    try {
      await deleteGoal(id)

      const indexGoal = goalsTry.value.findIndex(el => el.id === id)        
      if (indexGoal !== -1){
        goalsTry.value.splice(indexGoal, 1)
      }
    } catch (error) {
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      }
      else {
        alert('Sorry somenthing went wrong xd')
      }
    }
  }

  return {
    getGoalsTry, goalsTry,
    addGoalsTry,
    deleteGoalTry
  }
}