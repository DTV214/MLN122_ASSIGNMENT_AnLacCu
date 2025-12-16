"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Briefcase,
    Trello,
    ThumbsUp,
    X,
    Dice5,
    Gavel,
    CheckCircle,
    SkipForward,
    RotateCcw,
    Minus,
    Plus,
    Home,
    AlertCircle,
    Lightbulb,
    CornerRightDown,
    CornerLeftUp,
    AlertTriangle, // Thêm icon cho cảnh báo/sai
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";

// --- CÁC HẰNG SỐ CỦA GAME ---
const NUM_CELLS_PER_ROUND = 10;
const NUM_ROUNDS = 3;
const MAX_STEPS = 3; // Giới hạn bước đi là 1-3
const MAX_CHALLENGES = 11;

const POINTS = {
    ANSWER_CORRECT: { min: 40, max: 60 }, // Điểm cao hơn
    ANSWER_SKIP: { min: 10, max: 15 },    // Điểm an ủi (khi bỏ qua hoặc chọn sai phương pháp)
    LUCKY_CELL: 20,
    UNLUCKY_CELL: -15,
    FINISH_BONUS: 50,
};

// --- DỮ LIỆU THỬ THÁCH (11 CÂU TỪ Game.txt) ---
type PolicyResult = "SUCCESS" | "FAILURE" | "CONTROVERSIAL";
type PolicyType = "P1" | "P2" | "P3";

interface PolicyDetail {
    type: PolicyType;
    description: string;
    outcome: PolicyResult;
    outcomeText: string;
}

interface Challenge {
    id: number;
    event: string;
    question: string;
    policies: PolicyDetail[];
}

// CÁC DỮ LIỆU CHALLENGES ĐƯỢC GIỮ NGUYÊN NHƯ FILE GỐC
const CHALLENGES: Challenge[] = [
    {
        id: 1,
        event: "Lạm phát tăng cao (2008, 2011)",
        question: "Chọn phương pháp được đánh giá là hiệu quả trong việc kiềm chế lạm phát?",
        policies: [
            { type: "P1", description: "Tăng mạnh lãi suất điều hành (có lúc lên tới 14-15%).", outcome: "FAILURE" as PolicyResult, outcomeText: "Việc tăng lãi suất quá nhanh và cao đã đẩy chi phí vốn lên quá mức, gây suy giảm sản xuất và tăng nguy cơ nợ xấu." },
            { type: "P2", description: "Sử dụng công cụ hành chính/quản lý để \"ấn định\" giá (quyết định một mức giá cụ thể cho hàng hóa).", outcome: "FAILURE" as PolicyResult, outcomeText: "Gây méo mó thị trường và gây lỗ cho doanh nghiệp nhà nước (như EVN, PVN)." },
            { type: "P3", description: "Thực hiện chính sách Tiền tệ thận trọng, kết hợp với siết chặt kỷ luật tài khóa (cắt giảm chi tiêu công).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Lạm phát được kiềm chế dần từ mức gần 18% (2011) xuống còn 6.81% (2012) và tiếp tục giảm mạnh." },
        ],
    },
    {
        id: 2,
        event: "Khủng hoảng Nợ Xấu Ngân Hàng (Đầu thập niên 2010)",
        question: "Chọn phương pháp thành công trong việc giải quyết nợ xấu?",
        policies: [
            { type: "P1", description: "Điều hành Chính sách Tiền tệ (Tăng/Giảm lãi suất điều hành liên tục).", outcome: "FAILURE" as PolicyResult, outcomeText: "Biện pháp thắt chặt để chống lạm phát (2011-2012) làm các doanh nghiệp suy yếu, nợ xấu tăng thêm. Nới lỏng lại khó khăn vì lòng tin giảm sút." },
            { type: "P2", description: "Phương pháp \"Nhốt nợ\" bằng Trái phiếu Đặc biệt của VAMC (mua nợ xấu bằng Trái phiếu đặc biệt, không phải tiền mặt).", outcome: "FAILURE" as PolicyResult, outcomeText: "Chỉ là giải pháp kỹ thuật để che phủ nợ xấu trên sổ sách, không giải quyết được gốc rễ là tài sản đảm bảo kém thanh khoản." },
            { type: "P3", description: "Ban hành Cơ chế đặc biệt cho Thu hồi Tài sản Đảm bảo (Nghị quyết 42).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Tốc độ xử lý nợ xấu của toàn hệ thống đã tăng gấp hơn 2 lần, giúp thị trường lấy lại lòng tin cơ bản." },
        ],
    },
    {
        id: 3,
        event: "Khủng hoảng tỷ giá và khan hiếm ngoại tệ (2011 - 2012)",
        question: "Chọn giải pháp thành công giúp thị trường lấy lại lòng tin và ổn định tỷ giá bền vững?",
        policies: [
            { type: "P1", description: "Bán Ngoại tệ (USD) từ Quỹ Dự trữ Ngoại hối.", outcome: "FAILURE" as PolicyResult, outcomeText: "Chỉ là giải pháp tức thời và làm cạn kiệt Dự trữ Ngoại hối mà không giải quyết được gốc rễ là tình trạng nhập siêu và lạm phát cao." },
            { type: "P2", description: "Quy định Lãi suất Huy động (Gửi tiền) Ngoại tệ là 0%.", outcome: "FAILURE" as PolicyResult, outcomeText: "Khiến người dân và doanh nghiệp rút USD khỏi ngân hàng và găm giữ bên ngoài, làm trầm trọng thêm tình trạng khan hiếm ngoại tệ trong hệ thống chính thức." },
            { type: "P3", description: "Cơ chế Điều hành Tỷ giá Trung tâm Linh hoạt và Tái lập Cân bằng Cung-Cầu (xuất siêu, tăng Dự trữ Ngoại hối).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Chuyển từ can thiệp hành chính sang điều hành linh hoạt hơn, đồng thời cải thiện mạnh mẽ Cán cân Thương mại, giúp thị trường lấy lại lòng tin cơ bản." },
        ],
    },
    {
        id: 4,
        event: "Sự cố Formosa gây ô nhiễm biển miền Trung (2016)",
        question: "Chọn phương pháp thành công giúp điều hòa lợi ích và giải quyết dứt điểm ô nhiễm?",
        policies: [
            { type: "P1", description: "Chi trả bồi thường trực tiếp cho người dân.", outcome: "FAILURE" as PolicyResult, outcomeText: "Việc chi trả vội vàng, thiếu tiêu chí xác định thiệt hại rõ ràng, đã dẫn đến tình trạng chi trả không đồng đều, thiếu công bằng và gây khiếu kiện trong cộng đồng ngư dân." },
            { type: "P2", description: "Chính sách hỗ trợ chuyển đổi nghề nghiệp (từ đánh bắt sang nghề khác).", outcome: "FAILURE" as PolicyResult, outcomeText: "Thiếu tính khả thi do ngư dân không có kinh nghiệm, thiếu vốn đầu tư, không giải quyết được sinh kế bền vững." },
            { type: "P3", description: "Buộc Formosa Cam kết $500$ triệu USD và Lập Quỹ Khắc phục Môi trường.", outcome: "SUCCESS" as PolicyResult, outcomeText: "Chuyển gánh nặng chi phí từ Nhà nước sang bên gây ô nhiễm và phục hồi hệ sinh thái biển, tạo cơ sở để ngư trường được khai thác trở lại an toàn." },
        ],
    },
    {
        id: 5,
        event: "Ổn định giá gạo (2023 - 2024)",
        question: "Chọn phương pháp được cho là hiệu quả cho quá trình giao dịch?",
        policies: [
            { type: "P1", description: "Kiểm tra và Siết chặt điều kiện dự trữ lưu thông gạo (yêu cầu doanh nghiệp đảm bảo dự trữ lưu thông).", outcome: "FAILURE" as PolicyResult, outcomeText: "Gây cản trở quá trình giao dịch, tạo tâm lý e ngại cho doanh nghiệp, làm giảm tính linh hoạt của thị trường và ảnh hưởng đến uy tín trong giao thương quốc tế." },
            { type: "P2", description: "Giao nhiệm vụ Bình ổn giá gạo tại các thành phố lớn (Vinafood II bán gạo bình ổn).", outcome: "FAILURE" as PolicyResult, outcomeText: "Quy mô triển khai nhỏ so với nhu cầu, nguồn gạo bình ổn giá nhanh chóng bị thiếu hụt, không đủ sức kéo giảm mặt bằng giá chung." },
            { type: "P3", description: "Duy trì và Thực thi Chiến lược An ninh Lương thực (Quyết định 581/QĐ-TTg) - tập trung vào sản lượng ổn định và chất lượng cao.", outcome: "SUCCESS" as PolicyResult, outcomeText: "Tạo sự an tâm cho người nông dân (giá tốt) và doanh nghiệp (được phép xuất khẩu), đảm bảo cung đủ cho thị trường nội địa và tận dụng cơ hội xuất khẩu giá cao." },
        ],
    },
    {
        id: 6,
        event: "Xây dựng Nông thôn mới (từ 2010)",
        question: "Chọn phương pháp được đánh giá là thành công và bền vững nhất trong 3?",
        policies: [
            { type: "P1", description: "Phân bổ Ngân sách tập trung (Đầu tư dàn trải vào các công trình hạ tầng).", outcome: "FAILURE" as PolicyResult, outcomeText: "Dẫn đến tình trạng lãng phí và nợ đọng xây dựng cơ bản tại nhiều xã, khiến công trình không được khai thác hiệu quả." },
            { type: "P2", description: "Vận động Người dân đóng góp (huy động đa dạng nguồn lực, bao gồm sự đóng góp của người dân).", outcome: "CONTROVERSIAL" as PolicyResult, outcomeText: "Việc thực thi thiếu kiểm soát ở một số nơi đã dẫn đến tình trạng người dân bị áp đặt hoặc vận động quá mức để đóng góp, tạo ra gánh nặng tài chính không đồng đều." },
            { type: "P3", description: "Phát triển Chương trình \"Mỗi xã một sản phẩm\" (OCOP) (chuyển trọng tâm từ đầu tư hạ tầng sang phát triển kinh tế nội sinh).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Tập trung vào nâng cao giá trị gia tăng của các sản phẩm đặc trưng địa phương, tăng thu nhập trực tiếp cho người dân, tạo sự phát triển bền vững." },
        ],
    },
    {
        id: 7,
        event: "Phục hồi kinh tế sau Covid-19 (2020 - 2022)",
        question: "Chọn chính sách tài khóa được đánh giá là thành công nhất trong kích thích tiêu dùng?",
        policies: [
            { type: "P1", description: "Các Gói Hỗ trợ Lãi suất và Cơ cấu lại thời hạn trả nợ (Theo Thông tư của NHNN).", outcome: "FAILURE" as PolicyResult, outcomeText: "Việc giải ngân vốn vay ưu đãi và cơ cấu lại nợ cho doanh nghiệp rất chậm vì Ngân hàng thương mại ngần ngại rủi ro nợ xấu tăng trở lại." },
            { type: "P2", description: "Các Gói Hỗ trợ An sinh Xã hội Trực tiếp (Tiền mặt).", outcome: "FAILURE" as PolicyResult, outcomeText: "Quá trình xác định đối tượng, thủ tục hành chính phức tạp và việc phân bổ tiền chậm đã khiến nhiều người lao động không nhận được hỗ trợ kịp thời." },
            { type: "P3", description: "Chính sách Giảm Thuế Giá trị gia tăng (VAT) từ 10% xuống 8%.", outcome: "SUCCESS" as PolicyResult, outcomeText: "Tác động nhanh chóng và rộng rãi đến mọi người tiêu dùng, đơn giản hóa thủ tục hành chính và kích thích trực tiếp nhu cầu tiêu dùng cuối cùng." },
        ],
    },
    {
        id: 8,
        event: "Đảm bảo cung ứng xăng dầu (năm 2022)",
        question: "Chọn công cụ giúp Cân bằng lợi ích kinh doanh và nhanh chóng giải quyết tình trạng khan hiếm?",
        policies: [
            { type: "P1", description: "Tăng cường thanh tra, kiểm tra và xử phạt các cửa hàng đóng cửa.", outcome: "FAILURE" as PolicyResult, outcomeText: "Chỉ có hiệu lực nhất thời, không giải quyết được vấn đề cốt lõi là lỗ kinh doanh của các cửa hàng bán lẻ, gây căng thẳng giữa Nhà nước và doanh nghiệp." },
            { type: "P2", description: "Điều chỉnh Cơ chế Điều hành Giá (Tăng chi phí định mức và Chiết khấu).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Cân bằng lại lợi ích kinh doanh cho các cửa hàng bán lẻ, loại bỏ lý do đóng cửa do lỗ vốn. Cùng với việc phân bổ hạn mức nhập khẩu linh hoạt hơn, công cụ này đã khôi phục lòng tin của thị trường." },
            { type: "P3", description: "Giảm Thuế Bảo vệ Môi trường và Thuế Tiêu thụ Đặc biệt.", outcome: "FAILURE" as PolicyResult, outcomeText: "Chỉ giúp giảm gánh nặng giá cả cho người tiêu dùng nhưng không giải quyết được mâu thuẫn lợi ích giữa doanh nghiệp bán lẻ và doanh nghiệp đầu mối (vì biên lợi nhuận của họ vẫn bị siết chặt)." },
        ],
    },
    {
        id: 9,
        event: "Xây dựng đặc khu kinh tế (2018)",
        question: "Chọn quy định gây ra tác dụng lớn nhất về ổn định xã hội?",
        policies: [
            { type: "P1", description: "Ưu đãi Thuế và Thuế quan đặc biệt (Miễn giảm thuế TNDN, thuế TNCN, và thuế nhập khẩu).", outcome: "CONTROVERSIAL" as PolicyResult, outcomeText: "Gây tranh cãi về cân bằng lợi ích quốc gia, bị coi là có thể dẫn đến chảy máu ngân sách và gây méo mó cạnh tranh giữa các khu vực." },
            { type: "P2", description: "Kéo dài thời hạn thuê đất lên đến 99 năm.", outcome: "FAILURE" as PolicyResult, outcomeText: "Gây ra cơn sốt đất đai nghiêm trọng tại các khu vực dự kiến thành lập đặc khu, dẫn đến sự mất cân bằng lợi ích xã hội lớn và làm méo mó thị trường bất động sản." },
            { type: "P3", description: "Tạm dừng và Rà soát lại Toàn bộ Cơ chế ĐKKT.", outcome: "SUCCESS" as PolicyResult, outcomeText: "Giảm thiểu rủi ro ổn định xã hội, vĩ mô và ngăn chặn sự thất thoát đất đai cũng như bong bóng bất động sản lan rộng." },
        ],
    },
    {
        id: 10,
        event: "Khủng hoảng bong bóng chứng khoán (Đỉnh cao 2007)",
        question: "Chọn phương pháp thành công giúp thị trường lấy lại niềm tin cơ bản?",
        policies: [
            { type: "P1", description: "Thắt chặt Tín dụng Ngân hàng và Nâng cao Tỷ lệ Dự trữ Bắt buộc.", outcome: "FAILURE" as PolicyResult, outcomeText: "Việc siết chặt tín dụng một cách đột ngột và mạnh mẽ đã cắt đứt dòng vốn, khiến thị trường sụp đổ nhanh chóng và làm cuộc khủng hoảng trở nên trầm trọng hơn." },
            { type: "P2", description: "Hạ/Nới rộng Biên độ Dao động Giá Cổ phiếu (Từ +- 5% lên +- 10%).", outcome: "FAILURE" as PolicyResult, outcomeText: "Trong giai đoạn thị trường hoảng loạn lại làm tăng rủi ro và sự biến động, khiến tâm lý nhà đầu tư càng thêm bất ổn và tăng tốc độ bán tháo." },
            { type: "P3", description: "Kiện toàn Khung pháp lý và Minh bạch hóa thông tin thị trường (Luật Chứng khoán sửa đổi).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Việc tăng cường minh bạch và nâng cao chất lượng hàng hóa đã giúp thị trường lấy lại niềm tin cơ bản, điều chỉnh lại định giá theo giá trị thực." },
        ],
    },
    {
        id: 11,
        event: "Điều hành thị trường vàng (Năm 2013)",
        question: "Chọn công cụ giúp triệt tiêu hoàn toàn vai trò tiền tệ của vàng (Thành công)?",
        policies: [
            { type: "P1", description: "Tổ chức các phiên đấu thầu vàng miếng SJC (tăng cung vàng ra thị trường).", outcome: "FAILURE" as PolicyResult, outcomeText: "Lượng vàng đấu thầu không đủ lớn và không liên tục, không thể thỏa mãn được nhu cầu lớn của thị trường và không kéo giảm bền vững chênh lệch giá vàng." },
            { type: "P2", description: "Cấm các tổ chức tín dụng (TCTD) huy động và cho vay bằng vàng.", outcome: "CONTROVERSIAL" as PolicyResult, outcomeText: "Khiến một lượng lớn vàng trong dân rút khỏi hệ thống ngân hàng và chuyển sang hình thức tích trữ ngoại biên, gây lãng phí nguồn lực và làm giảm khả năng quản lý của Nhà nước." },
            { type: "P3", description: "NHNN độc quyền sản xuất và quản lý hoạt động kinh doanh vàng miếng SJC (Theo Nghị định 24/2012/NĐ-CP).", outcome: "SUCCESS" as PolicyResult, outcomeText: "Đưa thị trường vàng miếng về một mối quản lý duy nhất, triệt tiêu hoàn toàn vai trò tiền tệ của vàng trong nền kinh tế." },
        ],
    },
];

// --- CÁC LOẠI Ô TRÊN BẢNG ---
const CELL_TYPES = {
    START: "BẮT ĐẦU",
    CHALLENGE: "THỬ THÁCH",
    LUCKY: "MAY MẮN",
    STEP_MOVE: "BƯỚC TIẾN", // Thay thế UNLUCKY
    NEUTRAL: "TRUNG LẬP",
    FINISH: "VỀ ĐÍCH",
};

// Cấu trúc bảng (10 ô/vòng * 3 vòng)
const BOARD_STRUCTURE = [
    // Vòng 1 (Index 0-9)
    CELL_TYPES.START,      // 0
    CELL_TYPES.CHALLENGE,  // 1
    CELL_TYPES.STEP_MOVE,  // 2 (Lùi/Tiến)
    CELL_TYPES.NEUTRAL,    // 3
    CELL_TYPES.CHALLENGE,  // 4
    CELL_TYPES.LUCKY,      // 5
    CELL_TYPES.CHALLENGE,  // 6
    CELL_TYPES.STEP_MOVE,  // 7 (Lùi/Tiến)
    CELL_TYPES.NEUTRAL,    // 8
    CELL_TYPES.FINISH,     // 9
    // Vòng 2 (Index 10-19)
    CELL_TYPES.START,      // 10
    CELL_TYPES.CHALLENGE,  // 11
    CELL_TYPES.STEP_MOVE,  // 12
    CELL_TYPES.CHALLENGE,  // 13
    CELL_TYPES.LUCKY,      // 14
    CELL_TYPES.CHALLENGE,  // 15
    CELL_TYPES.STEP_MOVE,  // 16
    CELL_TYPES.NEUTRAL,    // 17
    CELL_TYPES.CHALLENGE,  // 18
    CELL_TYPES.FINISH,     // 19
    // Vòng 3 (Index 20-29)
    CELL_TYPES.START,      // 20
    CELL_TYPES.CHALLENGE,  // 21
    CELL_TYPES.STEP_MOVE,  // 22
    CELL_TYPES.CHALLENGE,  // 23
    CELL_TYPES.LUCKY,      // 24
    CELL_TYPES.CHALLENGE,  // 25
    CELL_TYPES.STEP_MOVE,  // 26
    CELL_TYPES.NEUTRAL,    // 27
    CELL_TYPES.CHALLENGE,  // 28
    CELL_TYPES.FINISH,     // 29
];

const getCellType = (index: number) => {
    return BOARD_STRUCTURE[index] || CELL_TYPES.NEUTRAL;
};

// --- TYPES ---
type GameState = "intro" | "playing" | "challenge" | "summary" | "end";
type ChallengeStatus = "pending" | "answered" | "skipped";

// --- COMPONENT CHÍNH ---
const PolicyGamePage = () => {
    const [gameState, setGameState] = useState<GameState>("intro");
    const [score, setScore] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0); // 0 đến 30
    const [round, setRound] = useState(1);
    const [stepsToMove, setStepsToMove] = useState(1); // Số bước người chơi quyết định đi
    const [challengeIndex, setChallengeIndex] = useState(0); // Index của câu hỏi trong CHALLENGES
    const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus>("pending");
    const [answeredChallenges, setAnsweredChallenges] = useState<number[]>([]); // Lưu ID các câu đã trả lời
    const [lastAction, setLastAction] = useState("");
    const [chosenPolicy, setChosenPolicy] = useState<PolicyDetail | null>(null); // Lưu lựa chọn của người chơi

    // Lấy câu hỏi hiện tại
    const currentChallenge = useMemo(() => {
        // Chỉ lấy các câu hỏi chưa được trả lời
        const availableChallenges = CHALLENGES.filter(c => !answeredChallenges.includes(c.id));
        if (availableChallenges.length === 0) return null;

        // Đảm bảo challengeIndex hợp lệ
        const index = challengeIndex % availableChallenges.length;
        return availableChallenges[index];
    }, [challengeIndex, answeredChallenges]);


    const startGame = () => {
        setScore(0);
        setCurrentPosition(0);
        setRound(1);
        // Chọn câu hỏi đầu tiên chưa trả lời
        const firstChallenge = CHALLENGES.find(c => !answeredChallenges.includes(c.id));
        setChallengeIndex(firstChallenge ? CHALLENGES.indexOf(firstChallenge) : 0);
        setAnsweredChallenges([]);
        setLastAction("");
        setStepsToMove(1);
        setGameState("playing");
    };

    const movePlayer = () => {
        if (gameState !== "playing") return;

        // 1. Kiểm tra nếu đang ở ô Thử thách mà chưa trả lời
        const currentCellType = getCellType(currentPosition);
        if (currentCellType === CELL_TYPES.CHALLENGE && challengeStatus === "pending") {
            toast.warning("Bạn phải hoàn thành thử thách hoặc BỎ QUA trước khi đi tiếp!");
            return;
        }

        const steps = stepsToMove; // Sử dụng số bước đã chọn

        let newPosition = currentPosition + steps;
        const oldPosition = currentPosition;

        // Xử lý Về đích của Vòng hiện tại
        const finishLine = round * NUM_CELLS_PER_ROUND;
        if (newPosition >= finishLine) {
            // Về đích
            const points = POINTS.FINISH_BONUS;
            setScore(prev => prev + points);
            setLastAction(`Quyết định đi ${steps} bước. Về đích Vòng ${round}! +${points} Điểm.`);

            if (round === NUM_ROUNDS) {
                setGameState("end");
                return;
            }

            // Chuyển vòng (Vị trí chuyển về ô FINISH của vòng cũ, đồng thời là START của vòng mới)
            newPosition = finishLine;
            setRound(prev => prev + 1);

        } else {
            setLastAction(`Quyết định đi: ${steps} bước.`);
        }

        setCurrentPosition(newPosition);
        // Reset challenge status *khi người chơi bắt đầu di chuyển*
        if (currentCellType === CELL_TYPES.CHALLENGE) {
            setChallengeStatus("pending");
        }

        setGameState("summary"); // Tạm chuyển summary để xem kết quả

        setTimeout(() => {
            // Thực hiện hành động của ô sau khi đi
            const cellType = getCellType(newPosition);
            handleCellAction(newPosition, cellType, steps, oldPosition);
        }, 500);
    };

    // Hàm này xử lý hành động khi rơi vào ô
    const handleCellAction = useCallback((pos: number, cellType: string, steps: number, oldPos: number) => {
        setGameState("playing"); // Quay lại trạng thái chơi sau khi xử lý

        switch (cellType) {
            case CELL_TYPES.CHALLENGE:
                setChosenPolicy(null); // Reset lựa chọn
                setChallengeStatus("pending"); // Đặt trạng thái chờ trả lời
                // Tự động chuyển trạng thái để hiển thị modal thử thách
                setGameState("challenge");
                break;
            case CELL_TYPES.LUCKY:
                const luckyPoints = POINTS.LUCKY_CELL;
                setScore(prev => prev + luckyPoints);
                setLastAction(prev => prev + ` Gặp ô MAY MẮN: +${luckyPoints} Điểm.`);
                toast.success(`Ô May Mắn: +${luckyPoints} Điểm!`);
                break;
            case CELL_TYPES.STEP_MOVE:
                // Ô BƯỚC TIẾN (Lùi/Tiến)
                const randomSteps = Math.floor(Math.random() * MAX_STEPS) + 1; // 1-3 bước
                const isForward = Math.random() < 0.5; // 50% Tiến, 50% Lùi
                const pointsChange = isForward
                    ? Math.floor(Math.random() * 20) + 5 // +5 đến +25
                    : -(Math.floor(Math.random() * 15) + 5); // -5 đến -20

                let newPos = isForward ? pos + randomSteps : pos - randomSteps;

                // Đảm bảo không lùi quá vạch START của vòng
                const startOfRound = Math.floor(pos / NUM_CELLS_PER_ROUND) * NUM_CELLS_PER_ROUND;
                newPos = Math.max(startOfRound, newPos);

                // Cập nhật vị trí và điểm
                setCurrentPosition(newPos);
                setScore(prev => prev + pointsChange);

                const actionText = isForward
                    ? `Tiến ${randomSteps} ô, ${pointsChange > 0 ? "+" : ""}${pointsChange} Điểm.`
                    : `Lùi ${randomSteps} ô (Về vị trí ${newPos}), ${pointsChange} Điểm.`;

                setLastAction(prev => prev + ` Gặp ô BƯỚC TIẾN: ${actionText}`);
                toast.info(`BƯỚC TIẾN ngẫu nhiên: ${actionText}`);

                // Xử lý lại hành động của ô mới (nếu rơi vào ô Challenge, Lucky, v.v...)
                setTimeout(() => {
                    const newCellType = getCellType(newPos);
                    if (newCellType !== CELL_TYPES.STEP_MOVE && newCellType !== CELL_TYPES.NEUTRAL) {
                        handleCellAction(newPos, newCellType, 0, pos);
                    }
                }, 500);

                break;
            case CELL_TYPES.NEUTRAL:
                setLastAction(prev => prev + ` Gặp ô TRUNG LẬP.`);
                break;
            case CELL_TYPES.FINISH:
                // Đã xử lý Về đích trong movePlayer, chỉ là ô trung gian chờ bấm Move
                break;
            default:
                break;
        }
    }, [round]);

    // --- XỬ LÝ TRẢ LỜI THỬ THÁCH (CHỌN PHƯƠNG PHÁP) ---
    const handlePolicyChoice = (chosenPolicy: PolicyDetail) => {
        if (!currentChallenge) return;
        setChosenPolicy(chosenPolicy); // Lưu lại lựa chọn của người chơi

        let pointsEarned = 0;
        let isCorrectChoice = false;

        // Logic kiểm tra câu trả lời: Luôn tìm SUCCESS
        if (chosenPolicy.outcome === "SUCCESS") {
            isCorrectChoice = true;
        }

        // Tính điểm
        if (isCorrectChoice) {
            pointsEarned = Math.floor(
                Math.random() * (POINTS.ANSWER_CORRECT.max - POINTS.ANSWER_CORRECT.min + 1) + POINTS.ANSWER_CORRECT.min
            );
            setLastAction(`Trả lời ĐÚNG Thử thách '${currentChallenge.event}' (Chọn ${chosenPolicy.type}): +${pointsEarned} Điểm.`);
            toast.success(`Chính xác! Phương pháp ${chosenPolicy.type} là đáp án. +${pointsEarned} Điểm.`);
        } else {
            pointsEarned = Math.floor(
                Math.random() * (POINTS.ANSWER_SKIP.max - POINTS.ANSWER_SKIP.min + 1) + POINTS.ANSWER_SKIP.min
            );
            setLastAction(`Trả lời SAI Thử thách '${currentChallenge.event}' (Chọn ${chosenPolicy.type}): +${pointsEarned} Điểm an ủi.`);
            toast.error(`Sai! Hãy xem lại giải pháp đúng. +${pointsEarned} Điểm an ủi.`);
        }

        setScore(prev => prev + pointsEarned);
        setAnsweredChallenges(prev => [...prev, currentChallenge.id]);

        // Chuẩn bị cho câu hỏi tiếp theo
        const nextAvailableChallenge = CHALLENGES.find(c => !answeredChallenges.includes(c.id));
        if (nextAvailableChallenge) {
            setChallengeIndex(CHALLENGES.indexOf(nextAvailableChallenge));
        }

        setChallengeStatus("answered"); // Đánh dấu đã trả lời
        // Vẫn ở trạng thái challenge để hiển thị kết quả và nút Tiếp tục
    };

    // --- XỬ LÝ BỎ QUA THỬ THÁCH ---
    const handleSkipChallenge = () => {
        if (!currentChallenge) return;

        const pointsEarned = Math.floor(
            Math.random() * (POINTS.ANSWER_SKIP.max - POINTS.ANSWER_SKIP.min + 1) + POINTS.ANSWER_SKIP.min
        );

        setScore(prev => prev + pointsEarned);
        setLastAction(`Bỏ qua Thử thách '${currentChallenge.event}': +${pointsEarned} Điểm an ủi.`);
        toast.info(`Bạn đã chọn Bỏ qua Thử thách. +${pointsEarned} Điểm an ủi.`);

        setAnsweredChallenges(prev => [...prev, currentChallenge.id]);

        // Chuẩn bị cho câu hỏi tiếp theo
        const nextAvailableChallenge = CHALLENGES.find(c => !answeredChallenges.includes(c.id));
        if (nextAvailableChallenge) {
            setChallengeIndex(CHALLENGES.indexOf(nextAvailableChallenge));
        }

        setChallengeStatus("answered"); // Đánh dấu đã trả lời/bỏ qua để cho phép di chuyển
        setGameState("playing"); // Quay lại trạng thái chơi ngay lập tức
    };

    // --- UI COMPONENTS ---
    const renderCell = (index: number) => {
        const isCurrent = index === currentPosition;
        const cellType = getCellType(index);
        const roundNumber = Math.floor(index / NUM_CELLS_PER_ROUND) + 1;
        const adjustedIndex = index % NUM_CELLS_PER_ROUND;

        let bgColor = "bg-gray-100";
        let textColor = "text-slate-800"; // Mặc định cho Neutral
        let icon = <Trello size={18} />;
        let label = cellType;
        let borderColor = "border-slate-300";

        if (cellType === CELL_TYPES.START) {
            bgColor = "bg-green-500";
            textColor = "text-white";
            icon = <Briefcase size={18} />;
            label = "BẮT ĐẦU";
        } else if (cellType === CELL_TYPES.CHALLENGE) {
            bgColor = "bg-blue-500";
            textColor = "text-white";
            icon = <Gavel size={18} />;
            label = "THỬ THÁCH";
        } else if (cellType === CELL_TYPES.LUCKY) {
            bgColor = "bg-yellow-500";
            textColor = "text-white";
            icon = <ThumbsUp size={18} />;
            label = "MAY MẮN";
        } else if (cellType === CELL_TYPES.STEP_MOVE) { // Ô BƯỚC TIẾN
            bgColor = "bg-red-500";
            textColor = "text-white";
            icon = <Dice5 size={18} />;
            label = "BƯỚC TIẾN";
        } else if (cellType === CELL_TYPES.FINISH) {
            bgColor = "bg-purple-500";
            textColor = "text-white";
            icon = <CheckCircle size={18} />;
            label = "VỀ ĐÍCH";
        } else if (cellType === CELL_TYPES.NEUTRAL) {
            // Cải thiện ô Trung lập
            bgColor = "bg-white"; // Màu trắng dễ nhìn hơn
            textColor = "text-slate-600";
            borderColor = "border-slate-400"; // Thêm viền xám
            icon = <Trello size={18} className="text-slate-600" />;
            label = "TRUNG LẬP";
        }

        return (
            <div
                key={index}
                className={`relative h-16 flex flex-col items-center justify-center p-1 rounded-lg transition-all duration-300 border-2 ${bgColor} ${textColor} ${borderColor} ${isCurrent ? "scale-110 ring-4 ring-offset-2 ring-yellow-400 z-10" : "shadow-md"
                    }`}
            >
                {isCurrent && (
                    <motion.div
                        className="absolute inset-0 bg-white/20 rounded-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}
                {icon}
                <span className="text-[10px] font-bold mt-1 leading-none">{label}</span>
                <span className="text-[8px] absolute top-1 right-1">R{roundNumber}-{adjustedIndex}</span>
            </div>
        );
    };

    const renderBoard = () => {
        // Chỉ hiển thị các ô thuộc vòng hiện tại
        const startIdx = (round - 1) * NUM_CELLS_PER_ROUND;
        const endIdx = round * NUM_CELLS_PER_ROUND;

        // Lấy các ô chỉ trong vòng hiện tại
        const cellsInRound = BOARD_STRUCTURE.slice(startIdx, endIdx);

        return (
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 p-4 border-2 border-slate-300 rounded-xl bg-slate-200 shadow-inner">
                {cellsInRound.map((_, index) => {
                    const cellGlobalIndex = startIdx + index;
                    return renderCell(cellGlobalIndex);
                })}
            </div>
        );
    };

    const renderLegend = () => (
        <Card className="p-4 bg-white border border-slate-200">
            <h4 className="font-bold text-lg text-slate-700 mb-3 flex items-center gap-2"><Lightbulb size={20} />Chú thích Bảng Chơi</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-green-500"></div> Bắt đầu/Vòng mới</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-blue-500"></div> Ô Thử thách (Chọn giải pháp)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-yellow-500"></div> Ô May mắn (+{POINTS.LUCKY_CELL} đ)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-red-500"></div> Ô BƯỚC TIẾN (Lùi/Tiến ngẫu nhiên, +/- điểm)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-purple-500"></div> Về đích (+{POINTS.FINISH_BONUS} đ)</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-white border border-slate-400"></div> Ô Trung lập (Không có sự kiện)</div>
            </div>
        </Card>
    );

    // XÁC ĐỊNH ĐÁP ÁN ĐÚNG (Luôn tìm SUCCESS)
    const getCorrectPolicy = (challenge: Challenge): PolicyDetail | null => {
        return challenge.policies.find(p => p.outcome === "SUCCESS") || null;
    };


    // --- TRANG HIỂN THỊ ---
    return (
        <div className="mt-16 min-h-screen bg-[#fdfbf7] font-sans pb-20">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* --- INTRO SCREEN --- */}
                {gameState === "intro" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6"
                    >
                        <h1 className="text-6xl font-black text-slate-800">
                            Điều Hòa <span className="text-blue-600">Lợi Ích</span>
                        </h1>
                        <h2 className="text-2xl font-semibold text-slate-700">
                            Áp dụng Kinh tế Chính trị vào thực tiễn Việt Nam
                        </h2>
                        <Card className="p-6 max-w-lg bg-white border-2 border-blue-200 shadow-xl text-left">
                            <h3 className="font-bold text-xl mb-4 text-blue-700 flex items-center gap-2">
                                <Gavel size={24} /> Luật Chơi & Chiến thuật MỚI:
                            </h3>
                            <ul className="text-slate-700 space-y-2">
                                <li><span className="font-bold">Mục tiêu:</span> Hoàn thành 3 Vòng chơi (30 ô) với số điểm cao nhất.</li>
                                <li><span className="font-bold">Quyết định Bước đi:</span> Bạn <span className="text-red-600 font-bold">chọn số bước đi từ 1 đến {MAX_STEPS}</span>. Hãy chọn chiến thuật để tới ô Thử thách và tránh/chọn ô BƯỚC TIẾN ngẫu nhiên!</li>
                                <li><span className="font-bold">Ô Thử thách:</span> Trả lời bằng cách <span className="font-bold text-blue-600">chọn 1 trong 3 giải pháp</span>. Chọn đúng giải pháp <strong>THÀNH CÔNG/HIỆU QUẢ NHẤT</strong> sẽ được điểm cao.</li>
                                <li><span className="font-bold">Ô BƯỚC TIẾN:</span> Tự động lăn xúc xắc để TIẾN hoặc LÙI ngẫu nhiên (1-6 bước) và +/- điểm.</li>
                            </ul>
                        </Card>
                        <Button
                            size="lg"
                            onClick={startGame}
                            className="text-lg px-12 py-6 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl"
                        >
                            Bắt đầu trò chơi
                        </Button>
                        <Link href="/" passHref>
                            <Button variant="link" className="text-blue-600">Quay lại game 'Thử Thách Mua Nhà'</Button>
                        </Link>
                    </motion.div>
                )}

                {/* --- MAIN GAME UI --- */}
                {gameState !== "intro" && gameState !== "end" && (
                    <div className="space-y-6">
                        {/* THÔNG TIN CHUNG */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sticky top-0 bg-[#fdfbf7] py-4 z-10 border-b border-slate-200">
                            <Card className="p-3 bg-blue-50 border-blue-200 text-center">
                                <div className="text-sm text-blue-700 font-bold">Điểm số</div>
                                <div className="text-3xl font-black text-blue-800">{score}</div>
                            </Card>
                            <Card className="p-3 bg-green-50 border-green-200 text-center">
                                <div className="text-sm text-green-700 font-bold">Vòng</div>
                                <div className="text-3xl font-black text-green-800">{round} / {NUM_ROUNDS}</div>
                            </Card>
                            <Card className="p-3 bg-yellow-50 border-yellow-200 text-center">
                                <div className="text-sm text-yellow-700 font-bold">Vị trí</div>
                                <div className="text-3xl font-black text-yellow-800">{currentPosition} / {NUM_CELLS_PER_ROUND * NUM_ROUNDS}</div>
                            </Card>
                            <Card className="p-3 bg-slate-50 border-slate-200 text-center">
                                <div className="text-sm text-slate-700 font-bold">Thử thách đã trả lời</div>
                                <div className="text-3xl font-black text-slate-800">{answeredChallenges.length} / {CHALLENGES.length}</div>
                            </Card>
                        </div>

                        {/* Chú thích */}
                        {renderLegend()}

                        {/* Bảng Game (Chỉ hiện Vòng hiện tại) */}
                        <h3 className="text-2xl font-bold text-slate-800 mt-6">Bảng chơi Vòng {round}</h3>
                        <div className="mb-8">{renderBoard()}</div>

                        {/* Thanh Hành động */}
                        <Card className="p-6 shadow-xl bg-white border-2 border-slate-200 bottom-0">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm font-medium text-slate-600 italic">
                                    <span className="font-bold text-slate-800">Hành động gần nhất:</span> {lastAction || "Chọn số bước đi và bấm 'Di chuyển' để bắt đầu!"}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-xl text-slate-800">
                                        Số bước đi: {stepsToMove}
                                    </span>
                                    <Dice5 size={24} className="text-slate-600" />
                                </div>
                            </div>

                            {/* Điều chỉnh số bước đi */}
                            <div className="mb-4 flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setStepsToMove(prev => Math.max(1, prev - 1))}
                                    disabled={stepsToMove <= 1 || (getCellType(currentPosition) === CELL_TYPES.CHALLENGE && challengeStatus === "pending")}
                                ><Minus size={18} /></Button>
                                <Slider
                                    defaultValue={[1]}
                                    max={MAX_STEPS} // Max là 3
                                    min={1} // Min là 1
                                    step={1}
                                    value={[stepsToMove]}
                                    onValueChange={(val) => setStepsToMove(val[0])}
                                    disabled={getCellType(currentPosition) === CELL_TYPES.CHALLENGE && challengeStatus === "pending"}
                                    className="w-full"
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => setStepsToMove(prev => Math.min(MAX_STEPS, prev + 1))}
                                    disabled={stepsToMove >= MAX_STEPS || (getCellType(currentPosition) === CELL_TYPES.CHALLENGE && challengeStatus === "pending")}
                                ><Plus size={18} /></Button>
                            </div>

                            <Button
                                onClick={movePlayer}
                                disabled={gameState !== "playing" || (getCellType(currentPosition) === CELL_TYPES.CHALLENGE && challengeStatus === "pending")}
                                className="w-full bg-slate-900 hover:bg-black py-6 text-lg shadow-lg group"
                            >
                                <ArrowRight className="mr-2" />
                                {getCellType(currentPosition) === CELL_TYPES.CHALLENGE && challengeStatus === "pending" ? "Đang chờ Thử thách..." : `DI CHUYỂN ${stepsToMove} BƯỚC`}
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Card>
                    </div>
                )}

                {/* --- CHALLENGE MODAL --- */}
                <AnimatePresence>
                    {gameState === "challenge" && currentChallenge && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        >
                            <Card className="max-w-3xl w-full p-8 rounded-2xl shadow-2xl border-4 border-blue-400">
                                <h3 className="text-2xl font-bold text-center mt-2 mb-4 text-blue-800 flex items-center justify-center gap-2">
                                    <Gavel size={28} /> THỬ THÁCH KINH TẾ
                                </h3>

                                {/* HIỂN THỊ CÂU HỎI */}
                                <div className="text-3xl text-slate-500 font-bold mb-2">Sự kiện: {currentChallenge.event}</div>
                                <p className="text-xl font-semibold mb-6 text-slate-800 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    {/* Loại bỏ các dấu ** thừa trong câu hỏi gốc */}
                                    {currentChallenge.question.replace(/\*\*/g, '')}
                                </p>

                                {/* LỰA CHỌN PHƯƠNG PHÁP */}
                                {challengeStatus === "pending" ? (
                                    <div className="space-y-3">
                                        {currentChallenge.policies.map((policy, idx) => (
                                            <Button
                                                key={idx}
                                                onClick={() => handlePolicyChoice(policy)}
                                                // Đã thêm h-auto, px-4, text-left và whitespace-normal để tránh tràn chữ
                                                className="w-full h-auto justify-start py-4 px-4 text-left bg-slate-100 text-slate-800 hover:bg-blue-100 border border-slate-300"
                                                variant="outline"
                                            >
                                                <div className="flex items-start">
                                                    <span className={`font-black mr-3 mt-1 flex-shrink-0 px-3 py-1 rounded-full ${policy.type === 'P1' ? 'bg-red-200 text-red-800' : policy.type === 'P2' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{policy.type}</span>
                                                    <span className="text-sm font-medium text-left whitespace-normal break-words flex-grow">
                                                        {policy.description}
                                                    </span>
                                                </div>
                                            </Button>
                                        ))}
                                        {/* Nút BỎ QUA */}
                                        <Button
                                            onClick={handleSkipChallenge}
                                            className="w-full justify-center py-6 text-lg bg-gray-500 text-white hover:bg-gray-600 border border-gray-700 mt-4"
                                            variant="default"
                                        >
                                            <SkipForward className="mr-2" size={20} /> BỎ QUA Thử thách (Vẫn được điểm an ủi)
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="mt-4 space-y-4">

                                        {/* PHẦN GIẢI THÍCH LỰA CHỌN CỦA NGƯỜI CHƠI (NẾU SAI) */}
                                        {chosenPolicy && chosenPolicy.outcome !== 'SUCCESS' && (
                                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                                                <p className="font-bold text-red-800 mb-2 flex items-center gap-2">
                                                    <AlertTriangle size={20} /> Phân tích lựa chọn của bạn:
                                                    <span className="font-black ml-2 px-3 py-1 rounded-full text-white bg-red-600">
                                                        {chosenPolicy.type}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-red-700 italic">
                                                    <span className="font-bold">Giải thích:</span> {chosenPolicy.outcomeText}
                                                </p>
                                            </div>
                                        )}

                                        {/* PHẦN GIẢI THÍCH ĐÁP ÁN ĐÚNG */}
                                        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                                            <p className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                                <CheckCircle size={20} /> Giải pháp THÀNH CÔNG (Đáp án):
                                                <span className="font-black ml-2 px-3 py-1 rounded-full text-white bg-green-600">
                                                    {getCorrectPolicy(currentChallenge)?.type}
                                                </span>
                                            </p>
                                            <p className="text-sm text-green-700 italic">
                                                <span className="font-bold">Giải thích:</span> {getCorrectPolicy(currentChallenge)?.outcomeText}
                                            </p>
                                        </div>

                                        <Button
                                            onClick={() => {
                                                // GIỮ NGUYÊN LOGIC ĐÃ SỬA: CHỈ CHUYỂN GAMESTATE SANG PLAYING (ĐỂ ĐÓNG MODAL)
                                                setGameState("playing");
                                            }}
                                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            Tiếp tục Vòng chơi
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- END GAME SCREEN --- */}
                {gameState === "end" && (
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white p-10 rounded-3xl shadow-2xl text-center border-4 border-blue-200 max-w-2xl mx-auto mt-10"
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="p-6 bg-blue-100 rounded-full">
                                <Briefcase size={64} className="text-blue-600" />
                            </div>
                        </div>
                        <h2 className={`text-4xl font-black mb-4 text-blue-700`}>
                            KẾT THÚC TRÒ CHƠI
                        </h2>
                        <p className="text-xl text-slate-600 mb-8">
                            Bạn đã hoàn thành 3 Vòng chơi về Điều Hòa Lợi Ích!
                        </p>
                        <Card className="p-6 bg-blue-50 border-blue-200 mb-8">
                            <div className="text-sm text-blue-700 font-bold mb-2">Điểm Chung Cuộc:</div>
                            <div className="text-5xl font-black text-blue-800">{score}</div>
                        </Card>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={startGame} size="lg">
                                <RotateCcw className="mr-2" /> Chơi Lại
                            </Button>
                            <Link href="/" passHref>
                                <Button variant="outline" size="lg">
                                    Về Trang Chủ
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PolicyGamePage;