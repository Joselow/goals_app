import type { Goal } from "@/types";

import { ref, toValue } from "vue";
import { useGoaslService } from '@/composables/useGoalService'

const { getGoalsTry, goalsTry, addGoalsTry, deleteGoalTry }= useGoaslService()

const goals = ref<Goal []>([])

// interface serviceDB {
//   // getGoals: () =>,
//   // addGoal: (data: Goal) =>,
//   // updateGoa: () =>,,
//   // deleteGoal: () =>,
// }

export function useGoals () {
  const getReallyGoalsTryTwo = async() => {
    try {
      await getGoalsTry()
      goalsTry.value = sortLastGoalsTry(toValue(goalsTry.value)) // - primera opcion que no me convece
      // ya que tendria que devolver el ref desde aca o llamarlo enel copnnete desde el otro asi que no lo veo aunque
      // ponete a pensar que puede ser ay que esto ismplement es como si lo suariamos en un componente solo que en
      // otro archivo  pensando que seria reutilizable pero no es l genralidad asi que croeque taba bien xd
      // goals.value = sortLastGoalsTry(toValue(goalsTry.value)) // - segunda opcion en la que aca lo meto al ref desde aca  y se chingó

    } catch (error) {
      alert('Nos se porque se rompio creo que soy manco owo')
    }      
  }

  const addGoalsTryTwo = async (data: Goal) => {
    data.id = crypto.randomUUID()  
    data.date = new Date()  

    try {
      await addGoalsTry(data)
      goalsTry.value = sortLastGoalsTry(toValue(goalsTry.value)) 
    } catch (error) {
      alert('Nos se porque se rompio creo que soy manco owo')
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
      await deleteGoalTry(id)            
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