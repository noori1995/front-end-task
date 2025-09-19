import { useState } from '#app'
import type { UploadedImage, RoomType } from '~/types'

export const useImages = () => {
  const images = useState<UploadedImage[]>('images', () => [])

  const addImage = (image: UploadedImage) => {
    images.value.push(image)
  }

  const removeImage = (id: string) => {
    images.value = images.value.filter(img => img.id !== id)
  }

  const updateImage = (id: string, newName: string, newRoomType: RoomType) => {
    const image = images.value.find(img => img.id === id)
    if (image) {
      image.name = newName
      image.roomType = newRoomType
    }
  }

  return {
    images,
    addImage,
    removeImage,
    updateImage,
  }
}
