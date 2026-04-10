import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProviderDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: provider } = await supabase
    .from("providers")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      service:services(*),
      customer:profiles(*)
    `)
    .eq("provider_id", provider?.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("provider_id", provider?.id);

  const totalRevenue = bookings
    ?.filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Welcome Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center text-xl font-bold text-purple-700">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.full_name} 👋
              </h1>
              <p className="text-gray-500">
                Here&apos;s what&apos;s happening with your business today
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">Total Bookings</p>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                📋
              </div>
            </div>
            <p className="text-3xl font-bold">{bookings?.length || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">Pending</p>
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                ⏳
              </div>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {bookings?.filter((b) => b.status === "pending").length || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">Confirmed</p>
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                ✅
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {bookings?.filter((b) => b.status === "confirmed").length || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium">Services</p>
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                💼
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {services?.length || 0}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Link
            href="/provider/services"
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 hover:shadow-lg transition group"
          >
            <h3 className="text-lg font-semibold mb-1">Manage Services</h3>
            <p className="text-blue-100 text-sm">
              Add, edit, or remove your services
            </p>
            <span className="text-white/70 group-hover:text-white transition mt-2 inline-block">
              Go →
            </span>
          </Link>
          <Link
            href="/provider/bookings"
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 hover:shadow-lg transition group"
          >
            <h3 className="text-lg font-semibold mb-1">View All Bookings</h3>
            <p className="text-purple-100 text-sm">
              Manage and respond to booking requests
            </p>
            <span className="text-white/70 group-hover:text-white transition mt-2 inline-block">
              Go →
            </span>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
              <Link
                href="/provider/bookings"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>

          {bookings && bookings.length > 0 ? (
            <div className="divide-y">
              {bookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-700">
                      {booking.customer?.full_name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-medium">{booking.service?.name}</p>
                      <p className="text-sm text-gray-400">
                        {booking.customer?.full_name || "Unknown"} •{" "}
                        {booking.booking_date} • {booking.start_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      ${booking.total_amount || "—"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-50 text-green-600 border border-green-200"
                          : booking.status === "pending"
                          ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                          : booking.status === "cancelled"
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-400">No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}