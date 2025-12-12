"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export function ProvocationSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background họa tiết chìm */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex p-4 rounded-full bg-yellow-500/20 mb-8 ring-1 ring-yellow-500/50">
            <HelpCircle size={48} className="text-yellow-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black  mb-8 leading-tight tracking-tight">
            Nếu để thị trường tự điều tiết, liệu người thu nhập thấp có bao giờ
            mua được nhà?
          </h2>

          <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8 rounded-full"></div>

          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Đây là <span className="text-white font-bold">khuyết tật</span> của
            bàn tay vô hình. Khi lợi nhuận là thước đo duy nhất, doanh nghiệp sẽ
            bỏ quên sứ mệnh xã hội.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
