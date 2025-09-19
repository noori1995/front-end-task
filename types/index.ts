export interface UploadedImage {
  id: string
  file: File
  previewUrl: string
  name: string
  size: string // 1.2 MB
  roomType: RoomType
  dimension: string
  ratio: string
}

export type RoomType = 'Bedroom' | 'Living room' | 'Dining room' | 'Office' | 'Kitchen'

export const roomTypes: RoomType[] = ['Bedroom', 'Living room', 'Dining room', 'Office', 'Kitchen']
