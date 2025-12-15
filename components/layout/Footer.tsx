export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)] py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-2xl  font-bold">
          {" "}
          Kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam
        </h3>
        <p className="opacity-80 font-sans">
          Đồ án sáng tạo bộ môn MLN122 - Kinh tế Chính trị Mác - Lênin
        </p>
        <div className="w-16 h-px bg-white/20 mx-auto my-6" />
        <p className="text-sm opacity-60">© 2025 Nhóm nghiên cứu</p>
      </div>
    </footer>
  );
}
