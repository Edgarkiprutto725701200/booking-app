import Link from "next/link";
import PublicNavbar from "@/components/shared/PublicNavbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <PublicNavbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

        <div className="relative max-w-6xl mx-auto px-4 py-32 text-center">
          <div className="inline-block bg-white/70 backdrop-blur-sm text-gray-600 text-sm px-4 py-1 rounded-full mb-6 border border-gray-200">
            ✨ The easiest way to book services online
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Book Services <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              With Ease
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Find top-rated service providers, browse their offerings, and book
            appointments in seconds. Simple, fast, and reliable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="bg-black text-white px-8 py-4 rounded-xl text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Browse Services →
            </Link>
            <Link
              href="/register"
              className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg hover:bg-gray-50 transition shadow-sm w-full sm:w-auto"
            >
              Become a Provider
            </Link>
          </div>

          {/* Preview Image */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl border p-4 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-sm text-gray-400 ml-2">
                    bookease.com/services
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg mb-3 flex items-center justify-center text-lg">
                      💇
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-full mb-3" />
                    <div className="h-8 bg-black rounded-md" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg mb-3 flex items-center justify-center text-lg">
                      💆
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-full mb-3" />
                    <div className="h-8 bg-black rounded-md" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg mb-3 flex items-center justify-center text-lg">
                      💅
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-full mb-3" />
                    <div className="h-8 bg-black rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Three simple steps to book any service you need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 text-center border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Services</h3>
              <p className="text-gray-500">
                Browse through a wide range of services from verified providers
                in your area.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8 text-center border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                📅
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Instantly</h3>
              <p className="text-gray-500">
                Pick your preferred date and time. Booking takes less than a
                minute.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-8 text-center border border-pink-100">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                ✅
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Confirmed</h3>
              <p className="text-gray-500">
                Receive instant confirmation and reminders for your upcoming
                appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                500+
              </p>
              <p className="text-gray-500 mt-2">Service Providers</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                10,000+
              </p>
              <p className="text-gray-500 mt-2">Bookings Completed</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <p className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                4.9 ⭐
              </p>
              <p className="text-gray-500 mt-2">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              What Our Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border">
              <div className="flex items-center gap-1 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600 mb-6">
                &ldquo;BookEase made it so easy to find and book a hair stylist. The
                whole process took less than a minute!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-semibold text-blue-700">
                  S
                </div>
                <div>
                  <p className="font-medium text-sm">Sarah Johnson</p>
                  <p className="text-gray-400 text-xs">Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border">
              <div className="flex items-center gap-1 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600 mb-6">
                &ldquo;As a provider, this platform helped me reach more clients and
                manage my bookings effortlessly.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center font-semibold text-purple-700">
                  M
                </div>
                <div>
                  <p className="font-medium text-sm">Mike Chen</p>
                  <p className="text-gray-400 text-xs">Service Provider</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border">
              <div className="flex items-center gap-1 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600 mb-6">
                &ldquo;I love how simple and clean the interface is. Booking
                appointments has never been this smooth.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center font-semibold text-pink-700">
                  A
                </div>
                <div>
                  <p className="font-medium text-sm">Amy Williams</p>
                  <p className="text-gray-400 text-xs">Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join thousands of customers and providers already using BookEase.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-black px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition shadow-lg w-full sm:w-auto"
            >
              Sign Up Free →
            </Link>
            <Link
              href="/services"
              className="border border-gray-700 text-white px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition w-full sm:w-auto"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span className="font-bold">BookEase</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/services" className="hover:text-black transition">
                Services
              </Link>
              <Link href="/login" className="hover:text-black transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-black transition">
                Sign Up
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 BookEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}