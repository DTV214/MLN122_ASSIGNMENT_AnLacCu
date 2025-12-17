// src/lib/data.ts

export const SITE_CONFIG = {
  title: "Kinh tế thị trường định hướng xã hội chủ nghĩa ở Việt Nam",
  subtitle: "Góc nhìn Kinh tế Chính trị Mác - Lênin ",
  author: "Nhóm nghiên cứu MLN122",
};

// Dữ liệu cho Banner Carousel (Lấy từ tên các file ảnh bạn gửi)
export const CAROUSEL_ITEMS = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765760293/gia-tri-khoa-hoc-cach-mang-thoi-dai-cua-chu-nghia-mac-lenin-tu-tuong-ho-chi-minh-20240517160529_ueutf3.jpg",
    title: "Kinh tế Chính trị Mác - Lênin",
    source: "Triết học",
    date: "10/12/2025",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765759774/kinh-te-chinh-tri-1_s8ejtc.jpg",
    title: "Lương 40 triệu bất lực trước căn hộ 5 tỷ",
    source: "VnExpress",
    date: "13/10/2025",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765760089/xdcs.cdnchinhphu.vn-446259493575335936-2023-2-24-_chinh-sach-moi-anh-huong-den-thi-truong-bat-dong-san1602162451-16772104701281575851658-0-0-469-750-crop-1677210493773365030217_nboaoh.png",
    title: "Hụt hơi mua nhà TPHCM: 80 triệu/m2",
    source: "VnExpress - Góc nhìn",
    date: "20/10/2025",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420954/xe-om-cong-nghe-anh-ngoc-duong-5-17476713220331874471141-31-0-1012-1570-crop-17476713489361966899068_bnkgqj.jpg",
    title: "Người dân chật vật tìm chỗ an cư",
    source: "Báo Lao Động",
    date: "06/04/2025",
  },
];

// Dữ liệu Phần 1: Thực trạng
export const REALITY_SECTION = {
  heading: "Khi Thị Trường Bỏ Quên Người Nghèo",
  stats: [
    {
      label: "Thu nhập TB (Người trẻ)",
      value: "10 - 15",
      unit: "Triệu VNĐ/tháng",
      source: "Navigos Group 2025",
    },
    {
      label: "Giá chung cư (TP.HCM)",
      value: "80", // Cập nhật từ bài báo Giao Linh
      unit: "Triệu VNĐ/m2",
      source: "VnExpress 10/2025",
    },
    {
      label: "Mức độ chênh lệch",
      value: "30 - 40",
      unit: "Năm tích lũy",
      source: "Tính toán dựa trên thu nhập thực tế",
    },
  ],
  content: [
    {
      title: "Chung cư giá rẻ khan hiếm, người dân chật vật tìm chỗ an cư ",
      description:
        "Giá căn hộ chung cư tại Hà Nội liên tục lập đỉnh, đẩy mức giá trung bình vượt 75 triệu đồng/m2.",
      highlight:
        "Nguồn cung ngày càng khan hiếm, khiến nhiều người khó tìm được chỗ an cư",
      link: "/concepts/market-failure", // Link tới trang giải thích khái niệm
    },
    {
      title: "Giá chung cư tại Hà Nội và TPHCM trung bình từ 50 – 70 triệu/m2",
      description:
        "Thị trường căn hộ tiếp tục thu hút quan tâm. Giá bán trung bình một số dự án dao động ở mức cao kỷ lục, gây áp lực lớn lên nguồn cung NOXH.",
      highlight:
        "Trung bình một dự án tại TP.HCM và TP.Hà Nội có giá từ 50-70 triệu/m2",
      link: "/concepts/invisible-hand",
    },
  ],
};
export const THEORY_QUOTES = [
  {
    text: "Không ‘hy sinh’ tiến bộ và công bằng xã hội để chạy theo tăng trưởng kinh tế đơn thuần.",
    author: "Tổng Bí thư Nguyễn Phú Trọng",
    work: "Một số vấn đề lý luận và thực tiễn về CNXH...",
  },
];
// Dữ liệu Phần 2: So sánh Lý luận
export const THEORY_COMPARISON = [
  {
    criteria: "Mục đích tối thượng",
    capitalism:
      "Tối đa hóa lợi nhuận cho nhà tư bản. Duy trì sự thống trị của giai cấp tư sản.",
    socialism:
      "Cải thiện đời sống nhân dân. 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
  },
  {
    criteria: "Quan hệ với Công bằng XH",
    capitalism:
      "Công bằng xã hội chỉ là phương tiện để duy trì ổn định, giúp CNTB tồn tại.",
    socialism:
      "Công bằng xã hội là MỤC TIÊU, phải hiện thực hóa ngay trong từng bước đi và chính sách phát triển.",
  },
  {
    criteria: "Vai trò Nhà nước",
    capitalism: "Bảo vệ lợi ích của các tập đoàn độc quyền.",
    socialism:
      "Nhà nước pháp quyền XHCN điều tiết nhằm khắc phục khuyết tật thị trường, đảm bảo định hướng XHCN.",
  },
];
// Dữ liệu Phần 3: Giải pháp
export const SOLUTIONS = [
  {
    id: "dat-dai",
    title: "Công cụ Đất đai",
    icon: "MapPin",
    description:
      "Giao đất sạch, hoặc miễn/giảm tiền sử dụng đất, tiền thuê đất cho các dự án NOXH",
    legalRef: "Luật Đất đai 2024 & Nghị định 100",
    detail:
      "Đất đai chiếm tỷ trọng lớn trong giá thành. Việc miễn tiền sử dụng đất là đòn bẩy mạnh nhất để hạ giá bán về mức 15-20 triệu/m2.",
  },
  {
    id: "thue",
    title: "Công cụ Thuế",
    icon: "Percent",
    description:
      "Ưu đãi thuế TNDN và VAT (5%) cho chủ đầu tư NOXH. Tăng lợi nhuận ròng để thu hút doanh nghiệp.",
    legalRef: "Luật Thuế TNDN & Luật Thuế GTGT (sửa đổi 2025)",
    detail:
      "Khi chi phí thuế giảm, biên lợi nhuận của dự án NOXH sẽ tăng lên, giúp nó trở nên hấp dẫn hơn so với làm nhà thương mại.",
  },
  {
    id: "tin-dung",
    title: "Quỹ Nhà ở Quốc gia",
    icon: "CreditCard",
    description:
      " Cung cấp Gói tín dụng ưu đãi (lãi suất thấp, thời gian vay dài) cho Doanh nghiệp và Người mua NOXH",
    legalRef: "Đề xuất Bộ Xây dựng",
    detail:
      "Giải quyết bài toán vốn bền vững, giúp người dân có lãi suất thấp ổn định để yên tâm trả góp.",
  },
];
// src/lib/data.ts
export const CONCEPTS = [
  {
    slug: "market-failure",
    title: "Chung cư giá rẻ khan hiếm, người dân chật vật tìm chỗ an cư",
    // Ảnh thực tế bạn đã cung cấp
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765759659/B%C3%A0i_b%C3%A1o_4-2025_1_futajc.png",
    content:
      "Là tình huống mà thị trường tự do không phân bổ nguồn lực một cách hiệu quả. Trong BĐS, thị trường chỉ tập trung xây nhà cho người giàu (vì lợi nhuận cao), bỏ qua nhu cầu thiết yếu của người nghèo, dẫn đến bất bình đẳng và bất ổn xã hội. Lúc này cần sự can thiệp của Nhà nước.",
  },
  {
    slug: "invisible-hand",
    title: "Giá chung cư tại Hà Nội và TPHCM trung bình từ 50 – 70 triệu/m2",
    // Ảnh minh họa khái niệm kinh tế
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765759667/B%C3%A0i_b%C3%A1o_2024_kfkixv.png",
    content:
      "Ẩn dụ về cơ chế tự điều chỉnh của thị trường thông qua cung cầu và giá cả. Tuy nhiên, trong chủ nghĩa tư bản, bàn tay này thường 'mù' trước các vấn đề xã hội và môi trường, chỉ biết chạy theo lợi nhuận.",
  },
  {
    slug: "socialist-orientation",
    title: "Giá chung cư tại Hà Nội và TPHCM trung bình từ 50 – 70 triệu/m2",
    // Ảnh minh họa cờ/biểu tượng
    image:
      "https://images.unsplash.com/photo-1574689049743-1d4e73cc3a27?q=80&w=1000&auto=format&fit=crop",
    content:
      "Là mô hình kinh tế vừa tuân thủ quy luật thị trường, vừa có sự quản lý của Nhà nước pháp quyền XHCN để đảm bảo tăng trưởng kinh tế đi đôi với tiến bộ và công bằng xã hội, không để ai bị bỏ lại phía sau.",
  },
];

export const DETAILED_NEWS = [
  {
    id: 1,
    slug: "gia-nha-lap-dinh-chinh-phu",
    title: "Giá chung cư tại Hà Nội và TPHCM trung bình từ 50 – 70 triệu/m2",
    source: "Báo Chính Phủ",
    type: "gov",
    date: "10/12/2025",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary:
      "Thị trường căn hộ tiếp tục thu hút quan tâm. Giá bán trung bình một số dự án dao động ở mức cao kỷ lục, gây áp lực lớn lên nguồn cung NOXH.",
    // THÊM PHẦN NÀY ĐỂ HẾT LỖI
    analysis: {
      perspective: "Vai trò quản lý của Nhà nước",
      content:
        "Thừa nhận thực trạng giá nhà vượt xa giá trị thực là bước đầu tiên để Nhà nước thực hiện vai trò điều tiết vĩ mô. Khi thị trường thất bại trong việc phân phối công bằng, Nhà nước phải can thiệp để ổn định an sinh.",
    },
  },
  {
    id: 2,
    slug: "luong-40-trieu-bat-luc",
    title: "Tôi lương 40 triệu bất lực trước căn hộ Sài Gòn 5 tỷ đồng",
    source: "VnExpress - Góc nhìn",
    type: "press",
    date: "13/10/2025",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary:
      "Thị trường chung cư dường như chỉ đang nói chuyện với người giàu. Với thu nhập thuộc hàng khá, tôi vẫn không dám mơ về ngôi nhà riêng.",
    analysis: {
      perspective: "Bần cùng hóa tương đối",
      content:
        "Dù thu nhập 40 triệu là cao, nhưng so với tốc độ tích lũy của tư bản (giá BĐS), người lao động ngày càng nghèo đi tương đối. Giá trị sức lao động không đuổi kịp đà tăng của địa tô.",
    },
  },
  {
    id: 3,
    slug: "chung-cu-gia-re-khan-hiem",
    title: "Chung cư giá rẻ khan hiếm, người dân chật vật tìm chỗ an cư",
    source: "Báo Lao Động",
    type: "press",
    date: "06/04/2025",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary:
      "Nguồn cung ngày càng khan hiếm khiến nhiều người khó tìm được chốn an cư phù hợp dù có trong tay 3-4 tỉ đồng tích lũy.",
    analysis: {
      perspective: "Mâu thuẫn Cung - Cầu",
      content:
        "Các nhà tư bản bất động sản chỉ tập trung vào phân khúc cao cấp để tối đa hóa lợi nhuận (siêu ngạch), bỏ qua nhu cầu thực của đa số dân chúng (phân khúc bình dân).",
    },
  },
  {
    id: 4,
    slug: "mien-tien-su-dung-dat",
    title: "Miễn tiền sử dụng đất để thúc đẩy dự án Nhà ở xã hội",
    source: "Tạp chí Xây Dựng",
    type: "research",
    date: "24/12/2024",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary:
      "Phân tích tác động của chính sách đất đai đến giá thành NOXH. Giải pháp then chốt để giảm giá bán về mức 15-20 triệu/m2.",
    analysis: {
      perspective: "Công cụ điều tiết vĩ mô",
      content:
        "Sử dụng công cụ Đất đai (giảm chi phí đầu vào) là biện pháp can thiệp trực tiếp của Nhà nước vào quan hệ sản xuất, nhằm định hướng lại thị trường theo mục tiêu Xã hội chủ nghĩa.",
    },
  },
  {
    id: 5,
    slug: "hut-hoi-mua-nha-80-trieu",
    title: "Hụt hơi mua nhà TP HCM: 80 triệu đồng một m2",
    source: "VnExpress",
    type: "press",
    date: "20/10/2025",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary:
      "Đi xem dự án mới mở bán, môi giới chỉ tập trung vào 'tiềm năng tăng giá' thay vì tiện ích sống. Mua nhà trở thành bài toán bất khả thi.",
    analysis: {
      perspective: "Giá trị sử dụng vs Trao đổi",
      content:
        "Thị trường bị méo mó bởi đầu cơ. Người ta chỉ quan tâm đến 'Giá trị trao đổi' (bán lại kiếm lời) mà quên đi 'Giá trị sử dụng' (để ở), biến nhà ở thành công cụ tài chính.",
    },
  },
  {
    id: 6,
    slug: "bao-cao-mln122",
    title: "Báo cáo: Tác động của Kinh tế thị trường đến An sinh xã hội",
    source: "Nghiên cứu MLN122",
    type: "research",
    date: "15/11/2025",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary:
      "Tổng hợp số liệu và phân tích lý luận về sự lệch pha cung cầu trong thị trường bất động sản Việt Nam giai đoạn 2020-2025.",
    analysis: {
      perspective: "Tổng quan lý luận",
      content:
        "Sự xung đột giữa quy luật lợi nhuận của Kinh tế thị trường và mục tiêu công bằng của Chủ nghĩa xã hội yêu cầu phải có sự hoàn thiện về thể chế kinh tế.",
    },
  },
];

// ===============================================
// Cấu trúc Dữ liệu MỚI: Block-based Pages
// ===============================================

export type BlockType =
  | "chapter-header"
  | "section-title"
  | "paragraph"
  | "image"
  | "quote"
  | "connection-box"
  | "list-item";

export interface ContentBlock {
  type: BlockType;
  content?: string;
  src?: string; // Dành cho type "image"
  caption?: string; // Dành cho type "image"
  author?: string; // Dành cho type "quote"
  source?: string; // Dành cho type "quote" (source của quote)
  title?: string; // Dành cho type "connection-box"
  emphasis?: boolean; // Dành cho list-item, để in đậm
}

export interface BookPage {
  pageNumber: number;
  chapterTitle: string;
  blocks: ContentBlock[];
}


/**
 * Dữ liệu sách (9 trang)
 * Content được lấy và cắt/ghép từ file Nd.txt
 */
export const BOOK_PAGES: BookPage[] = [
  // --- TRANG 1: Khái niệm (Giới thiệu chung) ---
  {
    pageNumber: 1,
    chapterTitle: "Phần A: Kinh tế Thị trường Định hướng XHCN",
    blocks: [
      { type: "chapter-header", content: "Chương 5: Lý Luận & Bản Chất" },
      { type: "section-title", content: "I. Khái niệm KTTT Định hướng XHCN" },
      {
        type: "paragraph",
        content: "Mỗi quốc gia có những mô hình kinh tế thị trường khác nhau, không có mô hình kinh tế thị trường chung cho mọi quốc gia"
      },
      {
        type: "paragraph",
        content: "Ở Việt Nam, mô hình đó là kinh tế thị trường Định hướng Xã Hội Chủ Nghĩa, định nghĩa là:"
      },
      {
        type: "quote",
        content:
          "Là nền kinh tế vận hành đầy đủ, đồng bộ theo quy luật thị trường, đồng thời bảo đảm định hướng xã hội chủ nghĩa, nhằm mục tiêu 'dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
        source: "Đại hội XII, Đảng Cộng sản Việt Nam",
      }
    ],
  },

  // --- TRANG 2: Khái niệm & Quá trình hình thành ---
  {
    pageNumber: 2,
    chapterTitle: "Phần A: Kinh tế Thị trường Định hướng XHCN",
    blocks: [
      { type: "section-title", content: "II. Đặc trưng của KTTT ĐH XHCN" },
      {
        type: "image",
        src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768173/1._chu_nghia_xa_hoi_1719367741915_jsur8p.jpg"
      },
      { type: "section-title", content: "1. Mục tiêu phát triển" },
      {
        type: "paragraph",
        content:
          "Mục tiêu phát triển không chỉ là tăng trưởng kinh tế mà còn hướng tới xây dựng cơ sở vật chất - kỹ thuật của chủ nghĩa xã hội và thực hiện mục tiêu 'dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
      },
      {
        type: "connection-box",
        title: "Khác biệt với KTTT TBCN",
        content:
          "Mục tiêu KTTT TBCN là tối đa hóa lợi nhuận cho giai cấp tư sản, giai cấp cầm quyền, còn KTTT ĐH XHCN nhằm mục tiêu nâng cao đời sống nhân dân.",
      },
    ],
  },

  // --- TRANG 3: Đặc trưng: Quan hệ Sở hữu & TPKT (Phần 1) ---
  {
    pageNumber: 3,
    chapterTitle: "Đặc trưng: Sở hữu và Thành phần Kinh tế",
    blocks: [
      {
        type: "section-title",
        content: "2. Quan hệ sở hữu (SH) và Thành phần kinh tế (TPKT)",
      },
      {
        type: "paragraph",
        content:
          "Nước ta có hai loại hình sở hữu cơ bản là Sở hữu Tư nhân và Sở hữu Công cộng đối với tư liệu sản xuất và sản phẩm. Hai loại hình này đan xen với nhau tạo thành hình thức sở hữu hỗn hợp.",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1765760293/gia-tri-khoa-hoc-cach-mang-thoi-dai-cua-chu-nghia-mac-lenin-tu-tuong-ho-chi-minh-20240517160529_ueutf3.jpg",
        caption: "Nền kinh tế nhiều thành phần là biểu hiện bên ngoài của quan hệ sở hữu đa dạng.",
      },
      {
        type: "paragraph",
        content:
          "Mỗi thành phần kinh tế sẽ dựa trên một loại hình sở hữu nhất định, ví dụ:",
      },
      {
        type: "list-item",
        content: "SH Nhà nước: TPKT Nhà nước (Doanh nghiệp nhà nước).",
      },
      {
        type: "list-item",
        content: "SH Tập thể: TPKT Tập thể (Hợp tác xã).",
      },
    ],
  },

  // --- TRANG 4: Đặc trưng: TPKT (Phần 2) và Vai trò ---
  {
    pageNumber: 4,
    chapterTitle: "Đặc trưng: Sở hữu và Thành phần Kinh tế",
    blocks: [
      { type: "list-item", content: "SH Tư nhân: TPKT Tư nhân (Công ty TNHH)." },
      {
        type: "list-item",
        content:
          "SH Hỗn hợp: Hình thức liên doanh liên kết Nhà nước - Tư nhân (Cổ phần hóa doanh nghiệp).",
      },
      { type: "section-title", content: "Vị trí và vai trò" },
      {
        type: "paragraph",
        content:
          "Các thành phần kinh tế bình đẳng, nhưng có vai trò khác nhau trong việc định hướng nền kinh tế:",
      },
      {
        type: "list-item",
        content:
          "Kinh tế Nhà nước (KTNN): Giữ vai trò chủ đạo.",
        emphasis: true,
      },
      {
        type: "list-item",
        content:
          "Kinh tế Tư nhân (KTTN): Là động lực quan trọng cho sự phát triển kinh tế.",
        emphasis: true,
      },
      {
        type: "quote",
        content:
          "Sự khác biệt với KTTT TBCN là KTTN là động lực quan trọng nhất, dẫn dắt định hướng nền KT TBCN.",
        source: "Theo Giáo trình KTCT Mác - Lênin",
      },
    ],
  },

  // --- TRANG 5: Đặc trưng: Quan hệ Quản lý ---
  {
    pageNumber: 5,
    chapterTitle: "Đặc trưng: Vai trò quản lý Nhà nước",
    blocks: [
      {
        type: "section-title",
        content: "3. Về quan hệ quản lý nền kinh tế",
      },
      {
        type: "paragraph",
        content:
          "Sự kết hợp giữa kinh tế thị trường và sự điều tiết của Nhà nước",
      },
      {
        type: "paragraph",
        content:
          "Nhà nước can thiệp vào quá trình kinh tế nhằm khắc phục những hạn chế, khuyết tật của thị trường và định hướng theo mục tiêu đã định.",
      },
      {
        type: "paragraph",
        content:
          "Sự can thiệp được thực hiện bằng pháp luật, chiến lược, quy hoạch, chính sách và công cụ kinh tế (thuế, lãi suất, chi tiêu công), trên cơ sở tôn trọng nguyên tắc thị trường.",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771681/le_nin_1716281116170_izc8la.jpg",
        caption: "Sự điều tiết của Nhà nước là công cụ đảm bảo định hướng XHCN."
      },
      {
        type: "connection-box",
        title: "Khác biệt về bản chất Nhà nước",
        content:
          "Nhà nước VN là nhà nước pháp quyền XHCN (của dân, do dân, vì dân), còn Nhà nước TBCN về bản chất là phục vụ lợi ích của giai cấp tư sản, giai cấp cầm quyền.",
      },
    ],
  },

  // --- TRANG 6: Đặc trưng: Quan hệ Phân phối ---
  {
    pageNumber: 6,
    chapterTitle: "Đặc trưng: Quan hệ Phân phối",
    blocks: [
      { type: "section-title", content: "4. Về quan hệ phân phối" },
      {
        type: "paragraph",
        content:
          "Thực hiện nhiều hình thức phân phối khác nhau, phù hợp với các yếu tố đầu vào và đầu ra của sản xuất:",
      },
      {
        type: "list-item",
        content:
          "Phân phối theo kết quả lao động",
      },
      {
        type: "list-item",
        content:
          "Phân phối theo hiệu quả kinh tế, theo đóng góp vốn",
      },
      {
        type: "list-item",
        content:
          "Phân phối theo phúc lợi tập thể, phúc lợi xã hội",
      },
      {
        type: "connection-box",
        title: "Ví dụ về phân phối theo phúc lợi xã hội",
        content:
          "Công ty trích nộp Bảo hiểm xã hội, Bảo hiểm y tế bắt buộc cho người lao động. Khi người lao động ốm đau hoặc nghỉ hưu, họ sẽ nhận trợ cấp từ Quỹ Bảo hiểm xã hội do Nhà nước quản lý",
      },
    ],
  },

  // --- TRANG 7: Đặc trưng: Tăng trưởng & Công bằng XH ---
  {
    pageNumber: 7,
    chapterTitle: "Đặc trưng: Tăng trưởng và Công bằng XH",
    blocks: [
      {
        type: "section-title",
        content: "5. Về quan hệ gắn tăng trưởng kinh tế với công bằng xã hội",
      },
      {
        type: "quote",
        content:
          "Không thể 'hy sinh' tiến bộ và công bằng xã hội để chạy theo tăng trưởng kinh tế đơn thuần.",
        source: "Tổng Bí thư Nguyễn Phú Trọng",
      },
      {
        type: "paragraph",
        content:
          "Tiến bộ và công bằng xã hội phải được thực hiện ngay trong từng chính sách, chiến lược và từng giai đoạn phát triển để đảm bảo việc phát triển bền vững.",
      },
      {
        type: "paragraph",
        content:
          "Điều này được biểu hiện qua các khía cạnh công bằng thu nhập như chính sách lao động việc làm, chính sách ưu đãi với người có công.",
      },
      {
        type: "image",
        src: "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771493/article_tkzsvc.jpg",
        caption: "Công bằng xã hội vừa là mục tiêu, vừa là điều kiện để phát triển bền vững.",
      },
      {
        type: "connection-box",
        title: "Khác biệt với KTTT TBCN",
        content:
          "Đối với TBCN, giải quyết công bằng xã hội chỉ là mục tiêu thứ cấp để duy trì lợi ích thống trị, chỉ khi có tác động tiêu cực đến CNTB họ mới đặt ra vấn đề.",
      },
    ],
  },

  // --- TRANG 8: Hoàn thiện Thể chế (Khái niệm & Lý do - Phần 1) ---
  {
    pageNumber: 8,
    chapterTitle: "Phần B: Hoàn thiện Thể chế KTTT ĐH XHCN",
    blocks: [
      {
        type: "chapter-header",
        content: "Phần B: Hoàn thiện Thể chế KTTT ĐH XHCN",
      },
      { type: "section-title", content: "I. Các khái niệm cơ bản" },
      {
        type: "connection-box",
        title: "Thể chế kinh tế (TCKT)",
        content:
          "Hệ thống quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành nhằm điều chỉnh hành vi của các chủ thể kinh tế và các quan hệ kinh tế.",
      },
      {
        type: "connection-box",
        title: "TCKT Thị trường Định hướng XHCN",
        content:
          "Hệ thống đường lối, luật pháp, chính sách xác lập cơ chế vận hành, mục tiêu nhằm thúc đẩy 'dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
      },
      { type: "section-title", content: "II. Lý do phải hoàn thiện thể chế" },
      {
        type: "paragraph",
        content:
          "Hoàn thiện thể chế là yêu cầu khách quan trong giai đoạn hiện nay vì hệ thống thể chế ở nước ta còn nhiều hạn chế:",
      },
    ],
  },

  // --- TRANG 9: Hoàn thiện Thể chế (Lý do - Phần 2) ---
  {
    pageNumber: 9,
    chapterTitle: "Phần B: Hoàn thiện Thể chế KTTT ĐH XHCN",
    blocks: [
      {
        type: "list-item",
        content: "Do mới hình thành và đang phát triển nên thể chế chưa đồng bộ.",
      },
      {
        type: "list-item",
        content: "Hệ thống thể chế chưa đầy đủ.",
      },
      {
        type: "list-item",
        content: "Hệ thống thể chế còn kém hiệu lực.",
      },
      { type: "section-title", content: "Nội dung hoàn thiện thể chế" },
      {
        type: "paragraph",
        content:
          "Tập trung vào 3 trụ cột chính: ",
      },
      {
        type: "paragraph",
        content:
          "1. Hoàn thiện thể chế về sở hữu và TPKT.",
      },
      {
        type: "paragraph",
        content:
          "2. Hoàn thiện thể chế phát triển đồng bộ các loại thị trường (vốn, lao động...).",
      },
      {
        type: "paragraph",
        content:
          "3. Hoàn thiện thể chế gắn tăng trưởng với công bằng XH và hội nhập quốc tế.",
      },
      {
        type: "connection-box",
        title: "Ví dụ về Hoàn thiện Thể chế (1)",
        content:
          "Thay vì phải nộp hồ sơ giấy tờ phức tạp để thành lập doanh nghiệp, Nhà nước ban hành Nghị định cho phép đăng ký trực tuyến, giảm 80% thời gian xử lý. Đây là hoàn thiện thể chế để tăng hiệu lực và hiệu quả.",
      },
    ],
  },
];