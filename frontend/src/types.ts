export interface User {
  id: number
  email: string
  password?: string
}

export interface Room {
  id: number
  name: string
  type: string
  floor: number
  price: number
  capacity: number
  description?: string
}

export interface Booking {
  id: number
  guestName: string
  roomId: number
  roomName?: string
  checkIn: string
  checkOut: string
  status: string
  total: number
  guests: number
  email: string
  phone: string
  notes: string
}