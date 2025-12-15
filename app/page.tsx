"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { RealitySection } from "@/components/sections/RealitySection";
import { TheorySection } from "@/components/sections/TheorySection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { NewsSection } from "@/components/sections/NewsSection";
// Import các component mới
import { ProvocationSection } from "@/components/sections/ProvocationSection";
import { IdealSection } from "@/components/sections/IdealSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BackToTop } from "@/components/ui/back-to-top";
import { ConceptBook } from "@/components/sections/ConceptBook";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      <Navbar />

      {/* 1. MỞ ĐẦU: Bối cảnh chung */}
      <div id="hero" className="mt-15">
        <HeroSection />
      </div>

      <div id="ly-luan">
        {/* Thay thế TheorySection bằng ConceptBook */}
        <ConceptBook />
      </div>
      {/* 2. ĐẶT VẤN ĐỀ: Câu hỏi lớn (Điểm nhấn mới) */}
      <ProvocationSection />

      {/* 3. THỰC TRẠNG: Bằng chứng thực tế (Biểu đồ & Ảnh) */}
      <div id="thuc-trang">
        <RealitySection />
      </div>

      {/* 4. TIN TỨC: Tư liệu báo chí bổ trợ
      <div id="tin-tuc">
        <NewsSection />
      </div> */}

      {/* 5. LÝ LUẬN: Gốc rễ vấn đề (Tư bản vs XHCN) */}
      <div id="ly-luan">
        <TheorySection />
      </div>

      {/* 6. LÝ TƯỞNG: Kim chỉ nam (Điểm nhấn mới) */}
      <IdealSection />

      {/* 7. GIẢI PHÁP: Công cụ vĩ mô */}
      <div id="giai-phap">
        <SolutionSection />
      </div>

      {/* 8. KẾT: Hỏi đáp mở rộng (Điểm nhấn mới) */}
      <FAQSection />

      <Footer />
      <BackToTop />
    </main>
  );
}
