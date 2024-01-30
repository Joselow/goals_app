import type { Goal } from "@/types";

import { addGoal, getGoalsS as getAll, deleteGoal as deleteOne  } from '@/services/indexedDB';
import { ref, nextTick, toValue } from "vue";
import { useGoaslService } from '@/composables/useGoalService'

const { getGoalsTry, goalsTry, addGoalsTry }= useGoaslService()
const goals = ref<Goal []>([])

// interface serviceDB {
//   // getGoals: () =>,
//   // addGoal: (data: Goal) =>,
//   // updateGoa: () =>,,
//   // deleteGoal: () =>,
// }

export function useGoals () {

  const sortLastGoals = (data: Goal[]) => {
    goals.value = data.sort((a, b) => {      
      const dateA = a.date.getTime() 
      const dateB = b.date.getTime() 
      return dateB - dateA;
    })
  }

  const getGoals = async() => {
      const data = await getAll()
      sortLastGoals(data)
  }

  const createGoal = async(data: Goal) => {   
    data.id = crypto.randomUUID()    

    const { message } = await addGoal(data)    
    
    // if (status) {
      goals.value.push(data)
      sortLastGoals(goals.value)
    // } 
  }

  const updateGoal = (data: Goal) => {
  }

  const deleteGoal = async(id: string) => {
    try {
      const { message } = await deleteOne(id)
      // if (status) {  
        const indexGoal = goals.value.findIndex(el => el.id === id)
        
        if (indexGoal !== -1){
          // await nextTick()
          goals.value.splice(indexGoal, 1)
        }
      // }       
    } catch (error) {
      throw new Error('adssssssssssssss')
    }
  }

  const getReallyGoalsTryTwo = async() => {
    try {
      await getGoalsTry()
      // alert('NICEEEEE')  /// opcional

      goalsTry.value = sortLastGoalsTry(toValue(goalsTry.value)) // - primera opcion que no me convece
      // ya que tendria que devolver el ref desde aca o llamarlo enel copnnete desde el otro asi que no lo veo aunque
      // ponete a pensar que puede ser ay que esto ismplement es como si lo suariamos en un componente solo que en
      // otro archivo  pensando que seria reutilizable pero no es l genralidad asi que croeque taba bien xd
      // goals.value = sortLastGoalsTry(toValue(goalsTry.value)) // - segunda opcion en la que aca lo meto al ref desde aca  y secdhingó

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


  return {
    goals,
    getGoals, createGoal, updateGoal, deleteGoal, 
    
    getReallyGoalsTryTwo,
    addGoalsTryTwo, 
    goalsTry
  }
}