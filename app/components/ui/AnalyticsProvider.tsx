"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", { page_path: pathname });
    }
  }, [pathname]);

  return <>{children}</>;
}
