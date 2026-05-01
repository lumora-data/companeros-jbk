"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section, .section-intro, .reveal-card, .business-card, .story-media-panel, .hero-content"
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
