"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function IdealSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-red-800 to-red-950 text-white relative overflow-hidden">
      {/* Trang trí cờ đỏ sao vàng cách điệu */}
      <div className="absolute -right-20 -top-20 text-yellow-500/10">
        <Star size={400} />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Cột thông điệp */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6 text-yellow-400">
            <Star fill="currentColor" className="animate-spin-slow" />
            <span className="font-bold tracking-[0.2em] uppercase text-sm">
              Kim chỉ nam hành động
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Không hy sinh{" "}
            <span className="text-yellow-400">Tiến bộ & Công bằng xã hội</span>{" "}
            để chạy theo tăng trưởng kinh tế đơn thuần.
          </h2>

          <p className="text-lg text-red-100/90 leading-relaxed text-justify border-l-4 border-yellow-500 pl-6">
            Trong nền kinh tế thị trường định hướng XHCN, Nhà nước không can
            thiệp bằng mệnh lệnh hành chính ép buộc doanh nghiệp chịu lỗ, mà sử
            dụng <strong>hệ thống công cụ kinh tế</strong> để điều hòa lợi ích:
            Doanh nghiệp vẫn có lãi - Người dân có nhà.
          </p>
        </motion.div>

        {/* Cột hình ảnh/Trích dẫn */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative h-full flex items-center justify-center"
        >
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
            <Quote className="w-12 h-12 text-yellow-400 mb-4 opacity-80" />
            <p className="text-2xl italic text-white leading-relaxed text-center">
              Phát triển kinh tế phải gắn liền và phục vụ cho mục tiêu Công bằng xã hội. Đó là động lực bền vững nhất.
            </p>
            {/* <div className="mt-6 text-center">
              <span className="block font-bold text-yellow-400 uppercase tracking-widest text-sm">
                Mục tiêu 2030
              </span>
              <span className="text-white/80 text-sm">
                Hoàn thành 1 triệu căn nhà ở xã hội
              </span>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
