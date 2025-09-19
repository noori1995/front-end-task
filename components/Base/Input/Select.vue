<template>
  <div class="relative w-full">
    <button
      class="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white"
      @click="isOpen = !isOpen"
    >
      <div>
        <span
          class="block text-left text-xs font-medium text-gray-400"
          v-text="label"
        />
        <span
          class="block text-left text-base"
          v-text="modelValue"
        />
      </div>
      <div
        class="h-5 w-5 transform text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      >
        <IconLoader name="ArrowDown" />
      </div>
    </button>
    <div v-if="isOpen">
      <BaseModal
        :show="isOpen"
        title="Category"
        class="md:hidden"
        @close="isOpen = false"
      >
        <div>
          <ul>
            <li
              v-for="option in options"
              :key="option"
              class="cursor-pointer px-4 py-2 text-gray-600 hover:bg-gray-700 font-medium"
              @click="selectOption(option)"
              v-text="option"
            />
          </ul>
        </div>
      </BaseModal>
      <div
        class="hidden md:block absolute z-10 w-full rounded-md bg-gray-800 shadow-lg border border-gray-600 focus:outline-none"
        :class="dropdownClasses"
      >
        <ul>
          <li
            v-for="option in options"
            :key="option"
            class="cursor-pointer px-4 py-4 text-center text-gray-600 hover:bg-gray-700 font-medium"
            @click="selectOption(option)"
            v-text="option"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  modelValue: string | number
  options: string[]
  openSide?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  openSide: 'bottom',
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const dropdownClasses = computed(() => {
  if (props.openSide === 'top') {
    return 'bottom-full mb-2 origin-bottom'
  }
  else {
    return 'top-full mt-2 origin-top'
  }
})

const selectOption = (option: string) => {
  emit('update:modelValue', option)
  isOpen.value = false
}
</script>
