"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StaffPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to staff dashboard
    router.push("/staff/dashboard");
  }, [router]);

  return (
    <div className="p-6">
      <div>Redirecting to dashboard...</div>
    </div>
  );
}