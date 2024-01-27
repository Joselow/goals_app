<script setup lang="ts">

</script>

<template>
  <div>
    <div class="grid grid-cols-1 grid-rows-3 mss:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="ow-span-2 col-span-2 rounded-lg border border-red-600 p-6 ">
        <div class="col-span-2 rounded-lg border p-y1 px-3">
          Calificaciones <i class="pi pi-star"></i>
        </div>
      </div>

      <div class="order-3 md:order-none row-span-3 rounded-lg border border-red-200 p-6">
        <div  class="rounded-md border flex-basis-10">
          Notas:
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore eveniet totam recusandae libero amet laborum culpa adipisci, quia, vel consequatur commodi explicabo corporis quasi perspiciatis nesciunt numquam debitis sed. Consequatur.
        </div>
        <div class="rounded-md border flex-basis-2">
          Comentarios:
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident officia libero doloremque at. Reprehenderit explicabo possimus eaque magni minus veniam optio illo. Obcaecati perferendis, mollitia porro commodi soluta id maxime.

        </div>
      </div>

      <div class="col-span-2  grid sm:grid-cols-2 gap-4 ">
        <div class="">
          <span class="text-center block"> PRIORIDADES</span>
          <div class="rounded-lg border border-blue-200 p-3">
            <div>
              XDA <i class="pi pi-delete-left"></i>
            </div>
            <div>
              XD <i class="pi pi-delete-left"></i>
            </div>
            <div>
              ... +
            </div>
          </div>
        </div>
        <div >
          <span class="text-center block"> NO PRIO</span>

          <div class="rounded-lg border border-blue-200 p-3">
            <div>
              XDA <i class="pi pi-delete-left"></i>
            </div>
            <div>
              XD <i class="pi pi-delete-left"></i>
            </div>
            <div>
              ... +
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
