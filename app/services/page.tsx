import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select(`
      *,
      providers (
        business_name,
        category
      )
    `);

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
              className="text-black font-medium"
            >
              Browse Services
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-black transition"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse Services
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Find and book the perfect service from our trusted providers
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-purple-600 px-3 py-1 rounded-full border border-purple-100">
                    {service.providers?.category || "General"}
                  </span>
                </div>

                {/* Service Info */}
                <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition">
                  {service.name}
                </h2>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {service.description}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div>
                    <span className="font-bold text-2xl">${service.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <span>🕐</span>
                    <span>{service.duration} mins</span>
                  </div>
                </div>

                {/* Provider */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center text-xs font-semibold text-purple-700">
                      {service.providers?.business_name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <span className="text-sm text-gray-500">
                      {service.providers?.business_name || "Unknown"}
                    </span>
                  </div>
                  <Link
                    href={`/services/${service.id}`}
                    className="bg-black text-white text-sm py-2 px-5 rounded-lg hover:bg-gray-800 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No services available yet</h3>
            <p className="text-gray-500">
              Check back later or become a provider to add your services!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}