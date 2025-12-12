"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CAROUSEL_ITEMS } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    // Đã sửa: bg-[var(--background)] -> bg-background
    <section className="w-full py-10 px-4 md:px-10 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-primary  font-black tracking-tight">
            AN CƯ LẠC NGHIỆP
          </h1>
          {/* Đã sửa: text-muted-foreground là class chuẩn thay vì hardcode */}
          <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto italic">
            Từ lý luận Kinh tế Chính trị Mác - Lênin đến thực tiễn cơn khát nhà
            ở tại các đô thị lớn Việt Nam 2025.
          </p>
        </motion.div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full shadow-2xl rounded-xl overflow-hidden border-4 border-double border-primary/20"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {CAROUSEL_ITEMS.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 md:p-10 text-white">
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-destructive rounded-sm text-destructive-foreground">
                      {item.source}
                    </span>
                    <h2 className="text-2xl md:text-4xl  font-bold leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base opacity-80 mt-2 font-mono">
                      Ngày đăng: {item.date}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/20 hover:bg-background/40 text-white border-none" />
          <CarouselNext className="right-4 bg-background/20 hover:bg-background/40 text-white border-none" />
        </Carousel>
      </div>
    </section>
  );
}
