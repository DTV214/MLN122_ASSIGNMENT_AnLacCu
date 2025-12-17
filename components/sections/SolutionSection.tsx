"use client";

import { SOLUTIONS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Percent,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export function SolutionSection() {
  // Hàm lấy màu sắc riêng cho từng giải pháp để tạo sự phân tách rõ ràng
  const getTheme = (id: string) => {
    switch (id) {
      case "dat-dai":
        return "from-amber-500 to-orange-600"; // Màu Đất
      case "thue":
        return "from-blue-500 to-indigo-600"; // Màu Tiền tệ/Thuế
      case "tin-dung":
        return "from-emerald-500 to-green-600"; // Màu Tín dụng/Hy vọng
      default:
        return "from-primary to-red-600";
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "dat-dai":
        return <MapPin className="w-8 h-8 text-white" />;
      case "thue":
        return <Percent className="w-8 h-8 text-white" />;
      case "tin-dung":
        return <CreditCard className="w-8 h-8 text-white" />;
      default:
        return <CheckCircle2 className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section className="py-24 px-4 md:px-10 bg-[#fdfbf7] relative overflow-hidden">
      {/* Nền trang trí: Họa tiết lưới mờ */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 border-primary/50 text-primary font-bold tracking-widest uppercase bg-primary/5"
          >
            {" "}
            Phần III: Giải Pháp Vĩ Mô
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            Chi Tiết Công Cụ Kinh tế Điều Hoà Lợi Ích
          </h2>
          <div className="w-32 h-2 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Nhà nước cần sử dụng đồng bộ
            <span className="font-bold text-foreground">
              {" "}
              3 công cụ điều tiết{" "}
            </span>
            nhằm bù đắp lợi ích và định hướng lại dòng vốn thị trường.
          </p>
        </div>

        {/* Cards Container - Grid Layout thay vì Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SOLUTIONS.map((sol, index) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group relative"
            >
              {/* Card Chính */}
              <div className="h-full bg-white rounded-2xl p-8 pt-16 shadow-lg border border-slate-100 relative overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                {/* Đường viền trang trí trên cùng */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getTheme(
                    sol.id
                  )}`}
                />

                {/* Icon nổi (Floating Icon) */}
                <div
                  className={`absolute -top-6 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${getTheme(
                    sol.id
                  )} shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {getIcon(sol.id)}
                </div>

                {/* Số thứ tự chìm */}
                <div className="absolute top-4 right-6 text-6xl font-black text-slate-100 -z-0 select-none font-serif">
                  0{index + 1}
                </div>

                {/* Nội dung */}
                <div className="relative z-10 mt-4">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {sol.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-justify mb-6">
                    {sol.description}
                  </p>

                  {/* Phần "Kết quả" giả định - Dấu đóng dấu */}
                  <div className="mt-auto pt-6 border-t border-dashed border-slate-200">
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-lg w-fit">
                      <ShieldCheck size={18} />
                      <span>Hiệu quả: Cao</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kết luận / Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 p-8 md:p-12 bg-foreground text-white rounded-3xl relative overflow-hidden text-center shadow-2xl"
        >
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl  font-bold mb-4 text-yellow-500">
              Mục tiêu cuối cùng: Kinh tế thị trường định hướng xã hội chủ nghĩa
              ở Việt Nam
            </h3>
            <p className="text-slate-300 max-w-2xl text-lg mb-8">
              Khi ba công cụ này được vận hành đồng bộ, Nhà ở xã hội sẽ trở
              thành một lĩnh vực đầu tư hấp dẫn, giải quyết bài toán nhà ở cho
              hàng triệu người dân.
            </p>
            {/* <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-900/20 flex items-center gap-2 transition-all hover:scale-105">
              Xem mô phỏng kết quả <ArrowRight size={20} />
            </button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
