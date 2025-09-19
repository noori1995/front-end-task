<template>
  <div class="relative w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white">
    <label class="block text-xs font-medium text-gray-400">
      {{ label }}
    </label>

    <input
      type="text"
      :value="modelValue"
      class="w-full bg-transparent text-base text-white placeholder-gray-500 focus:outline-none"
      :placeholder="label"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >

    <div class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
      <IconLoader
        name="TextEdit"
        class="h-5 w-5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  modelValue: string | number
}
defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
</script>
