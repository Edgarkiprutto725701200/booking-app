"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface BookingActionsProps {
  bookingId: string;
}

export default function BookingActions({ bookingId }: BookingActionsProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: string) => {
    setLoading(true);

    const { error } = await supabase
      .from("bookings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", bookingId);

    if (error) {
      alert("Error updating booking: " + error.message);
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateStatus("confirmed")}
        disabled={loading}
        className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
      >
        {loading ? "..." : "✓ Accept"}
      </button>
      <button
        onClick={() => updateStatus("cancelled")}
        disabled={loading}
        className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
      >
        {loading ? "..." : "✕ Reject"}
      </button>
    </div>
  );
}