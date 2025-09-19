<template>
  <button
    :class="[
      'px-6 py-3 font-medium text-sm focus:outline-none flex items-center gap-2 justify-center',
      variantClasses,
      roundedClasses,
      { 'opacity-60 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
  >
    <IconLoader
      v-if="icon"
      :name="icon"
    />
    <span v-text="text" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  variant: {
    type: String as () => 'primary' | 'danger' | 'secondary',
    default: 'primary',
  },
  rounded: {
    type: String as () => 'full' | 'sm' | 'lg',
    default: 'lg',
  },
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'text-white bg-danger hover:bg-red-700 focus:ring-red-500'
    case 'secondary':
      return 'text-primary-300 hover:bg-gray-300 focus:ring-gray-600'
    default:
      return 'text-white bg-primary-600 hover:bg-opacity-80 focus:ring-primary'
  }
})

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'full':
      return 'rounded-full'
    case 'sm':
      return 'rounded-sm'
    default:
      return 'rounded-lg'
  }
})
</script>
