"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link để chuyển trang
import { DETAILED_NEWS } from "@/lib/data"; // Import dữ liệu chung

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, ExternalLink, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

export function NewsSection() {
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("all");

  // Giả lập loading spinner
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Logic lọc bài viết (Sử dụng DETAILED_NEWS từ file data)
  const filteredNews =
    filter === "all"
      ? DETAILED_NEWS
      : DETAILED_NEWS.filter((item) => item.type === filter);

  return (
    <section
      id="tin-tuc"
      className="py-20 px-4 md:px-10 bg-background border-t border-border/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
          <div>
            <Badge
              variant="secondary"
              className="mb-2 text-primary font-bold tracking-widest uppercase"
            >
              Thư Viện Tư Liệu
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Tin Tức & Sự Kiện
            </h2>
          </div>

          {/* Combo Box (Select) */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
            <div className="pl-3 text-muted-foreground">
              <Newspaper size={18} />
            </div>
            <Select onValueChange={setFilter} defaultValue="all">
              <SelectTrigger className="w-[180px] border-0 focus:ring-0 shadow-none font-medium">
                <SelectValue placeholder="Lọc theo nguồn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nguồn</SelectItem>
                <SelectItem value="gov">Báo Chính Phủ</SelectItem>
                <SelectItem value="press">Báo Chí & Đời Sống</SelectItem>
                <SelectItem value="research">
                  Nghiên Cứu & Chính Sách
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading
            ? // Skeleton Loading Effect
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2 p-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))
            : // Render News Cards
              filteredNews.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-card">
                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          className={`
                            ${
                              item.type === "gov"
                                ? "bg-red-600"
                                : item.type === "press"
                                ? "bg-blue-600"
                                : "bg-green-600"
                            } 
                            text-white shadow-sm hover:opacity-90`}
                        >
                          {item.source}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="flex-1 p-5 pt-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                        <CalendarDays size={14} />
                        <span>{item.date}</span>
                      </div>

                      <h3 className="text-xl  font-bold leading-tight mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.summary}
                      </p>
                    </CardContent>

                    <CardFooter className="p-5 pt-0 border-t border-slate-50 mt-auto bg-slate-50/50">
                      {/* SỬA LỖI QUAN TRỌNG: Dùng Link chuyển hướng sang trang chi tiết */}
                      <Link href={`/news/${item.slug}`} className="w-full">
                        <button className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all w-full pt-4">
                          Đọc chi tiết <ExternalLink size={14} />
                        </button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-slate-300">
            <p className="text-muted-foreground">
              Không tìm thấy bài viết nào thuộc danh mục này.
            </p>
          </div>
        )}

        {/* Pagination */}
        {/* <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="hover:bg-primary/10 hover:text-primary"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="border-primary text-primary bg-primary/5 font-bold"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="hover:bg-primary/10 hover:text-primary"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </section>
  );
}
