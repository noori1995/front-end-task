<template>
  <div class="min-h-screen bg-black flex pt-8 md:pt-16 justify-center px-4">
    <div class="w-full flex flex-col items-center justify-between">
      <div class="w-full max-w-2xl space-y-6 pb-24">
        <div>
          <h1
            class="text-xl md:text-2xl font-bold text-gray-100"
            v-text="image.previewUrl && !loading ? 'Mask Items' : 'Upload Photo'"
          />
          <h2
            v-if="image.previewUrl && !loading"
            class="text-sm text-gray-100"
            v-text="`Select an object or brush on object you want to redesign`"
          />
        </div>

        <BaseImageUploader
          v-if="!image.previewUrl"
          @file-selected="handleFileSelected"
        />

        <div v-else>
          <div class="space-y-6">
            <div
              v-if="loading"
              class="flex justify-center items-center h-96"
            >
              <div
                class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"
              />
            </div>
            <div
              v-else
              class="space-y-6"
            >
              <div class="relative group">
                <img
                  :src="image.previewUrl"
                  alt="Image Preview"
                  class="w-full h-auto max-h-96 object-contain rounded-2xl"
                >
                <div
                  class="absolute cursor-pointer h-8 w-8 top-4 right-4 bg-black bg-opacity-60 rounded-full flex justify-center items-center hover:bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity"
                  @click="removeUploadedImage"
                >
                  <IconLoader name="Close" />
                </div>
              </div>
              <div class="flex flex-col md:flex-row gap-2 items-center">
                <BaseInputText
                  v-model="image.name"
                  label="Name"
                />
                <BaseInputSelect
                  v-model="image.roomType"
                  label="Category"
                  :options="roomTypes"
                  open-side="top"
                />
              </div>
            </div>
          </div>
        </div>
        <template v-if="images.length > 0 && !loading && !image.previewUrl">
          <BaseFilterButtons
            v-model="selectedFilter"
            :items="roomTypes"
          />

          <div
            v-if="filteredImages.length > 0"
            class="space-y-4"
          >
            <ImageItem
              v-for="img in filteredImages"
              :key="img.id"
              :image="img"
              @edit="openEditModal(img)"
              @delete="openDeleteModal(img)"
            />
          </div>
          <div
            v-else
            class="text-center py-16"
          >
            <p class="text-white">
              No images found for this filter.
            </p>
          </div>
        </template>
        <div
          v-show="image.previewUrl && !loading"
          class="fixed bottom-0 left-0 w-full bg-gray-800 py-4 flex justify-center md:justify-end px-4 md:pr-40"
        >
          <BaseButton
            text="Add"
            class="w-full max-w-xs md:w-[200px]"
            rounded="full"
            :disabled="loading"
            @click="proceed"
          />
        </div>
      </div>
      <ModalEditImage
        :show="isEditModalVisible"
        :image="selectedImage"
        @close="isEditModalVisible = false"
        @save="handleSave"
      />
      <ModalDeleteConfirmation
        :show="isDeleteModalVisible"
        :image-name="selectedImage?.name || ''"
        @close="isDeleteModalVisible = false"
        @confirm="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadedImage, RoomType } from '~/types'
import { roomTypes } from '~/types'

const { addImage, images, removeImage, updateImage } = useImages()

const loading = ref(false)
const image = reactive<{
  file: File | null
  previewUrl: string
  roomType: RoomType
  name: string
  width: number
  height: number
}>({
  file: null,
  previewUrl: '',
  roomType: 'Bedroom',
  name: '',
  width: 0,
  height: 0,
})

const handleFileSelected = (file: File) => {
  loading.value = true
  image.file = file
  image.name = file.name.replace(/\.[^/.]+$/, '') || 'new image'

  setTimeout(() => {
    loading.value = false
  }, 2000)

  const reader = new FileReader()
  reader.onload = (e) => {
    const url = e.target?.result as string
    image.previewUrl = url

    const img = new Image()
    img.onload = () => {
      image.width = img.naturalWidth
      image.height = img.naturalHeight
    }
    img.src = url
  }
  reader.readAsDataURL(file)
}

const removeUploadedImage = () => {
  if (image.previewUrl && image.previewUrl.startsWith('blob:')) {
    URL.revokeObjectURL(image.previewUrl)
  }
  image.file = null
  image.previewUrl = ''
  image.name = ''
  image.width = 0
  image.height = 0
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b)
}

const proceed = () => {
  if (!image.file || !image.width) return

  const commonDivisor = gcd(image.width, image.height)

  const newImage: UploadedImage = {
    id: crypto.randomUUID(),
    file: image.file,
    previewUrl: image.previewUrl,
    name: image.name,
    size: formatBytes(image.file.size),
    roomType: image.roomType,
    dimension: `${image.width} x ${image.height}`,
    ratio: `${image.width / commonDivisor}:${image.height / commonDivisor}`,
  }
  addImage(newImage)

  image.file = null
  image.previewUrl = ''
  image.roomType = 'Bedroom'
  image.name = ''
  image.width = 0
  image.height = 0
}

const selectedFilter = ref<RoomType | 'All'>('All')
const isEditModalVisible = ref(false)
const isDeleteModalVisible = ref(false)
const selectedImage = ref<UploadedImage | null>(null)

const filteredImages = computed(() => {
  if (selectedFilter.value === 'All') return images.value
  return images.value.filter(img => img.roomType === selectedFilter.value)
})

const openEditModal = (image: UploadedImage) => {
  selectedImage.value = image
  isEditModalVisible.value = true
}

const openDeleteModal = (image: UploadedImage) => {
  selectedImage.value = image
  isDeleteModalVisible.value = true
}

const handleSave = ({ newName, newRoomType }: { newName: string, newRoomType: RoomType }) => {
  if (selectedImage.value) {
    updateImage(selectedImage.value.id, newName, newRoomType)
  }
  isEditModalVisible.value = false
}

const handleDelete = () => {
  if (selectedImage.value) {
    removeImage(selectedImage.value.id)
  }
  isDeleteModalVisible.value = false
}
</script>
