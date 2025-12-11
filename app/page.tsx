"use client";

import { Navbar } from "@/components/layout/Navbar"; // Nhớ tạo file này
import { HeroSection } from "@/components/sections/HeroSection";
import { RealitySection } from "@/components/sections/RealitySection";
import { TheorySection } from "@/components/sections/TheorySection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { Footer } from "@/components/layout/Footer"; // Nhớ tạo file này
import { NewsSection } from "@/components/sections/NewsSection";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative">
      {/* Navbar cố định phía trên */}
      <Navbar />

      {/* 1. Banner & Giới thiệu chung */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* 2. Thực trạng (Zigzag Layout) */}
      <div id="thuc-trang" className="scroll-mt-20">
        <RealitySection />
      </div>

      {/* 3. Lý luận (So sánh 2 cột) */}
      <div id="ly-luan" className="scroll-mt-20">
        <TheorySection />
      </div>

      {/* 4. Giải pháp (Tabs tương tác) */}
      <div id="giai-phap" className="scroll-mt-20">
        <SolutionSection />
      </div>
      {/* 5. Tin tức & Cập nhật
      <div id="tin-tuc" className="scroll-mt-20">
        <NewsSection />
      </div> */}

      {/* Footer */}
      <Footer />
      <BackToTop />
    </main>
  );
}
