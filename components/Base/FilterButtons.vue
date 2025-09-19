<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2">
    <button
      :class="getButtonClasses('All')"
      @click="selectFilter('All')"
      v-text="`All`"
    />
    <button
      v-for="item in items"
      :key="item"
      :class="getButtonClasses(item)"
      @click="selectFilter(item)"
      v-text="item"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  items: string[]
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const selectFilter = (filter: string) => {
  emit('update:modelValue', filter)
}

const getButtonClasses = (filter: string): string => {
  const baseClasses = 'px-5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors'

  if (props.modelValue === filter) {
    return `${baseClasses} bg-primary-400 bg-opacity-20 text-primary-300` // Active state classes
  }

  return `${baseClasses} border border-gray-300 text-gray-400 hover:bg-gray-300` // Inactive state classes
}
</script>
