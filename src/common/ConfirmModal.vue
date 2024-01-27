<script setup lang="ts">
import LoadingButton from './LoadingButton.vue'
import CustomModal from './CustomModal.vue';
interface Props {
  show?: boolean,
  title?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(),{
  title: 'Are you sure you want to proceed?',
  show: false,
  loading:false
})

const emits = defineEmits<{
  confirm: []
  close: []
}>()

const confirm = () => {
  emits('confirm')
}

</script>

<template>
  <CustomModal 
    @close="$emit('close')"
    :show="show"
    maxWidth="sm"      
    >
    <div class="py-4 px-6">
      <slot>
        <h2 class="text-lg font-medium dark:text-gray-100" >{{ title }}</h2>                  
      </slot>

      <div class="mt-6 flex justify-center gap-3">
        <button class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
          @click="$emit('close')"
        >
          Close
        </button>
        <!-- <LoadingButton class="btn-danger"            
          :loading="routeForm.processing"
          @click="handleDeleteRouter(idToDelete)"
        > -->
        <LoadingButton class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"            
          @click="confirm"
          :loading="loading"
        >
          Confirm
        </LoadingButton>          
      </div>
    </div>
  </CustomModal>
</template>