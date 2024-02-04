import { ref } from 'vue'
import { getGoalsS, addGoal, deleteGoal, updateGoal, getGoal  } from '@/services/indexedDB'
import { DatabaseError, ValidationError, RequestError } from '@/CustomErrors/Index'
import { validationCreateGoal } from "@/validations/GoalSchema";
import { useToast } from '@/composables/useToast'
const { launchToast } = useToast()

import type { Goal, StatusResponse } from '@/types'

const goalsTry = ref<Goal []>([])

export function useGoaslService() {

  function formatValidationErrors(errors: any[]): string[] {
    return errors.map(error => `The field '${error.path.join('.')}' : ${error.message}`);
  }

  function formatErrorsToHtml(errors: string[]): string {
    if (!errors.length) return ''        
    const title = '<h3 class="font-semibold text-red-600"> Corrects Errors</h3>'
    const htmlOutput: string = `${title}<ul class="text-red-600">${errors.map(error => `<li> - ${error}</li>`).join('')}</ul>`;
    return htmlOutput;
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

  const getGoalTry = async(id: string): Promise<{ data: Goal | undefined, success: boolean }> => {
    try {
      const goal = await getGoal(id)    
      return { data: goal, success: true }
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
      return { data: undefined, success: false }
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
        const htmlErrors = formatErrorsToHtml(error.errors)
        launchToast({msg: htmlErrors, time: 10000, css: 'bg-rose-200 shadow-md', html: true})      
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
  const updateGoalsTry = async(data: Goal): Promise<StatusResponse> => {
    try {
      const result = validationCreateGoal(data)
      if (!result.success) {
        const errors = formatValidationErrors(JSON.parse(result.error.message))        
        throw new ValidationError(errors)
      }        
      await updateGoal(data)

      const indexGoal = goalsTry.value.findIndex(el => el.id === data.id)        
      if (indexGoal !== -1){
        goalsTry.value[indexGoal] = data
        console.log('Updated wn owo');
        
      }    

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
        console.log(error);

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
    deleteGoalTry,
    updateGoalsTry,
    getGoalTry
  }
}