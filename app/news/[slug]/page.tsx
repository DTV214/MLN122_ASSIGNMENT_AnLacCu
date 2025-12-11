// src/app/news/[slug]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { DETAILED_NEWS } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Quote, Sparkles } from "lucide-react"; // Thêm icon Sparkles
import { motion } from "framer-motion";

export default function NewsDetailPage() {
  const params = useParams();
  const article = DETAILED_NEWS.find((item) => item.slug === params.slug);

  if (!article) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        {/* Nút Quay lại - Thiết kế bo tròn mềm mại */}
        <Link href="/#tin-tuc">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-slate-200 rounded-full px-6 transition-all duration-300 group text-slate-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Quay lại danh sách
          </Button>
        </Link>

        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge
              className={`
                px-4 py-1.5 text-sm font-bold tracking-wide rounded-full border-none shadow-sm
                ${
                  article.type === "gov"
                    ? "bg-red-600 hover:bg-red-700"
                    : article.type === "press"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }
              `}
            >
              {article.source}
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
            <span className="text-slate-500 font-medium text-sm tracking-tight">
              {article.date}
            </span>
          </div>

          {/* Title - Font Sans, Bold, Tight Tracking */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          {/* Decorative Line */}
          <div className="w-20 h-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"></div>
        </motion.div>

        {/* FEATURED IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-full aspect-[16/9] mb-16 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </motion.div>

        {/* CONTENT GRID layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COL: Content (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Nội dung chính
              </h3>
            </div>

            <p className="text-lg md:text-xl text-slate-700 leading-relaxed text-justify font-medium">
              {article.summary}
            </p>

            {/* Note Box - Modern Style */}
            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-400 group-hover:bg-primary transition-colors"></div>
              <p className="text-slate-500 italic relative z-10 pl-2">
                Hình ảnh bài báo trên là tư liệu thực tế được chụp lại từ các
                trang báo điện tử uy tín, phản ánh hơi thở của thị trường bất
                động sản.
              </p>
            </div>
          </div>

          {/* RIGHT COL: Analysis Highlight (4 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                // ĐIỂM NHẤN CHÍNH: Card nền tối màu đỏ gradient
                className="bg-gradient-to-br from-red-900 to-red-700 text-black p-8 rounded-3xl shadow-xl shadow-red-900/20 relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 text-yellow-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-200">
                      Góc nhìn 
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold mb-4 text-black leading-tight">
                    {article.analysis.perspective}
                  </h4>

                  <div className="w-full h-px bg-white/20 mb-6"></div>

                  <div className="flex gap-4">
                    <Quote className="w-10 h-10 text-white/20 flex-shrink-0 fill-white/10" />
                    <p className="text-red-50/90 leading-relaxed text-lg">
                      {article.analysis.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
