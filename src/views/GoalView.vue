<script setup lang="ts">
import GoalDetail from '@/components/Goal/GoalDetail.vue';

</script>

<template>
<GoalDetail :id="($route.params.id as string)">

</GoalDetail>
</template>

<style scoped>

</style>