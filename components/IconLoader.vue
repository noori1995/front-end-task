<template>
  <component :is="iconComponent" />
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const icons = import.meta.glob<DefineComponent>('~/components/icons/*.vue')

const iconComponent = computed(() => {
  const path = `/components/icons/${props.name}.vue`
  const componentLoader = icons[path]

  if (!componentLoader) {
    console.warn(`Icon "${props.name}" not found in /components/icons/`)
    return null
  }

  return defineAsyncComponent(componentLoader)
})
</script>
