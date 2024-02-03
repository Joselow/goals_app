import type { Goal } from "@/types";

import { ref, toValue } from "vue";
import { useGoaslService } from '@/composables/useGoalService'
import { useToast } from '@/composables/useToast'

const { getGoalsTry, goalsTry, addGoalsTry, deleteGoalTry } = useGoaslService()

const goals = ref<Goal []>([])

const { launchToast } = useToast()

export function useGoals () {
  const getReallyGoalsTryTwo = async() => {
    if (goalsTry.value.length) return 

    try {
      await getGoalsTry()
      goalsTry.value = sortLastGoalsTry(toValue(goalsTry.value)) 
    } catch (error) {
      alert('Nos se porque se rompio creo que soy manco owo')
    }      
  }

  const addGoalsTryTwo = async (data: Goal) => {
    data.id = crypto.randomUUID()  
    data.date = new Date()  

    const { success } = await addGoalsTry(data)   
    if (success) {
      goalsTry.value = sortLastGoalsTry(toValue(goalsTry.value)) 
      launchToast({msg: 'Goal created successfully', time: 4000, css: 'bg-green-600'})
    }  
  }

  const sortLastGoalsTry = (data: Goal[]) => {    
    return data.sort((a, b) => {      
      const dateA = a.date.getTime() 
      const dateB = b.date.getTime() 
      return dateB - dateA;
    })
  }

  const deleteGoalTryTwo = async (id: string) => {
    try {
      const { success } = await deleteGoalTry(id)            
      if (success) {
        launchToast({msg: 'Goal deleted successfully', time: 4000, css: 'bg-green-600'})
      }
    } catch (error) {
      alert('Nos se porque se rompio creo que soy manco owo')
    }
  }

  return {
    goals,        
    getReallyGoalsTryTwo,
    addGoalsTryTwo, 
    goalsTry,
    deleteGoalTryTwo
  }
}