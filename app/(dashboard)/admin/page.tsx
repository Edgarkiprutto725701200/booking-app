import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/customer')

  const { data: allBookings } = await supabase
    .from('bookings')
    .select('*')

  const { data: allUsers } = await supabase
    .from('profiles')
    .select('*')

  const { data: allProviders } = await supabase
    .from('providers')
    .select('*')

  const { data: allServices } = await supabase
    .from('services')
    .select('*')

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Admin Dashboard 🛠️
        </h1>
        <p className="text-gray-500 mb-8">
          Overview of the entire platform
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-3xl font-bold">{allUsers?.length || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Providers</p>
            <p className="text-3xl font-bold">{allProviders?.length || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Services</p>
            <p className="text-3xl font-bold">{allServices?.length || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold">{allBookings?.length || 0}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {allUsers && allUsers.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2">{u.full_name}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        u.role === 'provider' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2 text-gray-500">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No users yet</p>
          )}
        </div>
      </div>
    </div>
  )
}