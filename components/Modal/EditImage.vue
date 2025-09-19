<template>
  <BaseModal
    :show="show"
    title="Change Image Name"
    @close="$emit('close')"
  >
    <div
      v-if="image"
      class="space-y-4"
    >
      <BaseInputText
        v-model="editableName"
        label="Name"
      />
      <BaseInputSelect
        v-model="editableRoomType"
        label="Category"
        :options="roomTypes"
      />
      <div class="flex flex-col-reverse md:flex-row md:justify-end gap-4 pt-4">
        <BaseButton
          variant="secondary"
          rounded="full"
          text="Cancel"
          @click="$emit('close')"
        />
        <BaseButton
          rounded="full"
          text="Save"
          @click="saveChanges"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import type { UploadedImage, RoomType } from '~/types'

const props = defineProps({
  show: { type: Boolean, required: true },
  image: { type: Object as PropType<UploadedImage | null>, default: null },
})

const emit = defineEmits(['close', 'save'])

const editableName = ref('')
const editableRoomType = ref<RoomType>('Bedroom')

watch(
  () => props.image,
  (newImage) => {
    if (newImage) {
      editableName.value = newImage.name
      editableRoomType.value = newImage.roomType
    }
  },
)

const saveChanges = () => {
  emit('save', { newName: editableName.value, newRoomType: editableRoomType.value })
}
</script>
