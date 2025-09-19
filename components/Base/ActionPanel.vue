<template>
  <div class="space-y-4 rounded-2xl bg-primary-600 bg-opacity-40">
    <div
      :class="[
        ' min-h-60 md:min-h-96 flex justify-center items-center transition-colors',
        isActive
          ? 'bg-gray-100'
          : '',
      ]"
    >
      <div class="flex flex-col items-center gap-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive?: boolean
}>()
</script>
