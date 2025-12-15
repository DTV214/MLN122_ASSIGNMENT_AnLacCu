"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Đừng quên import Image
import { useParams, notFound } from "next/navigation";
import { CONCEPTS } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function ConceptPage() {
  const params = useParams();
  const concept = CONCEPTS.find((item) => item.slug === params.slug);

  if (!concept) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-slate-200">
            <ArrowLeft className="mr-2 h-4 w-4" /> Về trang chủ
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
        >
          {/* Icon Header */}
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600">
            <BookOpen size={32} />
          </div>

          {/* Tiêu đề */}
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
            {concept.title}
          </h1>

          {/* Gạch chân trang trí */}
          <div className="w-20 h-1 bg-red-500 mb-8"></div>

          {/* --- PHẦN HÌNH ẢNH MỚI THÊM VÀO --- */}
          {concept.image && (
            <div className="relative w-full aspect-video mb-8 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src={concept.image}
                alt={concept.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
          {/* ---------------------------------- */}

          {/* Nội dung bài viết */}
          <p className="text-xl text-slate-700 leading-relaxed text-justify">
            {concept.content}
          </p>

          {/* Trích dẫn */}
          <div className="mt-10 p-6 bg-slate-50 rounded-xl border-l-4 border-slate-400 italic text-slate-600">
            Lý luận không có thực tiễn là lý luận suông. Thực tiễn không có lý
            luận là thực tiễn mù quáng. - Hồ Chí Minh
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
