import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Font Sans (Hiện đại, dễ đọc cho nội dung chính)
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

// Font Serif (Cổ điển, trang trọng cho tiêu đề)
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "An Cư Lạc Nghiệp | MLN122 Project",
  description: "Phân tích thị trường Bất động sản dưới góc nhìn KTCT Mác-Lênin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-white`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
