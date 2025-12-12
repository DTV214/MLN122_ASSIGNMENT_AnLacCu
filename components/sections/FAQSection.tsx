"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function FAQSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 text-slate-500">
            Góc nhìn chuyên gia
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Hỏi Đáp Thường Gặp
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="border rounded-xl px-4 shadow-sm"
          >
            <AccordionTrigger className="text-lg font-bold text-slate-800 hover:text-primary text-left">
              Tại sao Nhà nước không ép giá bán nhà xuống thấp?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed pb-4">
              Vì Việt Nam đang vận hành nền <strong>kinh tế thị trường</strong>.
              Việc ép giá bằng mệnh lệnh hành chính là vi phạm quy luật giá trị
              và quyền tự do kinh doanh (Hiến pháp 2013). Thay vào đó, Nhà nước
              dùng chính sách thuế và đất đai để tác động gián tiếp, giúp giảm
              giá thành đầu vào để doanh nghiệp tự nguyện giảm giá bán.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border rounded-xl px-4 shadow-sm"
          >
            <AccordionTrigger className="text-lg font-bold text-slate-800 hover:text-primary text-left">
              Làm thế nào để Doanh nghiệp mặn mà với Nhà ở xã hội?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed pb-4">
              Bài toán là <strong>Lợi nhuận</strong>. Nhà nước cần bù đắp phần
              lợi nhuận bị thiếu hụt so với làm nhà thương mại bằng cách: Miễn
              tiền sử dụng đất, Giảm 50% thuế VAT/TNDN, và Hỗ trợ vay vốn lãi
              suất thấp. Khi biên lợi nhuận của NOXH đạt mức hấp dẫn (khoảng
              10-14%), doanh nghiệp sẽ tự tìm đến.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border rounded-xl px-4 shadow-sm"
          >
            <AccordionTrigger className="text-lg font-bold text-slate-800 hover:text-primary text-left">
              Gói 120.000 tỷ đồng có thực sự đến tay người dân?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed pb-4">
              Đây là thách thức về khâu tổ chức thực hiện. Dù chủ trương đúng,
              nhưng thủ tục pháp lý phức tạp và điều kiện vay khắt khe đang là
              rào cản. Cần đơn giản hóa thủ tục hành chính và nới lỏng điều kiện
              chứng minh thu nhập để dòng vốn này thực sự đi vào đời sống.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
