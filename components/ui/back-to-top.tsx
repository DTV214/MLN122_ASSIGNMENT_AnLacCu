"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Lắng nghe sự kiện cuộn chuột
  useEffect(() => {
    const toggleVisibility = () => {
      // Hiện nút khi cuộn xuống quá 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-2xl border-2 border-white/20 hover:bg-primary/90 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
          >
            <ArrowUp className="h-6 w-6 animate-bounce group-hover:animate-none" />

            {/* Tooltip giả (Hiển thị khi hover) */}
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-foreground text-background text-xs font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
              Lên đầu trang
            </span>
          </Button>

          {/* Hiệu ứng vòng sóng lan tỏa (Pulse effect) */}
          <span className="absolute -z-10 top-0 left-0 h-12 w-12 rounded-full bg-primary/30 animate-ping"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
