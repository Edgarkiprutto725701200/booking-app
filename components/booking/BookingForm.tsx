"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  serviceId: string;
  providerId: string;
  duration: number;
  price: number;
}

export default function BookingForm({
  serviceId,
  providerId,
  duration,
  price,
}: BookingFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const calculateEndTime = (startTime: string, durationMins: number) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + durationMins;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to book a service.");
      setLoading(false);
      return;
    }

    const endTime = calculateEndTime(time, duration);

    const { error: bookingError } = await supabase.from("bookings").insert({
      customer_id: user.id,
      provider_id: providerId,
      service_id: serviceId,
      booking_date: date,
      start_time: time,
      end_time: endTime,
      status: "pending",
      notes: notes,
      total_amount: price,
    });

    if (bookingError) {
      setError(bookingError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-green-800 font-semibold text-lg mb-2">
          Booking Confirmed! ✅
        </h3>
        <p className="text-green-600 mb-4">
          Your appointment has been submitted and is pending confirmation.
        </p>
        <button
          onClick={() => router.push("/services")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Browse More Services
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          min={new Date().toISOString().split("T")[0]}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests..."
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
        <p>Duration: {duration} mins</p>
        <p>Total: ${price}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}