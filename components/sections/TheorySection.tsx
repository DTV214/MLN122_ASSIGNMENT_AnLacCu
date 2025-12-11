"use client";

import React from "react";
import { THEORY_COMPARISON } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Scale, Landmark, Users, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

export function TheorySection() {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6 text-white" />;
      case 1:
        return <Landmark className="w-6 h-6 text-white" />;
      case 2:
        return <Scale className="w-6 h-6 text-white" />;
      default:
        return <Scale className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="py-24 px-4 md:px-10 bg-[#fdfbf7]">
      {" "}
      {/* Màu nền giấy cũ nhẹ */}
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-primary/50 text-primary font-bold tracking-widest uppercase bg-primary/5"
          >
            Phần II: Cơ Sở Lý Luận
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            Đối Chiếu Hai Hệ Tư Tưởng
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-slate-400 to-red-600 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg italic ">
            Sự khác biệt không chỉ nằm ở cách quản lý, mà nằm ở mục tiêu cuối
            cùng: <br />
            <span className="font-semibold text-slate-600">
              Lợi nhuận
            </span> hay{" "}
            <span className="font-semibold text-red-600">Con người</span>?
          </p>
        </div>

        {/* Comparison Content - Dạng danh sách liền mạch */}
        <div className="space-y-12">
          {THEORY_COMPARISON.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Tiêu đề tiêu chí nằm đè lên trên khung (Floating Title) */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-white border-2 border-primary/10 px-6 py-2 rounded-full font-bold text-lg shadow-sm text-foreground whitespace-nowrap">
                  {item.criteria}
                </span>
              </div>

              {/* Main Card Container - Split Layout */}
              <div className="flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                {/* Cột Trái: Tư Bản CN (Tông Xám/Lạnh - Biểu trưng cho sự khô khan, lý trí) */}
                <div className="flex-1 bg-slate-100 p-8 md:p-10 pt-12 md:text-right relative group-hover:bg-slate-200 transition-colors duration-500">
                  <div className="mb-4 flex items-center justify-end gap-2 md:hidden">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      KTTT Tư Bản CN
                    </span>
                  </div>
                  <h4 className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                    KTTT Tư Bản CN
                  </h4>
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                    {item.capitalism}
                  </p>
                </div>

                {/* Trục giữa: Icon kết nối */}
                <div className="relative h-12 md:h-auto md:w-16 bg-gradient-to-b from-slate-200 to-red-100 flex items-center justify-center z-10">
                  {/* Vòng tròn chứa Icon */}
                  <div className="absolute bg-gradient-to-br from-slate-600 to-red-600 p-3 rounded-full shadow-lg border-4 border-white transform md:group-hover:scale-110 transition-transform duration-300">
                    {getIcon(index)}
                  </div>
                  {/* Đường kẻ dọc nối (chỉ hiện trên desktop) */}
                  <div className="hidden md:block absolute w-0.5 h-full bg-slate-300/50 -z-10" />
                </div>

                {/* Cột Phải: Định Hướng XHCN (Tông Đỏ/Ấm - Biểu trưng cho sự tiến bộ, con người) */}
                <div className="flex-1 bg-red-50/80 p-8 md:p-10 pt-12 relative group-hover:bg-red-100/80 transition-colors duration-500">
                  <div className="mb-4 flex items-center gap-2 md:hidden">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                      KTTT ĐH XHCN
                    </span>
                  </div>
                  <h4 className="hidden md:block text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
                    KTTT ĐH XHCN
                  </h4>
                  <p className="text-lg md:text-xl text-red-900 leading-relaxed font-semibold">
                    {item.socialism}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kết luận nhỏ phía dưới */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-md border border-border text-muted-foreground">
            <ArrowRightLeft className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">
              Sự chuyển dịch từ{" "}
              <span className="underline decoration-slate-400 decoration-2">
                Lợi nhuận riêng
              </span>{" "}
              sang{" "}
              <span className="underline decoration-red-400 decoration-2">
                Lợi ích chung
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
