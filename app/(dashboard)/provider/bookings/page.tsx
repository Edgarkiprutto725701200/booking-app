import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BookingActions from "@/components/booking/BookingActions";

export default async function ProviderBookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

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
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Bookings</h1>
          <p className="text-gray-500">
            Manage and respond to your booking requests
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <p className="text-sm text-gray-400">All</p>
            <p className="text-2xl font-bold">{bookings?.length || 0}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
            <p className="text-sm text-yellow-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">
              {bookings?.filter((b) => b.status === "pending").length || 0}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-4">
            <p className="text-sm text-green-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-700">
              {bookings?.filter((b) => b.status === "confirmed").length || 0}
            </p>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 p-4">
            <p className="text-sm text-red-600">Cancelled</p>
            <p className="text-2xl font-bold text-red-700">
              {bookings?.filter((b) => b.status === "cancelled").length || 0}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        {bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking: any) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left - Booking Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-lg font-semibold text-purple-700">
                      {booking.customer?.full_name
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {booking.service?.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Customer: {booking.customer?.full_name || "Unknown"}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          📅 {booking.booking_date}
                        </span>
                        <span className="flex items-center gap-1">
                          🕐 {booking.start_time} - {booking.end_time}
                        </span>
                        <span className="flex items-center gap-1">
                          💰 ${booking.total_amount || "—"}
                        </span>
                      </div>
                      {booking.notes && (
                        <p className="text-sm text-gray-400 mt-2 bg-gray-50 p-2 rounded">
                          📝 {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right - Status & Actions */}
                  <div className="flex items-center gap-3">
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

                    {booking.status === "pending" && (
                      <BookingActions bookingId={booking.id} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border p-16 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
            <p className="text-gray-400">
              When customers book your services, they&apos;ll appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}