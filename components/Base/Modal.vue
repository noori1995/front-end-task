<template>
  <div v-if="show">
    <!-- just mobile -->
    <div
      class="flex fixed inset-0 z-50 md:hidden items-center justify-center bg-black bg-opacity-50"
      @click.self="$emit('close')"
    >
      <div class="bg-gray-800 rounded-t-2xl shadow-xl w-full p-6 fixed bottom-0">
        <div class="mb-6 w-full text-center">
          <h3
            class="text-xl text-white font-bold"
            v-text="title"
          />
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
    <!-- just mobile -->
    <!-- just desktop -->
    <div
      class="hidden fixed inset-0 z-50 md:flex items-center justify-center bg-black bg-opacity-50"
      @click.self="$emit('close')"
    >
      <div class="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3
            class="text-xl text-white font-semibold"
            v-text="title"
          />
          <IconLoader
            name="Close"
            class="cursor-pointer"
            @click="$emit('close')"
          />
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
    <!-- just desktop -->
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
})

defineEmits(['close'])
</script>
