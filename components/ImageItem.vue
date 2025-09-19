<template>
  <div class="flex items-center rounded-xl text-white">
    <img
      :src="image.previewUrl"
      class="w-24 h-24 object-cover rounded-lg me-4 flex-shrink-0"
      alt="Image Preview"
    >

    <div class="flex-grow flex flex-col justify-center min-w-0">
      <p
        class="font-bold text-base truncate"
        :title="image.name"
        v-text="image.name"
      />
      <p
        class="text-xs text-gray-500"
        v-text="`Size: ${image.size}`"
      />
      <p
        class="text-xs text-gray-500"
        v-text="`Dimension: ${image.dimension}`"
      />
      <p
        class="text-xs text-gray-500"
        v-text="`Ratio: ${image.ratio}`"
      />
    </div>

    <div class="flex items-center gap-4 ps-4">
      <button
        aria-label="Edit image"
        @click="$emit('edit', image)"
      >
        <IconLoader
          name="TextEdit"
          class="h-6 w-6 fill-gray-500 hover:fill-gray-200 transition-colors"
        />
      </button>
      <button
        aria-label="Delete image"
        @click="$emit('delete', image)"
      >
        <IconLoader
          name="Trash"
          class="h-6 w-6 stroke-gray-500 hover:stroke-danger transition-colors"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadedImage } from '~/types'

defineProps<{
  image: UploadedImage
}>()

defineEmits<{
  (e: 'edit' | 'delete', image: UploadedImage): void
}>()
</script>
