// src/lib/data.ts

export const SITE_CONFIG = {
  title: "An Cư Lạc Nghiệp",
  subtitle: "Góc nhìn Kinh tế Chính trị Mác - Lênin về Bất động sản 2025",
  author: "Nhóm nghiên cứu MLN122",
};

// Dữ liệu cho Banner Carousel (Lấy từ tên các file ảnh bạn gửi)
export const CAROUSEL_ITEMS = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420954/xe-om-cong-nghe-anh-ngoc-duong-5-17476713220331874471141-31-0-1012-1570-crop-17476713489361966899068_bnkgqj.jpg", // Bạn nhớ đổi tên file ảnh cho không có dấu cách nhé
    title: "Giá chung cư Hà Nội & TPHCM lập đỉnh mới",
    source: "Báo Điện tử Chính phủ",
    date: "10/12/2025",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420954/xe-om-cong-nghe-anh-ngoc-duong-5-17476713220331874471141-31-0-1012-1570-crop-17476713489361966899068_bnkgqj.jpg",
    title: "Lương 40 triệu bất lực trước căn hộ 5 tỷ",
    source: "VnExpress",
    date: "13/10/2025",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420954/xe-om-cong-nghe-anh-ngoc-duong-5-17476713220331874471141-31-0-1012-1570-crop-17476713489361966899068_bnkgqj.jpg",
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
  heading: "Bức Tranh Hiện Thực & Con Số Biết Nói",
  stats: [
    {
      label: "Thu nhập trung bình",
      value: "10 - 15 tr",
      unit: "VNĐ/tháng",
      source: "Navigos Group 2024", // Thêm nguồn
    },
    {
      label: "Giá chung cư HN/HCM",
      value: "69 tr", // Cập nhật số liệu mới
      unit: "VNĐ/m² (Q3/2024)",
      source: "Savills Vietnam",
    },
    {
      label: "Thời gian tích lũy",
      value: "30 - 40",
      unit: "Năm",
      source: "VARS",
    },
  ],
  content: [
    {
      title: "Nghịch lý Thu nhập - Giá nhà",
      description:
        "Thu nhập của người trẻ mới ra trường chỉ khoảng 10-15 triệu đồng/tháng, trong khi giá chung cư thương mại đã chạm mốc 3-5 tỷ đồng/căn. Điều này buộc họ phải tìm đến các căn hộ cũ xa trung tâm hoặc chờ đợi Nhà ở xã hội.",
      highlight: "Nguồn cung nơi ở khan hiếm, nhu cầu thực tế rất lớn.",
    },
    {
      title: "Xu hướng Thị trường",
      description:
        "Thị trường Bất động sản đang vận hành theo quy luật lợi nhuận tối thượng (Logic Tư bản chủ nghĩa), tập trung vào phân khúc cao cấp mà bỏ qua nhu cầu thiết yếu của đại đa số người dân lao động.",
      highlight: "Đi ngược lại đặc trưng cốt lõi của KTTT Định hướng XHCN.",
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
    criteria: "Mục đích",
    capitalism:
      "Tối đa hóa giá trị thặng dư cho nhà tư bản. Duy trì sự thống trị của giai cấp tư sản.",
    socialism:
      "Phát triển sản xuất, cải thiện đời sống nhân dân. Thúc đẩy tiến bộ xã hội.",
  },
  {
    criteria: "Quản lý kinh tế",
    capitalism:
      "Nhà nước tư sản bảo vệ lợi ích của giai cấp tư sản và các tổ chức độc quyền.",
    socialism:
      "Nhà nước pháp quyền XHCN quản lý, điều tiết nhằm đảm bảo định hướng xã hội chủ nghĩa.",
  },
  {
    criteria: "Công bằng xã hội",
    capitalism:
      "Chỉ là phương tiện để đạt mục đích lợi nhuận và củng cố chế độ.",
    socialism:
      "Công bằng xã hội vừa là phương tiện, vừa là mục tiêu phấn đấu của chế độ mới.",
  },
];

// Dữ liệu Phần 3: Giải pháp
export const SOLUTIONS = [
  {
    id: "dat-dai",
    title: "Công cụ Đất đai",
    icon: "MapPin",
    description:
      "Miễn 100% tiền sử dụng đất cho NOXH. Luật Đất đai 2024 đã tháo gỡ nhiều vướng mắc về định giá đất.",
    legalRef: "Luật Đất đai 2024", // Thêm trường tham chiếu pháp lý
  },
  {
    id: "tin-dung",
    title: "Gói 120.000 Tỷ",
    icon: "CreditCard",
    description:
      "Cung cấp vốn vay ưu đãi thấp hơn 1.5-2% lãi suất thị trường cho cả chủ đầu tư và người mua.",
    legalRef: "Nghị quyết 33/NQ-CP",
  },
  {
    id: "thue",
    title: "Công cụ Thuế",
    icon: "Percent",
    description:
      "Miễn/giảm Thuế TNDN và VAT cho chủ đầu tư NOXH. Giúp tăng lợi nhuận ròng, khuyến khích doanh nghiệp chuyển hướng từ phân khúc cao cấp sang bình dân.",
  },
];
// src/lib/data.ts


export const DETAILED_NEWS = [
  {
    id: 1,
    slug: "gia-nha-lap-dinh-chinh-phu",
    title: "Giá chung cư tại Hà Nội và TPHCM trung bình từ 50 – 70 triệu/m2",
    source: "Báo Chính Phủ",
    type: "gov",
    date: "10/12/2025",
    image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg", 
    summary: "Thị trường căn hộ tiếp tục thu hút quan tâm. Giá bán trung bình một số dự án dao động ở mức cao kỷ lục, gây áp lực lớn lên nguồn cung NOXH.",
    // THÊM PHẦN NÀY ĐỂ HẾT LỖI
    analysis: {
      perspective: "Vai trò quản lý của Nhà nước",
      content: "Thừa nhận thực trạng giá nhà vượt xa giá trị thực là bước đầu tiên để Nhà nước thực hiện vai trò điều tiết vĩ mô. Khi thị trường thất bại trong việc phân phối công bằng, Nhà nước phải can thiệp để ổn định an sinh."
    }
  },
  {
    id: 2,
    slug: "luong-40-trieu-bat-luc",
    title: "Tôi lương 40 triệu bất lực trước căn hộ Sài Gòn 5 tỷ đồng",
    source: "VnExpress - Góc nhìn",
    type: "press",
    date: "13/10/2025",
    image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary: "Thị trường chung cư dường như chỉ đang nói chuyện với người giàu. Với thu nhập thuộc hàng khá, tôi vẫn không dám mơ về ngôi nhà riêng.",
    analysis: {
      perspective: "Bần cùng hóa tương đối",
      content: "Dù thu nhập 40 triệu là cao, nhưng so với tốc độ tích lũy của tư bản (giá BĐS), người lao động ngày càng nghèo đi tương đối. Giá trị sức lao động không đuổi kịp đà tăng của địa tô."
    }
  },
  {
    id: 3,
    slug: "chung-cu-gia-re-khan-hiem",
    title: "Chung cư giá rẻ khan hiếm, người dân chật vật tìm chỗ an cư",
    source: "Báo Lao Động",
    type: "press",
    date: "06/04/2025",
    image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary: "Nguồn cung ngày càng khan hiếm khiến nhiều người khó tìm được chốn an cư phù hợp dù có trong tay 3-4 tỉ đồng tích lũy.",
    analysis: {
      perspective: "Mâu thuẫn Cung - Cầu",
      content: "Các nhà tư bản bất động sản chỉ tập trung vào phân khúc cao cấp để tối đa hóa lợi nhuận (siêu ngạch), bỏ qua nhu cầu thực của đa số dân chúng (phân khúc bình dân)."
    }
  },
  {
    id: 4,
    slug: "mien-tien-su-dung-dat",
    title: "Miễn tiền sử dụng đất để thúc đẩy dự án Nhà ở xã hội",
    source: "Tạp chí Xây Dựng",
    type: "research",
    date: "24/12/2024",
    image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary: "Phân tích tác động của chính sách đất đai đến giá thành NOXH. Giải pháp then chốt để giảm giá bán về mức 15-20 triệu/m2.",
    analysis: {
      perspective: "Công cụ điều tiết vĩ mô",
      content: "Sử dụng công cụ Đất đai (giảm chi phí đầu vào) là biện pháp can thiệp trực tiếp của Nhà nước vào quan hệ sản xuất, nhằm định hướng lại thị trường theo mục tiêu Xã hội chủ nghĩa."
    }
  },
  {
    id: 5,
    slug: "hut-hoi-mua-nha-80-trieu",
    title: "Hụt hơi mua nhà TP HCM: 80 triệu đồng một m2",
    source: "VnExpress",
    type: "press",
    date: "20/10/2025",
    image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary: "Đi xem dự án mới mở bán, môi giới chỉ tập trung vào 'tiềm năng tăng giá' thay vì tiện ích sống. Mua nhà trở thành bài toán bất khả thi.",
    analysis: {
      perspective: "Giá trị sử dụng vs Trao đổi",
      content: "Thị trường bị méo mó bởi đầu cơ. Người ta chỉ quan tâm đến 'Giá trị trao đổi' (bán lại kiếm lời) mà quên đi 'Giá trị sử dụng' (để ở), biến nhà ở thành công cụ tài chính."
    }
  },
  {
    id: 6,
    slug: "bao-cao-mln122",
    title: "Báo cáo: Tác động của Kinh tế thị trường đến An sinh xã hội",
    source: "Nghiên cứu MLN122",
    type: "research",
    date: "15/11/2025",
    image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1762420681/sac-xe-dien-byd_jtyxrm.jpg",
    summary: "Tổng hợp số liệu và phân tích lý luận về sự lệch pha cung cầu trong thị trường bất động sản Việt Nam giai đoạn 2020-2025.",
    analysis: {
      perspective: "Tổng quan lý luận",
      content: "Sự xung đột giữa quy luật lợi nhuận của Kinh tế thị trường và mục tiêu công bằng của Chủ nghĩa xã hội yêu cầu phải có sự hoàn thiện về thể chế kinh tế."
    }
  },
];