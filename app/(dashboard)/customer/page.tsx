import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CustomerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(*),
      provider:providers(*)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {profile?.full_name} 👋
        </h1>
        <p className="text-gray-500 mb-8">
          Manage your bookings here
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings?.length || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Upcoming</p>
            <p className="text-3xl font-bold">
              {bookings?.filter(b => b.status === 'confirmed').length || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-3xl font-bold">
              {bookings?.filter(b => b.status === 'completed').length || 0}
            </p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          {bookings && bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{booking.service?.name}</p>
                    <p className="text-sm text-gray-500">{booking.provider?.business_name}</p>
                    <p className="text-sm text-gray-500">{booking.booking_date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No bookings yet</p>
          )}
        </div>
      </div>
    </div>
  )
}