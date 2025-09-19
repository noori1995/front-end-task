<template>
  <BaseModal
    :show="show"
    title="Delete Photo?"
    @close="$emit('close')"
  >
    <div>
      <div class="flex flex-col-reverse md:flex-row md:justify-end gap-4 pt-6">
        <BaseButton
          variant="secondary"
          rounded="full"
          text="Cancel"
          @click="$emit('close')"
        />
        <BaseButton
          variant="danger"
          rounded="full"
          text="Delete"
          @click="$emit('confirm')"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
defineProps({
  show: { type: Boolean, required: true },
  imageName: { type: String, required: true },
})

defineEmits(['close', 'confirm'])
</script>
