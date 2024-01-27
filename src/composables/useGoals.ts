import type { Goal } from "@/types";

import { addGoal, getGoals as getAll, deleteGoal as deleteOne  } from '@/services/indexedDB';
import { ref, nextTick } from "vue";

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
    try {
      const data = await getAll()
      sortLastGoals(data)
    } catch (error) {
      console.log('Error:', error);
      return false
    }    
  }

  const createGoal = async(data: Goal) => {   
    data.id = crypto.randomUUID()    

    try {
      const { status } = await addGoal(data)
      console.log(status);
      
      if (status) {
        goals.value.push(data)
        sortLastGoals(goals.value)
      } 
    } catch (error) {
      throw new Error('adssssssssssssss')
    }
  }

  const updateGoal = (data: Goal) => {
  }

  const deleteGoal = async(id: string) => {
    try {
      const { status } = await deleteOne(id)
      if (status) {  
        const indexGoal = goals.value.findIndex(el => el.id === id)
        
        if (indexGoal !== -1){
          // await nextTick()
          goals.value.splice(indexGoal, 1)
        }
      }       
    } catch (error) {
      throw new Error('adssssssssssssss')
    }
  }

  return {
    goals,
    getGoals, createGoal, updateGoal, deleteGoal
  }
}