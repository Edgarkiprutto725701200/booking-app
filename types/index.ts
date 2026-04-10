export type UserRole = 'admin' | 'provider' | 'customer'

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show'

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'

export interface Profile {
  id: string
  full_name: string
  avatar_url: string
  phone: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Provider {
  id: string
  user_id: string
  business_name: string
  description: string
  category: string
  location: string
  rating: number
  total_reviews: number
  is_verified: boolean
  avatar_url: string
  created_at: string
}

export interface Service {
  id: string
  provider_id: string
  name: string
  description: string
  duration: number
  price: number
  currency: string
  is_active: boolean
  created_at: string
}

export interface TimeSlot {
  id: string
  provider_id: string
  service_id: string
  slot_date: string
  start_time: string
  end_time: string
  is_booked: boolean
}

export interface Booking {
  id: string
  customer_id: string
  provider_id: string
  service_id: string
  slot_id: string
  booking_date: string
  start_time: string
  end_time: string
  status: BookingStatus
  notes: string
  total_amount: number
  created_at: string
  updated_at: string
  service?: Service
  provider?: Provider
  payment?: Payment
}

export interface Payment {
  id: string
  booking_id: string
  customer_id: string
  stripe_payment_id: string
  amount: number
  currency: string
  status: PaymentStatus
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
}