"use client";

import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Quote, BookOpen, Bookmark, Square } from "lucide-react";
// Đã thay đổi import để sử dụng cấu trúc mới
import { BOOK_PAGES, ContentBlock, BookPage } from "@/lib/data";

/* =======================
   Types & Interfaces (Đã cập nhật)
======================= */

type PageProps = {
  // Thay đổi type item từ BookConcept cũ sang BookPage mới
  pageData: BookPage;
};

// Sử dụng React.ComponentPropsWithRef để đảm bảo ref type chính xác cho div
type DivProps = React.ComponentPropsWithRef<"div">;

/* =======================
   Block Rendering Functions
======================= */

// Hàm render từng khối nội dung
const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case "chapter-header":
      return (
        <h1
          key={index}
          className="text-2xl md:text-3xl font-black text-[#3E2723] leading-snug tracking-wider uppercase mb-4 mt-2 border-b-2 border-[#8D6E63]/30 pb-2"
        >
          {block.content}
        </h1>
      );
    case "section-title":
      return (
        <h2
          key={index}
          className="text-lg md:text-xl font-bold text-[#5D4037] leading-tight mt-4 mb-2 border-l-4 border-[#FF9800] pl-3"
        >
          {block.content}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={index}
          className="text-sm text-[#4E342E] leading-relaxed text-justify mb-3"
        >
          {block.content}
        </p>
      );
    case "image":
      if (!block.src) return null;
      return (
        <div
          key={index}
          className="relative w-full aspect-video rounded-md overflow-hidden border border-[#8D6E63]/20 shadow-sm flex-shrink-0 my-3"
        >
          <Image
            src={block.src}
            alt={block.caption || "Illustration"}
            fill
            className="object-cover sepia-[.25] hover:sepia-0 transition-all duration-500"
            unoptimized // Sử dụng cho các URL từ cloudinary
          />
          {block.caption && (
            <span className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] text-center p-0.5 italic">
              {block.caption}
            </span>
          )}
        </div>
      );
    case "quote":
      return (
        <div
          key={index}
          className="bg-[#FFF3E0] p-3 rounded-r-md border-l-4 border-[#FF9800] relative my-3 shadow-sm"
        >
          <Quote
            size={12}
            className="absolute top-2 left-2 text-[#FF9800]/40"
          />
          <p className="text-xs text-[#5D4037] italic pl-3 leading-snug">
            {block.content}
          </p>
          {block.source && (
            <p className="text-[10px] text-[#8D6E63] text-right mt-1 font-bold">
              — {block.source}
            </p>
          )}
        </div>
      );
    case "connection-box":
      return (
        <div
          key={index}
          className="mt-4 pt-4 border-t border-[#8D6E63]/10"
        >
          <div className="bg-[#3E2723] text-[#FFE0B2] p-3 rounded-md shadow-md relative group">
            <div className="absolute -top-3 left-4 bg-[#FFB74D] text-[#3E2723] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Bookmark size={10} fill="currentColor" />
              {block.title || "LIÊN HỆ"}
            </div>
            <p className="text-xs leading-relaxed opacity-90 mt-1 group-hover:opacity-100 transition-opacity">
              {block.content}
            </p>
          </div>
        </div>
      );
    case "list-item":
      return (
        <div key={index} className="flex items-start text-sm text-[#4E342E] leading-relaxed mb-1.5 ml-2">
          <Square size={6} fill="#5D4037" className="mt-2 mr-2 flex-shrink-0" />
          <span className={block.emphasis ? "font-semibold" : ""}>{block.content}</span>
        </div>
      );
    default:
      return null;
  }
};

/* =======================
   Cover Page (Bìa Sách) - Giữ nguyên
======================= */

const Cover = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      data-density="hard"
      className="bg-[#5D4037] text-[#FFE0B2] p-8 h-full flex flex-col items-center justify-center border-r-8 border-r-[#3E2723] rounded-r-md shadow-2xl overflow-hidden"
    >
      <div className="border-4 border-[#FFE0B2]/30 p-6 w-full h-full flex flex-col items-center justify-center rounded-sm relative">
        {/* Decorative Corners */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FFE0B2]/50" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FFE0B2]/50" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FFE0B2]/50" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FFE0B2]/50" />

        <BookOpen size={56} className="mb-8 text-[#FFCC80]" />

        <h1 className="text-3xl md:text-4xl  font-black text-center mb-6 uppercase tracking-widest leading-snug drop-shadow-md">
          Lý Luận <br />
          <span className="text-lg font-sans font-normal my-2 block text-[#FFCC80]">
            &
          </span>
          Thực Tiễn
        </h1>

        <div className="w-12 h-1 bg-[#FFCC80] mb-6 rounded-full" />

        <p className="text-center  italic text-sm md:text-base opacity-90 max-w-[80%]">
          Kinh tế thị trường định hướng XHCN tại Việt Nam
        </p>

        <div className="mt-auto mb-4 text-xs font-bold uppercase tracking-[0.2em] bg-[#3E2723]/60 px-4 py-2 rounded-full border border-[#FFCC80]/20">
          Nhóm MLN122
        </div>
      </div>
    </div>
  );
});

Cover.displayName = "Cover";

/* =======================
   Content Page (Trang Nội Dung) - Đã thay đổi logic
======================= */

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  // Nhận pageData thay vì number và item
  ({ pageData }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-[#FFF8E1] h-full shadow-inner border-r border-[#E0E0E0] relative overflow-hidden flex flex-col"
      >
        {/* Paper Texture Overlay (Giữ nguyên uniform texture) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none mix-blend-multiply" />

        <div className="relative z-10 flex flex-col h-full p-6 md:p-8">

          {/* Header: Chapter Title & Page Number */}
          <div className="flex justify-between items-end border-b-2 border-[#8D6E63]/30 pb-2 mb-4">
            <span className=" font-bold text-[#8D6E63] text-xs uppercase tracking-widest">
              {pageData.chapterTitle}
            </span>
            <span className=" font-black text-[#D7CCC8] text-4xl leading-none -mb-1">
              {pageData.pageNumber.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Body Content Container */}
          {/* Lớp div này dùng để cuộn (nếu nội dung quá dài) và chứa tất cả blocks */}
          <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#8D6E63]/50 scrollbar-track-transparent pr-1">

            {/* DUYỆT QUA CÁC BLOCK VÀ RENDER */}
            {pageData.blocks.map((block, index) => renderBlock(block, index))}

          </div>

          {/* Footer: Page Number Centered Bottom (Dùng absolute position vì body đã có scroll) */}
          <div className="text-center mt-2 pt-2 border-t border-[#8D6E63]/10">
            <span className="text-[10px] text-[#A1887F] ">
              - {pageData.pageNumber} -
            </span>
          </div>
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

/* =======================
   Back Cover (Bìa Sau) - Giữ nguyên
======================= */

const BackCover = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="bg-[#5D4037] p-10 h-full border-l-8 border-l-[#3E2723] rounded-l-md flex items-center justify-center shadow-2xl"
    >
      <div className="text-[#FFE0B2]/30  font-bold text-xl uppercase tracking-[0.3em] rotate-90 md:rotate-0">
        Hết
      </div>
    </div>
  );
});
BackCover.displayName = "BackCover";

/* =======================
   Main Component
======================= */

export function ConceptBook() {
  const bookRef = useRef(null);

  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden flex flex-col items-center justify-center min-h-[100vh]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#333_0%,_#000_100%)] opacity-80" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-8 text-center px-4">
        <Badge
          variant="outline"
          className="text-[#FFB74D] border-[#FFB74D] mb-4 px-4 py-1 tracking-widest uppercase text-xs"
        >
          Tư Liệu Học Tập
        </Badge>
        <h2 className="text-3xl md:text-5xl  font-bold text-white mb-4 drop-shadow-lg">
          Cẩm Nang Lý Luận
        </h2>
        <p className="text-[#9E9E9E] max-w-lg mx-auto text-sm md:text-base">
          Lật mở từng trang để hiểu rõ nền tảng tư tưởng đằng sau các chính sách
          kinh tế vĩ mô.
        </p>
      </div>

      {/* Book Container */}
      <div className="relative z-10 flex justify-center items-center w-full max-w-[95vw]">
        <HTMLFlipBook
          width={380} // Tối ưu kích thước trang
          height={580}
          size="fixed" // Giữ kích thước cố định để layout không bị vỡ
          minWidth={300}
          maxWidth={500}
          minHeight={450}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-2xl"
          ref={bookRef}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          swipeDistance={30}
          clickEventForward={true}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          style={{}}
          useMouseEvents={true}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Bìa trước */}
          <Cover />

          {/* Các trang nội dung */}
          {/* Đã thay đổi map từ BOOK_CONCEPTS sang BOOK_PAGES */}
          {BOOK_PAGES.map((pageData) => (
            // Chỉ truyền pageData mới vào component
            <Page key={pageData.pageNumber} pageData={pageData} />
          ))}

          {/* Bìa sau */}
          <BackCover />
        </HTMLFlipBook>
      </div>

      {/* Footer Instruction */}
      <p className="text-[#757575] text-xs md:text-sm mt-8 animate-pulse font-mono">
        (Kéo hoặc click vào mép sách để lật trang)
      </p>
    </section>
  );
}