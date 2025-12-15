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
      "Miễn/giảm 100% tiền sử dụng đất cho dự án NOXH. Giúp giảm trực tiếp chi phí đầu vào lớn nhất.",
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
      "Thành lập Quỹ phát triển NOXH độc lập để cấp vốn ưu đãi ổn định, dài hạn (15-20 năm), thay vì phụ thuộc gói tín dụng thương mại.",
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

export const BOOK_CONCEPTS = [
  {
    page: 1,
    title: "Khái niệm và Bản chất KTTT Định hướng XHCN ",
    content:
      "Kinh tế thị trường định hướng xã hội chủ nghĩa (KTTT ĐH XHCN) là một kiểu nền KTTT phù hợp với Việt Nam, phản ánh trình độ phát triển và điều kiện lịch sử. Bản chất là nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của thị trường, đồng thời góp phần hướng tới xác lập xã hội: dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Có sự điều tiết của Nhà nước pháp quyền XHCN do Đảng Cộng sản Việt Nam lãnh đạo.",
    quote:
      "Là mô hình kinh tế tổng quát của thời kỳ quá độ lên chủ nghĩa xã hội (Đại hội IX).",
    source: "Giáo trình KTCT Mác - Lênin ",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768173/1._chu_nghia_xa_hoi_1719367741915_jsur8p.jpg",
    connection:
      "Ví dụ trong **Giáo dục - Đào tạo:** Cho phép các trường tư thục cạnh tranh về chất lượng (quy luật thị trường) nhưng Nhà nước phải trợ cấp học phí cho học sinh nghèo (định hướng XHCN) để đảm bảo mọi người đều có cơ hội học tập.",
  },
  {
    page: 2,
    title: "Tính Tất yếu Khách quan KTTT ĐH XHCN ",
    content:
      "Việc phát triển KTTT ĐH XHCN là tất yếu khách quan vì 3 lý do: (1) Phù hợp với xu hướng khách quan, KTTT là sản phẩm của văn minh nhân loại. (2) Do tính ưu việt của mô hình, là phương thức phân bổ nguồn lực hiệu quả nhất và thúc đẩy lực lượng sản xuất phát triển. (3) Phù hợp với khát vọng của nhân dân là 'dân giàu, nước mạnh, dân chủ, công bằng, văn minh'.",
    quote:
      "Kinh tế thị trường luôn là động lực thúc đẩy lực lượng sản xuất phát triển nhanh và có hiệu quả.",
    source: "Giáo trình KTCT Mác - Lênin",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765768297/images_n76axf.jpg",
    connection:
      "Ví dụ trong **Hội nhập:** Việc tham gia các hiệp định thương mại tự do (FTA) là thể hiện sự phù hợp với xu hướng khách quan, sử dụng quy luật thị trường để mở rộng thị trường, tăng trưởng kinh tế và nâng cao vị thế đất nước.",
  },
  {
    page: 3,
    title: "Đặc trưng: Sở hữu & Thành phần KT",
    content:
      "Là nền kinh tế có nhiều hình thức sở hữu, nhiều thành phần kinh tế (sở hữu toàn dân, tập thể, tư nhân, hỗn hợp...). Trong đó: Kinh tế Nhà nước giữ vai trò chủ đạo, định hướng phát triển. Kinh tế tập thể là nền tảng vững chắc. Kinh tế tư nhân là một động lực quan trọng. Các thành phần kinh tế bình đẳng, hợp tác, cạnh tranh cùng phát triển theo pháp luật.",
    quote:
      "Kinh tế nhà nước đóng vai trò chủ đạo, cùng với kinh tế tập thể ngày càng trở thành nền tảng vững chắc của nền kinh tế quốc dân.",
    source: "Giáo trình KTCT Mác - Lênin ",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765760293/gia-tri-khoa-hoc-cach-mang-thoi-dai-cua-chu-nghia-mac-lenin-tu-tuong-ho-chi-minh-20240517160529_ueutf3.jpg",
    connection:
      "Ví dụ trong **Sản xuất Công nghiệp:** Cho phép tập đoàn tư nhân sản xuất ô tô (kinh tế tư nhân) nhưng các lĩnh vực năng lượng, quốc phòng (như Tập đoàn Điện lực EVN) vẫn do Nhà nước nắm giữ (kinh tế Nhà nước chủ đạo) để đảm bảo an ninh năng lượng và phát triển hạ tầng chiến lược.",
  },
  {
    page: 4,
    title: "Đặc trưng: Vai trò quản lý Nhà nước ",
    content:
      "Nhà nước quản lý bằng Nhà nước pháp quyền XHCN dưới sự lãnh đạo của Đảng, trên cơ sở tôn trọng các nguyên tắc thị trường. Phương thức quản lý thông qua Pháp luật, Chiến lược, Quy hoạch và **các công cụ kinh tế** (thuế, lãi suất, tỷ giá, chi tiêu công). Vai trò cốt lõi là can thiệp, điều tiết để khắc phục khuyết tật thị trường, đảm bảo cân đối vĩ mô và **điều hòa lợi ích kinh tế**, giảm phân hóa giàu nghèo.",
    quote: "Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân.",
    source: "Giáo trình KTCT Mác - Lênin ",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771681/le_nin_1716281116170_izc8la.jpg",
    connection:
      "Ví dụ trong **An sinh xã hội:** Chính phủ tăng chi ngân sách cho bảo hiểm thất nghiệp và hỗ trợ tiền mặt cho người lao động mất việc làm sau đại dịch, sử dụng **công cụ kinh tế (chi tiêu công)** để điều hòa lợi ích và chia sẻ rủi ro xã hội.",
  },
  {
    page: 5,
    title: "Đặc trưng: Tăng trưởng & Công bằng XH",
    content:
      "Thực hiện gắn tăng trưởng kinh tế với tiến bộ và công bằng xã hội. Tiến bộ và công bằng xã hội không phải là mục tiêu được thực hiện sau mà phải được thực hiện **ngay trong từng chính sách, chiến lược, và từng giai đoạn phát triển**. Công bằng xã hội vừa là mục tiêu thể hiện bản chất XHCN, vừa là điều kiện để phát triển bền vững.",
    quote:
      "Không thể 'hy sinh' tiến bộ và công bằng xã hội để chạy theo tăng trưởng kinh tế đơn thuần.",
    source: "Giáo trình KTCT Mác - Lênin ",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771493/article_tkzsvc.jpg",
    connection:
      "Ví dụ trong **Thuế:** Áp dụng thuế suất cao hơn (Thuế Thu nhập cá nhân lũy tiến, Thuế Tiêu thụ đặc biệt) với các mặt hàng xa xỉ và thu nhập cao, sau đó dùng số tiền đó để đầu tư vào y tế, giáo dục cho người nghèo. Đây là cách cân bằng lợi ích thông qua công cụ tài chính.",
  },
  {
    page: 6,
    title: "Hoàn thiện Thể chế: Khái niệm & Tất yếu ",
    content:
      "**Thể chế kinh tế** là hệ thống quy tắc, luật pháp điều chỉnh hành vi của các chủ thể kinh tế. **Hoàn thiện thể chế** là yêu cầu khách quan do thể chế hiện tại còn chưa đồng bộ, kém hiệu lực, hiệu quả, chưa tạo đột phá trong huy động nguồn lực. Mục tiêu là phát huy tối đa mặt tích cực của thị trường, khắc phục khuyết tật và nâng cao năng lực quản lý của Nhà nước.",
    quote:
      "Thể chế kinh tế thị trường là sản phẩm của nhà nước, phải là thể chế phục vụ lợi ích, vì lợi ích của nhân dân.",
    source: "Giáo trình KTCT Mác - Lênin ",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771542/bo-sung-phat-trien-hoan-thien-chu-nghia-mac-lenin_xdkrjm.jpg",
    connection:
      "Ví dụ trong **Thủ tục hành chính:** Thay vì phải nộp hồ sơ giấy tờ phức tạp để thành lập doanh nghiệp, Nhà nước ban hành Nghị định cho phép đăng ký trực tuyến, giảm 80% thời gian xử lý. Đây là hoàn thiện thể chế để tăng hiệu lực và hiệu quả.",
  },
  {
    page: 7,
    title: "Hoàn thiện Thể chế: Nội dung chính ",
    content:
      "**Nội dung hoàn thiện thể chế tập trung vào 3 trụ cột chính:** (1) Hoàn thiện thể chế về sở hữu và các thành phần kinh tế (thể chế hóa quyền tài sản, đảm bảo bình đẳng, phát triển KT tư nhân thành động lực). (2) Hoàn thiện thể chế phát triển đồng bộ các loại thị trường (hàng hóa, vốn, lao động, khoa học-công nghệ). (3) Hoàn thiện thể chế gắn tăng trưởng với công bằng xã hội và hội nhập quốc tế (thực hiện công bằng ngay trong từng chính sách, rà soát pháp luật đáp ứng cam kết quốc tế).",
    quote:
      "Tạo thuận lợi để phát triển kinh tế tư nhân trở thành một động lực quan trọng của nền kinh tế.",
    source: "Giáo trình KTCT Mác - Lênin ",
    illustration:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1765771607/cover-bai-hthu-1397x786_vrwvlu.jpg",
    connection:
      "Ví dụ trong **Thị trường vốn:** Hoàn thiện Luật Chứng khoán và ban hành các quy định minh bạch hóa giao dịch (chống thao túng thị trường) để thu hút vốn quốc tế, phát triển đồng bộ thị trường vốn, giảm thiểu rủi ro cho nhà đầu tư (gắn với hội nhập và công bằng).",
  },
];
