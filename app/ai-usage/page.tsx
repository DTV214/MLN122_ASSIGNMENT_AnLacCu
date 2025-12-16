// src/app/ai-usage/page.tsx
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PenTool, Sparkles, Video, Mic } from "lucide-react";

export default function AIUsagePage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] pt-20 font-sans text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-primary border-primary"
          >
            Minh bạch thông tin
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Sử Dụng Trí Tuệ Nhân Tạo
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dự án này được hỗ trợ bởi các công cụ AI nhằm nâng cao chất lượng
            nội dung và trải nghiệm người dùng. Dưới đây là chi tiết cách chúng
            tôi sử dụng chúng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card cho ChatGPT */}
          <Card className="border-2 border-green-100 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader className="bg-green-50/50 border-b border-green-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl text-green-700">
                  <PenTool size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Chat GPT</CardTitle>
                  <p className="text-sm text-slate-500">OpenAI - GPT-4o</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Phát triển nội dung:</strong> Hỗ trợ biên soạn, tóm
                  tắt lý thuyết Kinh tế chính trị và viết lời dẫn cho các phần
                  của website.
                </p>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Lên ý tưởng kịch bản:</strong> Xây dựng các tình huống
                  (Scenario) cho Board Game để đảm bảo tính logic và hấp dẫn.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card cho Gemini */}
          <Card className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                  <Search size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Google Gemini
                  </CardTitle>
                  <p className="text-sm text-slate-500">Google DeepMind</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Tìm kiếm dữ liệu:</strong> Tra cứu các số liệu thống
                  kê mới nhất về thị trường bất động sản và các văn bản luật
                  pháp.
                </p>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Tìm kiếm hình ảnh:</strong> Gợi ý và tìm kiếm các
                  nguồn hình ảnh, video minh họa phù hợp cho dự án.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card cho HailuoAI */}
          <Card className="border-2 border-purple-100 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-700">
                  <Video size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">HailuoAI</CardTitle>
                  <p className="text-sm text-slate-500">Video Generation</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Sản xuất video:</strong> Tạo ra các đoạn video minh
                  họa sống động từ văn bản để giải thích các khái niệm trừu
                  tượng.
                </p>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Visual Storytelling:</strong> Chuyển hóa kịch bản
                  thành hình ảnh chuyển động, giúp nội dung trở nên trực quan
                  hơn.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card cho Vbee */}
          <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader className="bg-orange-50/50 border-b border-orange-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-700">
                  <Mic size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Vbee AIVoice
                  </CardTitle>
                  <p className="text-sm text-slate-500">Text to Speech</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Giọng đọc AI:</strong> Chuyển đổi nội dung văn bản
                  thành giọng nói tự nhiên, truyền cảm cho các video thuyết
                  minh.
                </p>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  <strong>Đa dạng hóa trải nghiệm:</strong> Cung cấp tính năng
                  nghe nội dung cho người dùng, tăng cường khả năng tiếp cận
                  thông tin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}
