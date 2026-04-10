import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
) {
  const slots = []
  const start = new Date(`1970-01-01T${startTime}`)
  const end = new Date(`1970-01-01T${endTime}`)

  let current = start
  while (current < end) {
    const slotEnd = new Date(
      current.getTime() + duration * 60000
    )
    if (slotEnd <= end) {
      slots.push({
        start_time: current.toTimeString().slice(0, 5),
        end_time: slotEnd.toTimeString().slice(0, 5),
      })
    }
    current = slotEnd
  }

  return slots
}