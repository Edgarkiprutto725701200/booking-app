import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/booking/BookingForm";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: service } = await supabase
    .from("services")
    .select(`
      *,
      providers (
        id,
        business_name,
        category,
        user_id
      )
    `)
    .eq("id", id)
    .single();

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            📅 BookEase
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/services"
              className="text-gray-600 hover:text-black transition"
            >
              ← Back to Services
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs font-medium bg-white/70 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full border border-purple-100">
            {service.providers?.category || "General"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">
            {service.name}
          </h1>
          <p className="text-gray-500">{service.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Service Details */}
          <div className="md:col-span-1 space-y-4">
            {/* Price Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${service.price}
              </p>
            </div>

            {/* Duration Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <p className="text-sm text-gray-400 mb-1">Duration</p>
              <p className="text-xl font-semibold flex items-center gap-2">
                🕐 {service.duration} mins
              </p>
            </div>

            {/* Provider Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <p className="text-sm text-gray-400 mb-3">Provider</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center font-semibold text-purple-700">
                  {service.providers?.business_name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {service.providers?.business_name || "Unknown Provider"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {service.providers?.category || "General"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Book This Service</h2>
              <p className="text-gray-400 text-sm mb-6">
                Select your preferred date and time to book an appointment
              </p>
              <BookingForm
                serviceId={service.id}
                providerId={service.providers?.id}
                duration={service.duration}
                price={service.price}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}