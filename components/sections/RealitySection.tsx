"use client";

import { REALITY_SECTION } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  TrendingUp,
  AlertTriangle,
  ArrowDown,
  Wallet,
  Building2,
} from "lucide-react";
import Image from "next/image"; // Đảm bảo import Image

export function RealitySection() {
  return (
    <section className="py-24 px-4 md:px-10 bg-[#fdfbf7] relative overflow-hidden">
      {/* Background decoration (Họa tiết chìm) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-primary/50 text-primary font-bold tracking-widest uppercase bg-primary/5"
          >
            Phần I: Bức Tranh Hiện Thực
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            {REALITY_SECTION.heading}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-slate-400 to-red-600 mx-auto rounded-full mb-6" />

          {/* STATS HIGHLIGHT - Điểm nhấn số liệu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
            {REALITY_SECTION.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-border flex flex-col items-center text-center gap-2 group hover:shadow-xl transition-all"
              >
                <div
                  className={`p-3 rounded-full mb-2 ${
                    idx === 0
                      ? "bg-green-100 text-green-700"
                      : idx === 1
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {idx === 0 ? (
                    <Wallet size={24} />
                  ) : idx === 1 ? (
                    <Building2 size={24} />
                  ) : (
                    <TrendingUp size={24} />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
                <p
                  className={`text-2xl font-black font-serif ${
                    idx === 0
                      ? "text-green-700"
                      : idx === 1
                      ? "text-red-700"
                      : "text-blue-700"
                  }`}
                >
                  {stat.value}{" "}
                  <span className="text-sm text-muted-foreground font-sans font-normal">
                    {stat.unit}
                  </span>
                </p>
                <div className="mt-2 pt-2 border-t w-full text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  Nguồn: {stat.source}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Timeline Content */}
        <div className="relative space-y-24 mt-20">
          {/* Đường kẻ dọc nối (Timeline Line) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-200 via-primary/20 to-slate-200 -translate-x-1/2 hidden md:block" />

          {REALITY_SECTION.content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-10 relative ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Điểm nút trên timeline (Timeline Node) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-8 h-8 bg-white border-4 border-primary rounded-full shadow-lg"></div>

              {/* Hình ảnh minh họa (Polaroid Style) */}
              <div className="w-full md:w-1/2 px-4 md:px-12 group">
                <div
                  className={`relative bg-white p-3 shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-10 ${
                    index % 2 === 0
                      ? "rotate-2 group-hover:rotate-0"
                      : "-rotate-2 group-hover:rotate-0"
                  }`}
                >
                  <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                    {/* Thay thế bằng ảnh thật của bạn */}
                    <Image
                      src={
                        index === 0
                          ? "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420954/xe-om-cong-nghe-anh-ngoc-duong-5-17476713220331874471141-31-0-1012-1570-crop-17476713489361966899068_bnkgqj.jpg"
                          : "https://res.cloudinary.com/dratbz8bh/image/upload/v1765760089/xdcs.cdnchinhphu.vn-446259493575335936-2023-2-24-_chinh-sach-moi-anh-huong-den-thi-truong-bat-dong-san1602162451-16772104701281575851658-0-0-469-750-crop-1677210493773365030217_nboaoh.png"
                      }
                      alt="Minh họa"
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  {/* Caption giả lập ảnh in */}
                  <div className="mt-3 text-center text-sm text-slate-500 italic">
                    Hình {index + 1}: {item.title}
                  </div>
                  {/* Ghim giấy (Trang trí) */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-sm border border-white z-20"></div>
                </div>
              </div>

              {/* Nội dung text (Speech Bubble) */}
              <div className="w-full md:w-1/2 space-y-6">
                <div
                  className={`bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative ${
                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  }`}
                >
                  {/* Mũi tên trỏ vào timeline (chỉ hiện desktop) */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-slate-100 ${
                      index % 2 === 0
                        ? "-right-2 border-t-0 border-l-0 border-b border-r"
                        : "-left-2"
                    }`}
                  ></div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-lg ${
                        index === 0
                          ? "bg-orange-100 text-orange-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {index === 0 ? (
                        <TrendingUp size={20} />
                      ) : (
                        <AlertTriangle size={20} />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold  text-foreground">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-lg leading-relaxed text-slate-600 text-justify mb-6">
                    {item.description}
                  </p>

                  <div className="relative pl-4 border-l-4 border-primary">
                    <p className="font-semibold text-foreground italic text-lg">
                      {item.highlight}
                    </p>
                    {item.link && (
                      <Link
                        href={item.link}
                        className="text-xs font-bold text-slate-500 hover:text-primary flex items-center gap-1 transition-colors"
                      >
                        Tìm hiểu khái niệm <ExternalLink size={10} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mũi tên chỉ xuống phần tiếp theo */}
        <div className="flex justify-center mt-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground/50"
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
