import { ref } from 'vue'
import { getGoalsS, addGoal, deleteGoal  } from '@/services/indexedDB'
import { DatabaseError, ValidationError, RequestError } from '@/CustomErrors/Index'
import { validationCreateGoal } from "@/validations/GoalSchema";

import type { Goal, StatusResponse } from '@/types'

const goalsTry = ref<Goal []>([])

export function useGoaslService() {

  function formatValidationErrors(errors: any[]): string[] {
    return errors.map(error => `${error.path.join('.')} : ${error.message}`);
  }
  
  const getGoalsTry = async() => {
    try {
      goalsTry.value = await getGoalsS()    
    } catch (error) {
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      }
      else if (error instanceof RequestError){
        alert('La peticion se realizo mal :C xd')
      }
      else {
        alert('Sorry somenthing went wrong xd')
      }
    }
  }

  const addGoalsTry = async(data: Goal): Promise<StatusResponse> => {
  
    try {
      const result = validationCreateGoal(data)
      if (!result.success) {
        const errors = formatValidationErrors(JSON.parse(result.error.message))        
        throw new ValidationError(errors)
      }        
      await addGoal(data)
      goalsTry.value.push(data)

      return { success: true }
    } catch (error) {
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      } 
      else if (error instanceof ValidationError) {        
        console.log(error.errors);        
      }
      else if (error instanceof RequestError){
        alert('La peticion se realizo mal :C xd')
      }
      else {
        alert('Sorry somenthing went wrong xd')
      }
      return { success: false }
    }
  }

  const deleteGoalTry = async (id: string): Promise<StatusResponse> => {
    try {
      await deleteGoal(id)

      const indexGoal = goalsTry.value.findIndex(el => el.id === id)        
      if (indexGoal !== -1){
        goalsTry.value.splice(indexGoal, 1)
      }

      return { success: true }
    } catch (error) {
      if (error instanceof DatabaseError) {
        alert('la datbse murio :C xd')
      }
      else if (error instanceof RequestError){
        alert('La peticion se realizo mal :C xd')
      }
      else {
        alert('Sorry somenthing went wrong xd')
      }
      return { success: false }
    }
  }

  return {
    getGoalsTry, goalsTry,
    addGoalsTry,
    deleteGoalTry
  }
}