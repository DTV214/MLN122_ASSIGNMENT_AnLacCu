"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
    Gavel,
    CheckCircle,
    RotateCcw,
    AlertTriangle,
    Gift,
    HelpCircle,
    Lock,
    XCircle,
    Info,
    Zap,
    Timer
} from "lucide-react";
import { toast } from "sonner";

// --- DỮ LIỆU CÂU HỎI ÔN TẬP (GIỮ NGUYÊN) ---
const REVIEWS = [
    { q: "Xây dựng kinh tế thị trường định hướng XHCN ở VN nhằm mục tiêu gì?", a: ["Dân giàu, nước mạnh, dân chủ, công bằng, văn minh", "Dân giàu, nước mạnh, công bằng, dân chủ, văn minh", "Dân giàu, nước mạnh, văn minh, công bằng, dân chủ", "Dân giàu, nước mạnh, dân chủ, văn minh, công bằng"], c: 0 },
    { q: "Công cụ quản lý vĩ mô của nhà nước trong kinh tế thị trường định hướng XHCN là?", a: ["Kế hoạch và thị trường, hệ thống pháp luật, tài chính-tiền tệ...", "Kế hoạch và thị trường, kinh tế tư nhân, quản lý tiền tệ", "Thuế, kinh tế tư nhân, kinh tế tập thể", "Hệ thống các chính sách kinh tế và xã hội"], c: 0 },
    { q: "Đại hội nào xác định kinh tế thị trường định hướng XHCN là mô hình kinh tế tổng quát?", a: ["Đại hội VI", "Đại hội VII", "Đại hội VIII", "Đại hội IX"], c: 3 },
    { q: "Trong nền kinh tế thị trường định hướng XHCN, thành phần nào giữ vai trò chủ đạo?", a: ["Kinh tế tập thể", "Kinh tế tư nhân", "Kinh tế nhà nước", "Kinh tế có vốn đầu tư nước ngoài"], c: 2 },
    { q: "Kinh tế nhà nước cùng với kinh tế tập thể ngày càng trở thành?", a: ["Động lực của nền kinh tế", "Nền tảng vững chắc của nền kinh tế quốc dân", "Thành phần kinh tế quan trọng", "Nội lực của nền kinh tế"], c: 1 },
    { q: "Thành phần kinh tế nào là 'động lực quan trọng' của nền kinh tế?", a: ["Kinh tế nhà nước", "Kinh tế tập thể", "Kinh tế tư nhân", "Kinh tế có vốn đầu tư nước ngoài"], c: 2 },
    { q: "Việc thực hiện các hình thức phân phối trong kinh tế thị trường định hướng XHCN nhằm?", a: ["Đảm bảo công bằng xã hội", "Tăng trưởng kinh tế nhanh", "Kết hợp hài hòa các lợi ích", "Thúc đẩy sản xuất"], c: 2 },
    { q: "Sở hữu toàn dân về tư liệu sản xuất do thành phần nào đại diện?", a: ["Các hợp tác xã", "Các tập đoàn tư nhân", "Nhà nước", "Mọi người dân tự quản lý"], c: 2 },
    { q: "Đặc trưng định hướng XHCN về phân phối là thực hiện?", a: ["Phân phối theo nhu cầu", "Phân phối bình quân", "Phân phối theo kết quả lao động, hiệu quả kinh tế và mức đóng góp", "Chỉ phân phối theo vốn góp"], c: 2 },
    { q: "Hệ thống các quan hệ kinh tế giữa các chủ thể kinh tế trong một môi trường nhất định được gọi là?", a: ["Quy luật kinh tế", "Cơ chế kinh tế", "Thể chế kinh tế", "Mô hình kinh tế"], c: 2 },
    { q: "Mục đích của việc hoàn thiện thể chế kinh tế thị trường định hướng XHCN là?", a: ["Xóa bỏ vai trò nhà nước", "Phát triển kinh tế tư nhân là duy nhất", "Phát triển mạnh mẽ lực lượng sản xuất, nâng cao đời sống", "Chạy theo lợi nhuận tối đa"], c: 2 },
    { q: "Nền kinh tế thị trường định hướng XHCN ở VN là nền kinh tế?", a: ["Có nhiều hình thức sở hữu, nhiều thành phần kinh tế", "Có một hình thức sở hữu duy nhất", "Chỉ có sở hữu tư nhân", "Hai hình thức sở hữu, hai thành phần"], c: 0 },
    { q: "Khẳng định SAI về vai trò kinh tế nhà nước?", a: ["Là đòn bẩy tăng trưởng", "Đứng độc lập, tách rời với các thành phần khác", "Mở đường, hỗ trợ thành phần khác", "Lực lượng vật chất để điều tiết vĩ mô"], c: 1 },
    { q: "Quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành xã hội là khái niệm về?", a: ["Thể chế", "Quy luật", "Nguyên tắc", "Quản lý"], c: 0 },
    { q: "Hoàn thiện thể chế kinh tế thị trường xuất phát từ lý do?", a: ["Hệ thống cũ chồng chéo, chưa đồng bộ", "Để quay lại bao cấp", "Do sức ép từ bên ngoài", "Vì mục tiêu lợi nhuận của nhà nước"], c: 0 }
];

// --- DỮ LIỆU THỬ THÁCH (GIỮ NGUYÊN) ---
const CHALLENGES = [
    {
        id: 1,
        event: "Lạm phát tăng cao (2008, 2011)",
        question: "Trong bối cảnh lạm phát tăng cao kỷ lục, giải pháp nào sau đây được Nhà nước thực hiện giúp kiềm chế lạm phát bền vững?",
        options: [
            {
                text: "Ngân hàng Nhà nước áp dụng Chính sách Tiền tệ Thắt chặt thông qua việc tăng mạnh lãi suất điều hành (có lúc lên tới 14-15%), tăng tỷ lệ dự trữ bắt buộc và bán chứng khoán.",
                isCorrect: false,
                feedback: "Thất bại: Việc tăng lãi suất quá nhanh và cao đã đẩy chi phí vốn lên quá mức, gây khó khăn cho doanh nghiệp, dẫn đến suy giảm sản xuất và tăng nguy cơ nợ xấu."
            },
            {
                text: "Sử dụng công cụ hành chính/quản lý để 'ấn định' giá, quyết định một mức giá cụ thể cho các hàng hóa và dịch vụ thiết yếu.",
                isCorrect: false,
                feedback: "Thất bại: Gây méo mó thị trường do không phản ánh đúng cung cầu và gây lỗ lớn cho các Tập đoàn nhà nước như EVN, PVN."
            },
            {
                text: "Thực hiện chính sách Tiền tệ thận trọng, kết hợp với việc siết chặt kỷ luật tài khóa như cắt giảm chi tiêu công và kiểm soát thâm hụt ngân sách.",
                isCorrect: true,
                feedback: "Thành công: Lạm phát được kiềm chế dần từ mức gần 18% (năm 2011) xuống còn 6.81% (2012) và chỉ còn 0.63% vào năm 2015."
            }
        ]
    },
    {
        id: 2,
        event: "Khủng hoảng Nợ Xấu Ngân Hàng (Đầu thập niên 2010)",
        question: "Để giải quyết dứt điểm nợ xấu thay vì chỉ che phủ trên sổ sách, cơ chế nào sau đây mang lại hiệu quả thực chất?",
        options: [
            {
                text: "Điều hành Chính sách Tiền tệ thông qua việc tăng/giảm lãi suất điều hành liên tục.",
                isCorrect: false,
                feedback: "Thất bại: Biện pháp thắt chặt để chống lạm phát làm doanh nghiệp suy yếu khiến nợ xấu tăng thêm; nới lỏng lại khó khăn do lòng tin thị trường đã giảm sút."
            },
            {
                text: "Sử dụng phương pháp 'Nhốt nợ' bằng Trái phiếu Đặc biệt của VAMC (mua nợ bằng giấy tờ giá trị danh nghĩa thay vì tiền mặt).",
                isCorrect: false,
                feedback: "Thất bại: Đây chỉ là giải pháp kỹ thuật che phủ nợ xấu trên bảng cân đối, không giải quyết được gốc rễ là tài sản đảm bảo kém thanh khoản."
            },
            {
                text: "Ban hành Cơ chế đặc biệt cho Thu hồi Tài sản Đảm bảo (Nghị quyết 42), cho phép thu giữ tài sản và áp dụng thủ tục rút gọn tại Tòa án.",
                isCorrect: true,
                feedback: "Thành công: Tốc độ xử lý nợ xấu tăng gấp 2 lần, giúp tỷ lệ nợ xấu nội bảng duy trì ở mức an toàn dưới 3% trong nhiều năm."
            }
        ]
    },
    {
        id: 3,
        event: "Khủng hoảng tỷ giá và khan hiếm ngoại tệ (2011-2012)",
        question: "Để ổn định tỷ giá bền vững và khôi phục lòng tin thị trường, giải pháp nào sau đây là phù hợp nhất?",
        options: [
            {
                text: "Bán Ngoại tệ (USD) từ Quỹ Dự trữ Ngoại hối để bơm ra thị trường nhằm đáp ứng nhu cầu.",
                isCorrect: false,
                feedback: "Thất bại: Chỉ là giải pháp tức thời và làm cạn kiệt Dự trữ Ngoại hối mà không giải quyết được gốc rễ là tình trạng nhập siêu và lạm phát cao."
            },
            {
                text: "Quy định mức Lãi suất Huy động (gửi tiền) Ngoại tệ là 0%.",
                isCorrect: false,
                feedback: "Thất bại: Khiến người dân rút USD khỏi hệ thống ngân hàng để găm giữ tiền mặt bên ngoài, làm trầm trọng thêm tình trạng khan hiếm trong hệ thống chính thức."
            },
            {
                text: "Áp dụng Cơ chế Điều hành Tỷ giá Trung tâm Linh hoạt kết hợp cải thiện Cán cân Thương mại (xuất siêu) và tăng Dự trữ Ngoại hối.",
                isCorrect: true,
                feedback: "Thành công: Cho phép tỷ giá phản ánh cung-cầu nhưng vẫn kiểm soát được biến động, giúp thị trường lấy lại lòng tin cơ bản."
            }
        ]
    },
    {
        id: 4,
        event: "Sự cố Formosa gây ô nhiễm biển miền Trung (2016)",
        question: "Trong việc xử lý hậu quả môi trường và sinh kế, giải pháp nào sau đây mang tính bền vững và đúng bản chất kinh tế?",
        options: [
            {
                text: "Thực hiện chi trả bồi thường trực tiếp cho người dân từ khoản quỹ 500 triệu USD của Formosa.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Việc chi trả vội vàng, thiếu tiêu chí rõ ràng dẫn đến tình trạng không đồng đều, gây khiếu kiện và ảnh hưởng ổn định xã hội."
            },
            {
                text: "Ban hành chính sách hỗ trợ ngư dân chuyển đổi nghề nghiệp từ đánh bắt sang nuôi trồng hoặc nghề khác.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Thiếu tính khả thi do ngư dân không có kinh nghiệm, thiếu vốn và thiếu thị trường, không giải quyết được sinh kế bền vững."
            },
            {
                text: "Buộc Formosa cam kết bồi thường 500 triệu USD và lập Quỹ Khắc phục Môi trường để xử lý dứt điểm ô nhiễm.",
                isCorrect: true,
                feedback: "Thành công: Chuyển gánh nặng chi phí sang bên gây ô nhiễm, phục hồi hệ sinh thái biển giúp ngư trường an toàn trở lại."
            }
        ]
    },
    {
        id: 5,
        event: "Ổn định giá gạo (2023-2024)",
        question: "Khi giá gạo biến động, Nhà nước đã sử dụng chiến lược nào để vừa đảm bảo an ninh lương thực vừa giữ uy tín xuất khẩu?",
        options: [
            {
                text: "Tăng cường thanh tra, kiểm tra và siết chặt các điều kiện dự trữ lưu thông đối với doanh nghiệp xuất khẩu.",
                isCorrect: false,
                feedback: "Không hiệu quả: Gây cản trở giao dịch, tạo tâm lý e ngại cho doanh nghiệp và làm giảm tính linh hoạt của thị trường quốc tế."
            },
            {
                text: "Giao nhiệm vụ cho các doanh nghiệp lớn thực hiện bán gạo bình ổn giá tại các thành phố lớn.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Quy mô triển khai nhỏ, nguồn gạo nhanh chóng thiếu hụt không đủ sức kéo giảm mặt bằng giá chung."
            },
            {
                text: "Duy trì Chiến lược An ninh Lương thực tập trung vào sản lượng ổn định, chất lượng cao và cho phép xuất khẩu linh hoạt.",
                isCorrect: true,
                feedback: "Thành công: Đảm bảo cung cho nội địa ổn định và tận dụng được cơ hội xuất khẩu giá cao, tạo sự an tâm cho nông dân."
            }
        ]
    },
    {
        id: 6,
        event: "Xây dựng Nông thôn mới (từ 2010)",
        question: "Để xây dựng nông thôn mới bền vững, trọng tâm điều hành nào sau đây mang lại kết quả kinh tế thực chất cho người dân?",
        options: [
            {
                text: "Phân bổ ngân sách tập trung để đầu tư dàn trải vào các hạ tầng như nhà văn hóa, đường làng theo chỉ tiêu.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Dẫn đến lãng phí, nợ đọng xây dựng cơ bản và nhiều công trình không được khai thác hiệu quả."
            },
            {
                text: "Vận động tối đa sự đóng góp của người dân về tiền mặt, ngày công và hiến đất.",
                isCorrect: false,
                feedback: "Gây tranh cãi: Việc thực thi thiếu kiểm soát gây gánh nặng tài chính không đồng đều và làm mất đi sự đồng thuận của nhân dân."
            },
            {
                text: "Phát triển Chương trình 'Mỗi xã một sản phẩm' (OCOP), chuyển trọng tâm sang phát triển kinh tế nội sinh.",
                isCorrect: true,
                feedback: "Thành công: Nâng cao giá trị sản phẩm đặc trưng, tăng thu nhập trực tiếp cho dân và xây dựng thương hiệu bền vững."
            }
        ]
    },
    {
        id: 7,
        event: "Phục hồi kinh tế sau Covid-19 (2020-2022)",
        question: "Công cụ tài chính nào sau đây có tác động nhanh chóng và rộng rãi nhất để kích cầu tiêu dùng sau đại dịch?",
        options: [
            {
                text: "Triển khai các Gói hỗ trợ lãi suất và cơ cấu lại thời hạn trả nợ cho doanh nghiệp.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Giải ngân rất chậm do ngân hàng sợ nợ xấu và doanh nghiệp không đủ điều kiện hoặc nhu cầu vay chưa hồi phục."
            },
            {
                text: "Thực hiện các Gói hỗ trợ an sinh xã hội trực tiếp bằng tiền mặt (như gói 62.000 tỷ đồng).",
                isCorrect: false,
                feedback: "Kém hiệu quả: Thủ tục hành chính phức tạp và phân bổ chậm khiến người lao động không nhận được hỗ trợ kịp thời."
            },
            {
                text: "Áp dụng chính sách giảm thuế Giá trị gia tăng (VAT) từ 10% xuống 8%.",
                isCorrect: true,
                feedback: "Thành công: Tác động nhanh, đơn giản về thủ tục, kích thích trực tiếp nhu cầu tiêu dùng và thúc đẩy sản xuất kinh doanh."
            }
        ]
    },
    {
        id: 8,
        event: "Khan hiếm và Đảm bảo Cung ứng Xăng dầu (2022)",
        question: "Để giải quyết dứt điểm tình trạng cửa hàng xăng dầu ngừng bán, Nhà nước cần can thiệp vào yếu tố nào?",
        options: [
            {
                text: "Tăng cường thanh tra, kiểm tra và xử phạt nặng các cửa hàng đóng cửa hoặc bán nhỏ giọt.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Chỉ có hiệu lực nhất thời, không giải quyết được gốc rễ là tình trạng lỗ vốn của doanh nghiệp."
            },
            {
                text: "Thực hiện giảm Thuế Bảo vệ Môi trường và Thuế Tiêu thụ Đặc biệt để giảm giá bán lẻ cho người dân.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Giảm gánh nặng cho người tiêu dùng nhưng không giải quyết được mâu thuẫn lợi nhuận bị siết chặt của doanh nghiệp bán lẻ."
            },
            {
                text: "Điều chỉnh Cơ chế Điều hành Giá thông qua tăng chi phí định mức và chiết khấu cho doanh nghiệp.",
                isCorrect: true,
                feedback: "Thành công: Cân bằng lợi ích kinh doanh, loại bỏ lý do đóng cửa do lỗ và khôi phục lại nguồn cung thị trường."
            }
        ]
    },
    {
        id: 9,
        event: "Xây dựng đặc khu kinh tế (2018)",
        question: "Trước những bất ổn thị trường đất đai và phản ứng xã hội về các đặc khu, hành động nào của Nhà nước được xem là thành công về điều hòa lợi ích vĩ mô?",
        options: [
            {
                text: "Áp dụng các ưu đãi thuế quan đặc biệt và miễn giảm thuế thu nhập kéo dài lên đến 30 năm.",
                isCorrect: false,
                feedback: "Gây tranh cãi: Bị coi là dẫn đến chảy máu ngân sách và gây méo mó cạnh tranh giữa các khu vực trong nước."
            },
            {
                text: "Quy định kéo dài thời hạn thuê đất tại các đặc khu lên đến 99 năm.",
                isCorrect: false,
                feedback: "Phản tác dụng: Gây ra cơn sốt đất nghiêm trọng, mất cân bằng lợi ích xã hội và làm méo mó thị trường bất động sản."
            },
            {
                text: "Quyết định tạm dừng và rà soát lại toàn bộ cơ chế đặc khu, tạm dừng thông qua Luật liên quan.",
                isCorrect: true,
                feedback: "Thành công: Ngăn chặn bong bóng bất động sản lan rộng, giảm rủi ro ổn định xã hội và thất thoát đất đai."
            }
        ]
    },
    {
        id: 10,
        event: "Khủng hoảng bong bóng chứng khoán (2007)",
        question: "Để thị trường chứng khoán phát triển bền vững sau khủng hoảng, biện pháp quản lý nào có tính chất căn cơ nhất?",
        options: [
            {
                text: "Thắt chặt tín dụng ngân hàng đột ngột và nâng cao tỷ lệ dự trữ bắt buộc.",
                isCorrect: false,
                feedback: "Gây khủng hoảng sâu hơn: Cắt đứt dòng vốn, khiến thị trường sụp đổ nhanh và gây ảnh hưởng nặng đến khả năng thanh toán của doanh nghiệp."
            },
            {
                text: "Hạ hoặc nới rộng biên độ dao động giá cổ phiếu trong giai đoạn thị trường hoảng loạn.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Làm tăng tính rủi ro và biến động, khiến tâm lý nhà đầu tư bất ổn và gia tăng tốc độ bán tháo."
            },
            {
                text: "Kiện toàn khung pháp lý, minh bạch hóa thông tin thị trường và nâng cao chất lượng công ty niêm yết.",
                isCorrect: true,
                feedback: "Thành công: Giúp thị trường lấy lại niềm tin, điều chỉnh định giá theo giá trị thực và tạo tiền đề phát triển bền vững."
            }
        ]
    },
    {
        id: 11,
        event: "Điều hành thị trường vàng (2013)",
        question: "Để triệt tiêu vai trò tiền tệ của vàng và ổn định kinh tế vĩ mô, Nhà nước đã thực hiện giải pháp quyết liệt nào?",
        options: [
            {
                text: "Tổ chức thường xuyên các phiên đấu thầu vàng miếng SJC để tăng cung cho thị trường.",
                isCorrect: false,
                feedback: "Kém hiệu quả: Lượng vàng không đủ lớn và không liên tục, chỉ là giải pháp tình thế không kéo giảm bền vững chênh lệch giá."
            },
            {
                text: "Cấm các tổ chức tín dụng huy động và cho vay bằng vàng đối với dân cư.",
                isCorrect: false,
                feedback: "Gây tranh cãi: Khiến vàng trong dân rút khỏi ngân hàng, chuyển sang tích trữ ngoại biên gây lãng phí nguồn lực xã hội."
            },
            {
                text: "Nhà nước độc quyền sản xuất và quản lý kinh doanh vàng miếng SJC thông qua Nghị định 24.",
                isCorrect: true,
                feedback: "Thành công: Đưa thị trường vàng về một mối quản lý, loại bỏ vai trò tiền tệ của vàng trong nền kinh tế."
            }
        ]
    }
];

const TOTAL_CELLS = 40;
const CELL_TYPES = {
    CHALLENGE: "THỬ THÁCH",
    REVIEW: "CÂU HỎI ÔN TẬP",
    LUCKY: "MAY MẮN",
    PENALTY: "BOM/RỦI RO",
};

const PolicyGamePage = () => {
    const [gameState, setGameState] = useState<"intro" | "playing" | "end">("intro");
    const [score, setScore] = useState(0);
    const [revealedCells, setRevealedCells] = useState<number[]>([]);

    // State quản lý Modal chung
    const [activeContent, setActiveContent] = useState<{ type: string, data: any } | null>(null);
    const [result, setResult] = useState<{
        isCorrect: boolean,
        feedback: string,
        correctText?: string,
        pointsDisplay?: string // Thêm dòng này để TypeScript hiểu thuộc tính mới
    } | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);

    // Xử lý đếm ngược cho ô ÔN TẬP
    useEffect(() => {
        let timer: any;
        if (activeContent?.type === CELL_TYPES.REVIEW && !result && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && activeContent?.type === CELL_TYPES.REVIEW && !result) {
            handleAnswer(-1); // Tự động sai nếu hết giờ
        }
        return () => clearInterval(timer);
    }, [activeContent, timeLeft, result]);

    const board = useMemo(() => {
        const tempBoard: string[] = [];
        for (let i = 0; i < 11; i++) tempBoard.push(CELL_TYPES.CHALLENGE);
        for (let i = 0; i < 15; i++) tempBoard.push(CELL_TYPES.REVIEW);
        for (let i = 0; i < 7; i++) tempBoard.push(CELL_TYPES.LUCKY);
        for (let i = 0; i < 7; i++) tempBoard.push(CELL_TYPES.PENALTY);
        return tempBoard.sort(() => Math.random() - 0.5);
    }, [gameState === "intro"]);

    const handleCellClick = (index: number) => {
        if (revealedCells.includes(index) || activeContent) return;

        const type = board[index];
        setRevealedCells(prev => [...prev, index]);

        if (type === CELL_TYPES.CHALLENGE) {
            const usedCount = revealedCells.filter(i => board[i] === CELL_TYPES.CHALLENGE).length;
            setActiveContent({ type, data: CHALLENGES[usedCount % CHALLENGES.length] });
        } else if (type === CELL_TYPES.REVIEW) {
            setTimeLeft(30);
            const idx = revealedCells.filter(i => board[i] === CELL_TYPES.REVIEW).length;
            setActiveContent({ type, data: REVIEWS[idx % REVIEWS.length] });
        } else if (type === CELL_TYPES.LUCKY) {
            setScore(prev => prev + 50);
            toast.success("Ô May Mắn! +50 điểm");
        } else if (type === CELL_TYPES.PENALTY) {
            setScore(prev => prev - 30);
            toast.error("Ô Bom/Rủi ro! -30 điểm");
        }

        if (revealedCells.length + 1 === TOTAL_CELLS) {
            setTimeout(() => setGameState("end"), 2000);
        }
    };

    // Hàm xử lý trả lời chung cho cả 2 loại câu hỏi
    const handleAnswer = (choice: any) => {
        if (!activeContent) return;

        let isCorrect = false;
        let feedback = "";
        let points = 0;
        let correctText = "";

        if (activeContent.type === CELL_TYPES.CHALLENGE) {
            isCorrect = choice.isCorrect;
            feedback = choice.feedback;
            points = isCorrect ? 100 : -50;

            if (!isCorrect) {
                const correctOp = activeContent.data.options.find((o: any) => o.isCorrect);
                // Cập nhật: Hiển thị cả nội dung đáp án đúng VÀ feedback của nó
                correctText = `Đáp án đúng là: "${correctOp.text}". Phân tích: ${correctOp.feedback}`;
            }
        } else {
            isCorrect = choice === activeContent.data.c;
            feedback = isCorrect ? "Chính xác! Bạn đã nắm vững kiến thức ôn tập này." : "Rất tiếc, câu trả lời chưa chính xác.";
            points = isCorrect ? 50 : -20;

            if (!isCorrect) {
                correctText = `Đáp án đúng là: ${activeContent.data.a[activeContent.data.c]}`;
            }
        }

        setScore(prev => prev + points);
        // Lưu kết quả kèm theo số điểm để hiển thị trong Modal
        setResult({
            isCorrect,
            feedback,
            correctText,
            pointsDisplay: points > 0 ? `+${points}` : `${points}`
        });
    };

    const renderCellContent = (index: number, type: string, isRevealed: boolean) => {
        if (!isRevealed) return <div className="flex flex-col items-center"><span className="text-xl font-black text-slate-400 opacity-50">{index + 1}</span><Lock size={18} className="text-slate-300 mt-1" /></div>;
        switch (type) {
            case CELL_TYPES.CHALLENGE: return <div className="text-center"><Gavel size={24} className="mx-auto mb-1" /><p className="text-[10px] font-black uppercase">THỬ THÁCH</p></div>;
            case CELL_TYPES.REVIEW: return <div className="text-center"><HelpCircle size={24} className="mx-auto mb-1" /><p className="text-[10px] font-black uppercase">ÔN TẬP</p></div>;
            case CELL_TYPES.LUCKY: return <div className="text-center"><Gift size={24} className="mx-auto mb-1" /><p className="text-[10px] font-black uppercase">MAY MẮN</p></div>;
            case CELL_TYPES.PENALTY: return <div className="text-center"><AlertTriangle size={24} className="mx-auto mb-1" /><p className="text-[10px] font-black uppercase">BOM</p></div>;
            default: return null;
        }
    };

    const getCellColor = (type: string, isRevealed: boolean) => {
        if (!isRevealed) return "bg-white border-slate-200 hover:border-blue-400 hover:shadow-md";
        switch (type) {
            case CELL_TYPES.CHALLENGE: return "bg-blue-600 border-blue-700 text-white shadow-inner";
            case CELL_TYPES.REVIEW: return "bg-purple-500 border-purple-600 text-white shadow-inner";
            case CELL_TYPES.LUCKY: return "bg-yellow-400 border-yellow-500 text-slate-800 shadow-inner font-bold";
            case CELL_TYPES.PENALTY: return "bg-red-500 border-red-600 text-white shadow-inner";
            default: return "bg-slate-100";
        }
    };

    return (
        <div className="mt-16 min-h-screen bg-[#fdfbf7] pb-20 font-sans">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                {gameState === "intro" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
                        <h1 className="text-6xl font-black text-slate-800 mb-4">LẬT Ô <span className="text-blue-600">CHÍNH TRỊ</span></h1>
                        <p className="text-xl text-slate-600 mb-8 max-w-2xl italic">"Thấu hiểu cách Nhà nước điều hòa lợi ích và quản lý thị trường qua 40 ẩn số thực tiễn."</p>
                        <Button onClick={() => setGameState("playing")} size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-12 py-8 rounded-full shadow-xl transition-all hover:scale-105">Bắt đầu khám phá</Button>
                    </motion.div>
                )}

                {gameState === "playing" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Card className="p-4 bg-white border-l-8 border-blue-600 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Điểm tích lũy</p>
                                <p className="text-4xl font-black text-blue-600">{score}</p>
                            </Card>
                            <Card className="p-4 bg-white border-l-8 border-purple-500 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tiến độ lật ô</p>
                                <p className="text-4xl font-black text-slate-800">{revealedCells.length}<span className="text-lg text-slate-300"> / {TOTAL_CELLS}</span></p>
                            </Card>
                            <Card className="p-4 bg-white border-l-8 border-yellow-400 shadow-sm md:block hidden">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trạng thái</p>
                                <div className="flex items-center gap-2 mt-2"><Zap size={20} className="text-yellow-500 animate-pulse" /><span className="font-bold text-slate-700">Đang hoạt động</span></div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 p-4 bg-slate-200/50 rounded-2xl shadow-inner border-2 border-slate-200">
                            {board.map((type, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={!revealedCells.includes(index) ? { scale: 1.05, y: -2 } : {}}
                                    whileTap={!revealedCells.includes(index) ? { scale: 0.95 } : {}}
                                    onClick={() => handleCellClick(index)}
                                    className={`h-28 flex flex-col items-center justify-center rounded-xl cursor-pointer border-2 transition-all duration-300 ${getCellColor(type, revealedCells.includes(index))}`}
                                >
                                    {renderCellContent(index, type, revealedCells.includes(index))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MODAL HIỂN THỊ CHUNG (Sửa chính ở đây) */}
                <AnimatePresence>
                    {activeContent && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="max-w-3xl w-full">
                                <Card className={`p-8 bg-white rounded-3xl shadow-2xl border-4 relative overflow-hidden ${activeContent.type === CELL_TYPES.CHALLENGE ? 'border-blue-600' : 'border-purple-500'}`}>

                                    {!result ? (
                                        <>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className={`flex items-center gap-3 ${activeContent.type === CELL_TYPES.CHALLENGE ? 'text-blue-600' : 'text-purple-600'}`}>
                                                    {activeContent.type === CELL_TYPES.CHALLENGE ? <Gavel size={32} /> : <HelpCircle size={32} />}
                                                    <h3 className="text-sm font-black uppercase tracking-widest">{activeContent.type}</h3>
                                                </div>
                                                {activeContent.type === CELL_TYPES.REVIEW && (
                                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${timeLeft < 10 ? 'bg-red-100 text-red-600 animate-bounce' : 'bg-slate-100 text-slate-600'}`}>
                                                        <Timer size={20} /> {timeLeft}s
                                                    </div>
                                                )}
                                            </div>

                                            <h2 className="text-2xl font-black text-slate-800 mb-6 leading-tight">
                                                {activeContent.type === CELL_TYPES.CHALLENGE ? activeContent.data.event : activeContent.data.q}
                                            </h2>

                                            {activeContent.type === CELL_TYPES.CHALLENGE && (
                                                <div className="bg-blue-50 p-4 rounded-xl mb-6 italic text-slate-700 border-l-4 border-blue-400">
                                                    "{activeContent.data.question}"
                                                </div>
                                            )}

                                            <div className="grid gap-3">
                                                {(activeContent.type === CELL_TYPES.CHALLENGE ? activeContent.data.options : activeContent.data.a).map((opt: any, i: number) => (
                                                    <Button
                                                        key={i}
                                                        onClick={() => handleAnswer(activeContent.type === CELL_TYPES.CHALLENGE ? opt : i)}
                                                        variant="outline"
                                                        className="w-full justify-start text-left h-auto py-4 px-6 whitespace-normal border-2 border-slate-100 hover:border-blue-400 rounded-xl group"
                                                    >
                                                        <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-4 font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">{i + 1}</span>
                                                        <span className="text-slate-700 font-bold">{activeContent.type === CELL_TYPES.CHALLENGE ? opt.text : opt}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-6">
                                            {result.isCorrect ? (
                                                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-green-600 mb-6">
                                                    <CheckCircle size={80} className="mx-auto mb-4 bg-green-100 rounded-full p-2" />
                                                    <h4 className="text-4xl font-black italic">CHÍNH XÁC!</h4>
                                                    <p className="text-2xl font-bold mt-2 text-green-700">{result.pointsDisplay} điểm</p>
                                                </motion.div>
                                            ) : (
                                                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-red-500 mb-6">
                                                    <XCircle size={80} className="mx-auto mb-4 bg-red-100 rounded-full p-2" />
                                                    <h4 className="text-4xl font-black italic">CHƯA ĐÚNG!</h4>
                                                    <p className="text-2xl font-bold mt-2 text-red-700">{result.pointsDisplay} điểm</p>
                                                </motion.div>
                                            )}

                                            <div className="bg-slate-50 p-6 rounded-2xl text-left mb-8 border-2 border-slate-100 relative">
                                                <div className="absolute -top-3 left-6 bg-white px-3 py-1 border border-slate-200 rounded-full text-xs font-black text-slate-500 uppercase flex items-center gap-1">
                                                    <Info size={14} /> Giải thích
                                                </div>
                                                <p className="text-slate-700 font-bold leading-relaxed">{result.feedback}</p>

                                                {result.correctText && (
                                                    <div className="mt-4 pt-4 border-t border-dashed border-slate-300">
                                                        <p className="text-blue-700 font-black text-xs uppercase mb-1">Thông tin bổ sung:</p>
                                                        <p className="text-slate-600 text-sm font-medium italic leading-relaxed">
                                                            {result.correctText}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <Button
                                                onClick={() => { setActiveContent(null); setResult(null); }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-8 text-xl font-black rounded-2xl shadow-lg transition-all"
                                            >
                                                TIẾP TỤC KHÁM PHÁ
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {gameState === "end" && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-xl mx-auto">
                        <Card className="p-12 text-center shadow-2xl border-t-8 border-blue-600 rounded-3xl bg-white">
                            <div className="p-6 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-blue-600"><RotateCcw size={48} /></div>
                            <h2 className="text-4xl font-black mb-2 text-slate-800 uppercase italic">Hoàn thành!</h2>
                            <div className="bg-slate-50 p-8 rounded-3xl mb-10 border-2 border-slate-100">
                                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Tổng điểm</p>
                                <div className="text-7xl font-black text-blue-600">{score}</div>
                            </div>
                            <Button onClick={() => window.location.reload()} className="w-full py-8 text-xl font-black rounded-2xl bg-blue-600 text-white">CHƠI LẠI</Button>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PolicyGamePage;