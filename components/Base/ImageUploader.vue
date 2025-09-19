<template>
  <BaseActionPanel
    :is-active="isDragging"
    class="cursor-pointer"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="triggerFileInput"
  >
    <p
      class="text-lg font-semibold text-primary-100 pointer-events-none"
      v-text="`Drag or Select Your Photo`"
    />
    <BaseButton
      class="pointer-events-none"
      rounded="full"
      text="Upload"
      icon="Upload"
    />

    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/*"
      @change="onFileChange"
    >
  </BaseActionPanel>
</template>

<script setup lang="ts">
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'file-selected', file: File): void
}>()

const onDragOver = () => {
  isDragging.value = true
}
const onDragLeave = () => {
  isDragging.value = false
}
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.')
    return
  }
  emit('file-selected', file)
}

const onDrop = (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) handleFile(file)
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) handleFile(file)
}
</script>
