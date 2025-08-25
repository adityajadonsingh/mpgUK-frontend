"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.1,
      easing: (t) => t,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    });

    const preventScroll = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-lenis-prevent]")) {
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
