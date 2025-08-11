"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      easing: (t) => 1 - Math.pow(2, -10 * t), // simpler form, same easing curve
      duration: 1.5,
      smoothWheel: true,
    });

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId); // ensure we stop RAF on unmount
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
