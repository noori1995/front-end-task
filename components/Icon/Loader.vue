<template>
  <component :is="iconComponent" />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const iconComponent = computed(() => {
  return defineAsyncComponent(() => import(`~/components/Icon/${props.name}.vue`))
})
</script>
