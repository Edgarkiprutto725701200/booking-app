'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar({ role }: { role: string }) {
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out!')
    window.location.href = '/login'
  }

  return (
    <nav className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-primary" />
        <span className="font-bold text-lg">BookEase</span>
      </div>

      <div className="flex items-center gap-4">
        {role === 'customer' && (
          <>
            <Link href="/customer" className="text-sm text-gray-600 hover:text-black">
              Dashboard
            </Link>
            <Link href="/customer/bookings" className="text-sm text-gray-600 hover:text-black">
              My Bookings
            </Link>
            <Link href="/services" className="text-sm text-gray-600 hover:text-black">
              Browse Services
            </Link>
          </>
        )}
        {role === 'provider' && (
          <>
            <Link href="/provider" className="text-sm text-gray-600 hover:text-black">
              Dashboard
            </Link>
            <Link href="/provider/services" className="text-sm text-gray-600 hover:text-black">
              My Services
            </Link>
            <Link href="/provider/bookings" className="text-sm text-gray-600 hover:text-black">
              Bookings
            </Link>
          </>
        )}
        {role === 'admin' && (
          <>
            <Link href="/admin" className="text-sm text-gray-600 hover:text-black">
              Dashboard
            </Link>
          </>
        )}
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}