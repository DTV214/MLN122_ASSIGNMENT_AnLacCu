"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Home,
  Heart,
  TrendingUp,
  Skull,
  Briefcase,
  PiggyBank,
  Banknote,
  ArrowRight,
  AlertCircle,
  Calculator,
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// --- TYPES ---
type GameEvent = {
  id: number;
  yearText: string;
  description: string;
  type: "market_up" | "market_down" | "neutral" | "policy";
};

type Scenario = {
  id: number;
  question: string;
  options: {
    text: string;
    outcomeText: string;
    moneyChange: number; // Triệu đồng
    happinessChange: number;
  }[];
};

type TurnDetails = {
  income: number;
  safeProfit: number;
  riskProfit: number;
  interestCost: number;
  scenarioImpact: number;
  totalChange: number;
  explanation: string;
  scenarioText?: string;
};

type PendingTurnData = {
  baseIncome: number;
  safeProfit: number;
  riskProfit: number;
  interestCost: number;
  explanationText: string;
  houseChangeRate: number;
  randomEvent: GameEvent;
  loanAmount: number;
};

// --- DỮ LIỆU SỰ KIỆN (EVENTS - MACRO) ---
// Mở rộng lên 15 sự kiện để tăng tính ngẫu nhiên
const EVENTS: GameEvent[] = [
  // Nhóm Bình ổn & Tốt
  { id: 1, yearText: "Kinh tế Vĩ mô Ổn định", description: "Lạm phát được kiểm soát, thị trường phát triển bền vững.", type: "neutral" },
  { id: 2, yearText: "Tăng Trưởng GDP Vượt Bậc", description: "Thu nhập bình quân đầu người tăng, cơ hội việc làm rộng mở.", type: "market_up" },
  { id: 3, yearText: "Vốn FDI Đổ Bộ", description: "Các tập đoàn nước ngoài đầu tư mạnh, BĐS khu công nghiệp hưởng lợi.", type: "market_up" },
  { id: 4, yearText: "Hạ Tầng Hoàn Thiện", description: "Tuyến Metro và Vành đai thông xe, giá nhà đất khu vực ven tăng mạnh.", type: "market_up" },
  
  // Nhóm Rủi ro & Xấu
  { id: 5, yearText: "Lạm Phát Phi Mã", description: "Giá xăng tăng, bát phở tăng giá. Tiền mặt mất giá trị nhanh chóng.", type: "market_down" },
  { id: 6, yearText: "Bong Bóng Trái Phiếu", description: "Nhiều doanh nghiệp chậm trả nợ, niềm tin thị trường sụp đổ.", type: "market_down" },
  { id: 7, yearText: "Dịch Bệnh Bùng Phát", description: "Giãn cách xã hội, hoạt động kinh doanh đình trệ.", type: "market_down" },
  { id: 8, yearText: "Chiến Tranh Thương Mại", description: "Chuỗi cung ứng đứt gãy, nguyên vật liệu xây dựng tăng giá.", type: "market_down" },
  { id: 9, yearText: "Siết Chặt Tín Dụng", description: "Ngân hàng hết 'room' tín dụng, lãi suất vay mua nhà tăng vọt.", type: "market_down" },
  
  // Nhóm Chính sách (Policy) - Giáo dục MLN122
  { id: 10, yearText: "Gói 120.000 Tỷ", description: "Nhà nước tung gói tín dụng ưu đãi cho NOXH, tháo gỡ khó khăn BĐS.", type: "policy" },
  { id: 11, yearText: "Luật Đất Đai (Sửa đổi)", description: "Bỏ khung giá đất, đền bù sát giá thị trường. Giá nhà thiết lập mặt bằng mới.", type: "policy" },
  { id: 12, yearText: "Đánh Thuế BĐS Thứ 2", description: "Dự thảo đánh thuế người nhiều nhà đất. Đầu cơ bị hạn chế.", type: "policy" },
  { id: 13, yearText: "Cải Cách Tiền Lương", description: "Lương cơ sở tăng, sức mua của người dân được cải thiện.", type: "neutral" },
  { id: 14, yearText: "Chống Tham Nhũng", description: "Làm trong sạch bộ máy, môi trường kinh doanh minh bạch hơn.", type: "neutral" },
  { id: 15, yearText: "Sốt Đất Ảo", description: "Cò đất thổi giá vùng ven, giá tăng nóng nhưng thanh khoản kém.", type: "market_up" }, // Cẩn thận bẫy
];

// --- DỮ LIỆU TÌNH HUỐNG (SCENARIOS - MICRO) ---
// Mở rộng lên 15 tình huống đời thường
const SCENARIOS: Scenario[] = [
  // Nhóm 1: Sự nghiệp & Học tập
  {
    id: 1,
    question: "Sếp đề nghị bạn đi công tác vùng sâu vùng xa 1 năm để thăng chức. Đi hay ở?",
    options: [
      { text: "Đi ngay! (Cày tiền)", outcomeText: "Vất vả, xa gia đình nhưng được thưởng lớn và tăng lương.", moneyChange: 80, happinessChange: -15 },
      { text: "Ở lại, cần work-life balance.", outcomeText: "Bạn sống vui vẻ, nhàn hạ nhưng bỏ lỡ cơ hội tăng thu nhập.", moneyChange: 0, happinessChange: 10 },
    ]
  },
  {
    id: 2,
    question: "Có khóa học 'Làm chủ tài chính & BĐS' giá 30 triệu.",
    options: [
      { text: "Đi học nâng trình (-30tr)", outcomeText: "Kiến thức giúp bạn tránh được một cú lừa ngoạn mục sau này.", moneyChange: -30, happinessChange: 5 }, 
      { text: "Tự học trên Youtube", outcomeText: "Tiết kiệm tiền, nhưng kiến thức chắp vá, dễ bị 'lùa gà'.", moneyChange: 0, happinessChange: -2 },
    ]
  },

  // Nhóm 2: Đầu tư & Rủi ro
  {
    id: 3,
    question: "Thị trường tiền ảo (Crypto) đang 'uptrend', ai cũng khoe lãi. Vào không?",
    options: [
      { text: "All-in bắt đáy! (-50tr)", outcomeText: "Thị trường sập! Bạn bị 'chia đôi tài khoản'. Bài học nhớ đời.", moneyChange: -50, happinessChange: -20 },
      { text: "Thôi, tôi sợ ảo lắm.", outcomeText: "Thị trường sập. Bạn thở phào nhẹ nhõm vì bảo toàn vốn.", moneyChange: 0, happinessChange: 5 },
    ]
  },
  {
    id: 4,
    question: "Bạn thân rủ hùn vốn mở quán Cafe 'Chill'.",
    options: [
      { text: "Máu kinh doanh! (-50tr)", outcomeText: "Quán đông khách! Bạn được chia lợi nhuận hàng tháng.", moneyChange: 100, happinessChange: 10 },
      { text: "Rủi ro lắm, từ chối.", outcomeText: "Bạn giữ tiền an toàn. 6 tháng sau nghe tin quán đóng cửa.", moneyChange: 0, happinessChange: 5 },
    ]
  },
  {
    id: 5,
    question: "Cơn sốt 'Lan Đột Biến'. Người ta bảo mua đi bán lại lời gấp 5.",
    options: [
      { text: "Thử vận may (-20tr)", outcomeText: "Đó là cú lừa thế kỷ! Cây lan chết, tiền cũng mất.", moneyChange: -20, happinessChange: -15 },
      { text: "Không tin những thứ vô lý", outcomeText: "Bạn tỉnh táo trước cám dỗ làm giàu nhanh.", moneyChange: 0, happinessChange: 2 },
    ]
  },

  // Nhóm 3: Đời sống & Tiêu dùng (Flexing)
  {
    id: 6,
    question: "Ra mắt iPhone 16 Pro Max. Bạn bè ai cũng có, bạn thì sao?",
    options: [
      { text: "Mua trả góp! (-35tr)", outcomeText: "Oai với bạn bè, nhưng còng lưng trả nợ thẻ tín dụng.", moneyChange: -35, happinessChange: 15 },
      { text: "Dùng điện thoại cũ", outcomeText: "Bị chê là 'tối cổ', nhưng ví tiền được bảo toàn.", moneyChange: 0, happinessChange: -5 },
    ]
  },
  {
    id: 7,
    question: "Người yêu muốn tổ chức đám cưới linh đình 'như trong phim'.",
    options: [
      { text: "Chiều ý người yêu (-150tr)", outcomeText: "Đám cưới thế kỷ, hạnh phúc thăng hoa nhưng 'âm' nặng vào tiền tiết kiệm.", moneyChange: -150, happinessChange: 30 },
      { text: "Thuyết phục làm đơn giản", outcomeText: "Tiết kiệm được khoản lớn để mua nhà, nhưng bị 'nói mát' vài tháng.", moneyChange: -30, happinessChange: -5 },
    ]
  },
  {
    id: 8,
    question: "Áp lực công việc quá lớn, bạn bị Burnout (Kiệt sức).",
    options: [
      { text: "Đi du lịch chữa lành (-20tr)", outcomeText: "Chuyến đi giúp bạn hồi phục năng lượng để tiếp tục cày cuốc.", moneyChange: -20, happinessChange: 25 },
      { text: "Cố chịu đựng", outcomeText: "Bạn tiết kiệm được tiền nhưng phải đi viện vì stress.", moneyChange: -10, happinessChange: -20 },
    ]
  },
  {
    id: 9,
    question: "Xe máy cũ hỏng liên tục. Mua xe tay ga xịn hay xe số bình thường?",
    options: [
      { text: "Xe tay ga xịn (-60tr)", outcomeText: "Đi êm, dáng đẹp, dễ tán tỉnh người yêu hơn.", moneyChange: -60, happinessChange: 10 },
      { text: "Xe số bền bỉ (-20tr)", outcomeText: "Xe nồi đồng cối đá, tiết kiệm xăng và tiền.", moneyChange: -20, happinessChange: 0 },
    ]
  },

  // Nhóm 4: Gia đình & Xã hội
  {
    id: 10,
    question: "Bố mẹ ở quê muốn sửa lại cái mái nhà bị dột.",
    options: [
      { text: "Gửi tiền biếu bố mẹ (-50tr)", outcomeText: "Bố mẹ vui vẻ, gia đình êm ấm. Chữ hiếu làm đầu.", moneyChange: -50, happinessChange: 20 },
      { text: "Than nghèo kể khổ", outcomeText: "Bố mẹ tự xoay sở, nhưng không khí gia đình trầm lắng.", moneyChange: 0, happinessChange: -15 },
    ]
  },
  {
    id: 11,
    question: "Bạn thân mượn 20 triệu 'nóng' để trả nợ, hứa tuần sau trả.",
    options: [
      { text: "Cho mượn, bạn bè mà (-20tr)", outcomeText: "Mất cả tiền lẫn bạn. Nó đã 'bùng' và chặn số bạn.", moneyChange: -20, happinessChange: -15 },
      { text: "Từ chối khéo", outcomeText: "Bạn giữ được tiền, nhưng tình bạn rạn nứt.", moneyChange: 0, happinessChange: -5 },
    ]
  },
  {
    id: 12,
    question: "Họp lớp cũ. Mọi người bàn tán về việc mua nhà, mua xe.",
    options: [
      { text: "Nổ (Flex) cho oai (-5tr)", outcomeText: "Bao cả lớp bữa nhậu để lấy le. Về nhà ăn mì tôm.", moneyChange: -5, happinessChange: 5 },
      { text: "Sống thật, đi xe ôm đến", outcomeText: "Bị vài người khinh thường, nhưng bạn không quan tâm.", moneyChange: 0, happinessChange: 0 },
    ]
  },

  // Nhóm 5: Sức khỏe & May mắn
  {
    id: 13,
    question: "Bạn bị đau răng dữ dội. Trám răng hay Bọc sứ thẩm mỹ?",
    options: [
      { text: "Bọc sứ toàn hàm (-40tr)", outcomeText: "Nụ cười tỏa nắng, tự tin giao tiếp, nhưng đau ví.", moneyChange: -40, happinessChange: 15 },
      { text: "Chỉ trám chỗ sâu (-2tr)", outcomeText: "Giải quyết cơn đau, thẩm mỹ bình thường.", moneyChange: -2, happinessChange: 0 },
    ]
  },
  {
    id: 14,
    question: "Mua vé số Vietlott cầu may?",
    options: [
      { text: "Thử vận may (-500k)", outcomeText: "Trúng giải khuyến khích! Đủ tiền ăn sáng.", moneyChange: 1, happinessChange: 2 }, // Hầu như không trúng lớn
      { text: "Không, tiền mồ hôi nước mắt", outcomeText: "Bạn giữ vững lập trường lao động chân chính.", moneyChange: 0, happinessChange: 0 },
    ]
  },
  {
    id: 15,
    question: "Nuôi thú cưng (Chó/Mèo) để bớt cô đơn?",
    options: [
      { text: "Nuôi một bé Corgi (-10tr)", outcomeText: "Tốn tiền mua và tiền ăn, nhưng có người đợi cửa khi về.", moneyChange: -15, happinessChange: 20 },
      { text: "Ở một mình cho khỏe", outcomeText: "Tiết kiệm tiền và thời gian dọn dẹp.", moneyChange: 0, happinessChange: -5 },
    ]
  },
];

export default function BoardGamePage() {
  // --- STATE ---
  const [age, setAge] = useState(22);
  const [savings, setSavings] = useState(100);
  const [housePrice, setHousePrice] = useState(1500);
  const [happiness, setHappiness] = useState(100);
  const [debt, setDebt] = useState(0);

  const [strategy, setStrategy] = useState<"safe" | "invest" | "borrow">(
    "safe"
  );
  const [borrowAmount, setBorrowAmount] = useState([100]);
  const [investAmount, setInvestAmount] = useState([50]);

  const [gameState, setGameState] = useState<
    "intro" | "playing" | "scenario" | "summary" | "won" | "lost"
  >("intro");
  const [history, setHistory] = useState<string[]>([]);

  // Lưu kết quả tạm tính trước khi chọn Scenario
  // Thay thế dòng cũ: const [pendingTurnData, setPendingTurnData] = useState<any>(null);
  const [pendingTurnData, setPendingTurnData] =
    useState<PendingTurnData | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [turnDetail, setTurnDetail] = useState<TurnDetails | null>(null);

  // --- LOGIC BƯỚC 1: TÍNH TOÁN TÀI CHÍNH ---
  const calculateFinancials = () => {
    // Check thua: Quá 40 tuổi (Khó hơn)
    if (age >= 40) {
      setGameState("lost");
      return;
    }

    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];

    // Thu nhập cơ bản: 15tr * 12 * 40% dư = 72tr. Tăng theo tuổi.
    const baseIncome = Math.floor(72 * (1 + (age - 22) * 0.08));

    let safeProfit = 0;
    let riskProfit = 0;
    let interestCost = 0;
    let explanationText = "";

    const SAFE_RATE = 0.05; // Giảm lãi tiết kiệm xuống 5% (Để khó thắng hơn nếu chỉ tiết kiệm)
    const BORROW_RATE = 0.12;

    // Logic chiến lược
    if (strategy === "safe") {
      safeProfit = Math.floor(savings * SAFE_RATE);
      explanationText = `Gửi tiết kiệm ${savings.toLocaleString()}tr (Lãi 5%).`;
    } else if (strategy === "invest") {
      const actualInvest = Math.min(investAmount[0], savings);
      const remainingSafe = savings - actualInvest;
      safeProfit = Math.floor(remainingSafe * SAFE_RATE);

      let rate = 0.1; // Mặc định lãi 10%
      if (randomEvent.type === "market_up") rate = 0.35; // Lãi đậm 35%
      else if (randomEvent.type === "market_down") rate = -0.15; // Lỗ 15%

      riskProfit = Math.floor(actualInvest * rate);
      explanationText = `Đầu tư ${actualInvest}tr (Lãi suất ${(
        rate * 100
      ).toFixed(0)}%).`;
    } else if (strategy === "borrow") {
      const loan = borrowAmount[0];
      const totalCapital = savings + loan;
      // Lưu ý: Chưa update state debt ngay, chờ chốt turn
      const currentDebt = debt + loan;
      interestCost = Math.floor(currentDebt * BORROW_RATE);

      let rate = 0.08;
      if (randomEvent.type === "market_up")
        rate = 0.5; // Đòn bẩy lãi cực to: 50%
      else if (randomEvent.type === "market_down") rate = -0.3; // Lỗ cực nặng: 30%

      riskProfit = Math.floor(totalCapital * rate);
      explanationText = `Vay thêm ${loan}tr. Tổng vốn ${totalCapital}tr (Lãi suất ${(
        rate * 100
      ).toFixed(0)}%).`;
    }

    // Giá nhà tăng (Khó hơn: Tăng trung bình 10-15% mỗi năm)
    let houseChangeRate = 0.1;
    if (randomEvent.type === "market_up") houseChangeRate = 0.18; // Sốt đất tăng 18%
    if (randomEvent.type === "market_down") houseChangeRate = 0.05; // Tăng chậm 5%

    // Lưu dữ liệu tạm để chuyển sang bước chọn Scenario
    setPendingTurnData({
      baseIncome,
      safeProfit,
      riskProfit,
      interestCost,
      explanationText,
      houseChangeRate,
      randomEvent,
      loanAmount: strategy === "borrow" ? borrowAmount[0] : 0,
    });

    // Chọn ngẫu nhiên 1 Scenario
    setCurrentScenario(SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]);
    setGameState("scenario");
  };

  // --- LOGIC BƯỚC 2: XỬ LÝ LỰA CHỌN SCENARIO ---
  const handleScenarioChoice = (optionIndex: number) => {
    if (!pendingTurnData || !currentScenario) return;

    const choice = currentScenario.options[optionIndex];

    // Tổng hợp tất cả thay đổi
    const totalChange =
      pendingTurnData.baseIncome +
      pendingTurnData.safeProfit +
      pendingTurnData.riskProfit -
      pendingTurnData.interestCost +
      choice.moneyChange;

    const newSavings = savings + totalChange;
    const newDebt = debt + pendingTurnData.loanAmount;
    const newHousePrice = Math.floor(
      housePrice * (1 + pendingTurnData.houseChangeRate)
    );
    const newHappiness = Math.min(
      100,
      Math.max(0, happiness + choice.happinessChange)
    );

    // Cập nhật State chính thức
    setAge((prev) => prev + 1);
    setSavings(newSavings);
    setDebt(newDebt);
    setHousePrice(newHousePrice);
    setHappiness(newHappiness);

    // Lưu bảng phân tích
    setTurnDetail({
      income: pendingTurnData.baseIncome,
      safeProfit: pendingTurnData.safeProfit,
      riskProfit: pendingTurnData.riskProfit,
      interestCost: pendingTurnData.interestCost,
      scenarioImpact: choice.moneyChange,
      totalChange,
      explanation: pendingTurnData.explanationText,
      scenarioText: `${currentScenario.question} -> Bạn chọn: ${choice.text}. ${choice.outcomeText}`,
    });

    // Log lịch sử
    const logMsg = `${age + 1} tuổi: ${choice.outcomeText} (${
      choice.moneyChange > 0 ? "+" : ""
    }${choice.moneyChange}tr)`;
    setHistory((prev) => [logMsg, ...prev].slice(0, 3));

    setGameState("summary");
  };

  const handleBuyHouse = () => {
    const netWorth = savings - debt;
    // Điều kiện thắng: Đủ 50% giá nhà
    if (netWorth >= housePrice * 0.5) {
      setGameState("won");
    } else {
      toast.warning(
        `Cần tối thiểu ${(housePrice * 0.5).toLocaleString()}tr (50%) để mua!`
      );
    }
  };

  const resetGame = () => {
    setAge(22);
    setSavings(100);
    setDebt(0);
    setHousePrice(1500);
    setHappiness(100);
    setStrategy("safe");
    setGameState("playing");
    setHistory([]);
    setTurnDetail(null);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-red-200 pb-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* --- INTRO SCREEN --- */}
        {gameState === "intro" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6"
          >
            <h1 className="text-6xl font-black text-slate-800">
              Thử Thách <span className="text-red-600">Mua Nhà</span>
            </h1>
            <Card className="p-6 max-w-lg bg-white border-2 border-primary/20 shadow-xl">
              <h3 className="font-bold text-xl mb-4 text-primary">
                MỤC TIÊU KHÓ NHẰN:
              </h3>
              <ul className="text-left space-y-3 text-slate-700">
                <li className="flex items-center gap-2">
                  <Home size={20} className="text-red-500" /> Mua nhà trước tuổi{" "}
                  <strong>40</strong>.
                </li>
                <li className="flex items-center gap-2">
                  <Wallet size={20} className="text-green-500" /> Có đủ{" "}
                  <strong>50%</strong> giá trị nhà.
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle size={20} className="text-orange-500" /> Giá nhà
                  tăng <strong>nhanh hơn</strong> lương.
                </li>
              </ul>
            </Card>
            <Button
              size="lg"
              onClick={() => setGameState("playing")}
              className="text-lg px-12 py-6 rounded-full bg-red-600 hover:bg-red-700 shadow-xl animate-bounce"
            >
              Chấp nhận thử thách
            </Button>
          </motion.div>
        )}

        {/* --- MAIN GAME UI --- */}
        {(gameState === "playing" ||
          gameState === "scenario" ||
          gameState === "summary") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cột Trái: Dashboard */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 border-2 border-slate-200 bg-white shadow-lg sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-6xl font-black text-slate-800">
                    {age}
                  </div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                    Tuổi / 40
                  </div>
                  <Progress
                    value={((age - 22) / (40 - 22)) * 100}
                    className="h-2 mt-2"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="flex gap-2 text-blue-700 font-bold">
                      <Calculator size={20} /> Tài sản ròng
                    </span>
                    <span className="font-bold text-blue-800">
                      {(savings - debt).toLocaleString()} Tr
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <span className="flex gap-2 text-red-700 font-bold">
                      <Home size={20} /> Giá nhà
                    </span>
                    <span className="font-bold text-red-800">
                      {housePrice.toLocaleString()} Tr
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1 font-bold">
                      <span>Tiến độ (Cần 50%)</span>
                      <span
                        className={
                          savings - debt >= housePrice * 0.5
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      >
                        {Math.floor(((savings - debt) / housePrice) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={((savings - debt) / (housePrice * 0.5)) * 100}
                      className="h-3 bg-slate-200"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Cột Phải: Action Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. KHU VỰC LỰA CHỌN CHIẾN LƯỢC (Chỉ hiện khi đang Playing) */}
              {gameState === "playing" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-md border border-slate-200"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Briefcase className="text-primary" /> 1. Chọn chiến lược
                    năm nay
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => setStrategy("safe")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        strategy === "safe"
                          ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                          : "border-slate-200 hover:border-green-300"
                      }`}
                    >
                      <PiggyBank
                        size={32}
                        className={
                          strategy === "safe"
                            ? "text-green-600"
                            : "text-slate-400"
                        }
                      />
                      <span className="font-bold text-sm">
                        Tiết Kiệm (Lãi 5%)
                      </span>
                    </button>
                    <button
                      onClick={() => setStrategy("invest")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        strategy === "invest"
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <TrendingUp
                        size={32}
                        className={
                          strategy === "invest"
                            ? "text-blue-600"
                            : "text-slate-400"
                        }
                      />
                      <span className="font-bold text-sm">Đầu Tư</span>
                    </button>
                    <button
                      onClick={() => setStrategy("borrow")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        strategy === "borrow"
                          ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                          : "border-slate-200 hover:border-orange-300"
                      }`}
                    >
                      <Banknote
                        size={32}
                        className={
                          strategy === "borrow"
                            ? "text-orange-600"
                            : "text-slate-400"
                        }
                      />
                      <span className="font-bold text-sm">Vay & Đầu tư</span>
                    </button>
                  </div>

                  {/* SLIDERS */}
                  <AnimatePresence mode="wait">
                    {strategy === "invest" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-blue-50 p-4 rounded-xl mb-6"
                      >
                        <div className="flex justify-between mb-2 text-blue-900 font-bold">
                          <span>Trích tiền đầu tư:</span>
                          <span>{investAmount} Triệu</span>
                        </div>
                        <Slider
                          defaultValue={[50]}
                          max={savings}
                          min={0}
                          step={10}
                          onValueChange={setInvestAmount}
                        />
                      </motion.div>
                    )}
                    {strategy === "borrow" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-orange-50 p-4 rounded-xl mb-6"
                      >
                        <div className="flex justify-between mb-2 text-orange-900 font-bold">
                          <span>Vay thêm ngân hàng:</span>
                          <span>{borrowAmount} Triệu</span>
                        </div>
                        <Slider
                          defaultValue={[100]}
                          max={500}
                          min={50}
                          step={50}
                          onValueChange={setBorrowAmount}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={calculateFinancials}
                    size="lg"
                    className="w-full bg-slate-900 hover:bg-black py-6 text-lg shadow-xl group"
                  >
                    Tiếp tục{" "}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {/* 2. SCENARIO MODAL (Hiện ra khi user bấm Tiếp tục) */}
              <AnimatePresence>
                {gameState === "scenario" && currentScenario && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-yellow-400 relative z-20"
                  >
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-black px-6 py-2 rounded-full uppercase tracking-wider">
                      Tình huống bất ngờ
                    </div>
                    <h3 className="text-2xl font-bold text-center mt-6 mb-8 text-slate-800">
                      {currentScenario.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentScenario.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleScenarioChoice(idx)}
                          className="p-6 rounded-xl border-2 border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="font-bold text-lg text-slate-800 group-hover:text-primary mb-1">
                            {opt.text}
                          </div>
                          <div className="text-sm text-slate-500">
                            {/* Hint nhẹ về tác động */}
                            {opt.happinessChange > 0
                              ? "🙂 Tinh thần tốt"
                              : opt.happinessChange < 0
                              ? "😓 Áp lực"
                              : ""}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. BẢNG TỔNG KẾT NĂM (SUMMARY) */}
              <AnimatePresence>
                {gameState === "summary" && turnDetail && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 overflow-hidden"
                  >
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="font-bold text-slate-700 flex items-center gap-2">
                        <Calculator size={18} /> Kết quả tài chính
                      </h4>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full ${
                          turnDetail.totalChange >= 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {turnDetail.totalChange > 0 ? "+" : ""}
                        {turnDetail.totalChange.toLocaleString()} Tr
                      </span>
                    </div>

                    <div className="p-5 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          Thu nhập (Lương + Thưởng)
                        </span>
                        <span className="font-medium">
                          +{turnDetail.income} Tr
                        </span>
                      </div>
                      {turnDetail.safeProfit > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Lãi tiết kiệm</span>
                          <span className="font-medium text-green-600">
                            +{turnDetail.safeProfit} Tr
                          </span>
                        </div>
                      )}
                      {turnDetail.riskProfit !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Đầu tư</span>
                          <span
                            className={`font-medium ${
                              turnDetail.riskProfit > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {turnDetail.riskProfit} Tr
                          </span>
                        </div>
                      )}
                      {turnDetail.interestCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Trả lãi vay</span>
                          <span className="font-medium text-red-600">
                            -{turnDetail.interestCost} Tr
                          </span>
                        </div>
                      )}
                      {turnDetail.scenarioImpact !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Sự kiện đời sống
                          </span>
                          <span
                            className={`font-medium ${
                              turnDetail.scenarioImpact > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {turnDetail.scenarioImpact} Tr
                          </span>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-dashed border-slate-200 bg-yellow-50/50 p-3 rounded-lg">
                        <p className="text-slate-700 italic text-xs mb-1">
                          <span className="font-bold">Chiến lược:</span>{" "}
                          {turnDetail.explanation}
                        </p>
                        <p className="text-slate-700 italic text-xs">
                          <span className="font-bold">Sự kiện:</span>{" "}
                          {turnDetail.scenarioText}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button
                          onClick={() => setGameState("playing")}
                          className="flex-1"
                          variant="outline"
                        >
                          Năm tiếp theo
                        </Button>
                        <Button
                          onClick={handleBuyHouse}
                          disabled={savings - debt < housePrice * 0.5}
                          className={`flex-1 ${
                            savings - debt >= housePrice * 0.5
                              ? "bg-green-600 hover:bg-green-700 text-white animate-pulse"
                              : ""
                          }`}
                        >
                          Mua Nhà Ngay
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* --- WIN/LOSE SCREEN --- */}
        {(gameState === "won" || gameState === "lost") && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-10 rounded-3xl shadow-2xl text-center border-4 border-slate-50 max-w-2xl mx-auto mt-10"
          >
            <div className="mb-6 flex justify-center">
              {gameState === "won" ? (
                <div className="p-6 bg-green-100 rounded-full">
                  <Home size={64} className="text-green-600" />
                </div>
              ) : (
                <div className="p-6 bg-red-100 rounded-full">
                  <Skull size={64} className="text-red-600" />
                </div>
              )}
            </div>
            <h2
              className={`text-4xl font-black mb-4 ${
                gameState === "won" ? "text-green-700" : "text-red-700"
              }`}
            >
              {gameState === "won" ? "CHÚC MỪNG!" : "GIẤC MƠ TAN VỠ"}
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              {gameState === "won"
                ? `Bạn đã mua được nhà ở tuổi ${age}! Tổng tài sản: ${(
                    savings - debt
                  ).toLocaleString()}tr. Sự kiên trì và chiến thuật hợp lý đã giúp bạn an cư.`
                : `Bạn đã bước sang tuổi ${age} mà vẫn chưa đủ tiền mua nhà (Giá nhà: ${housePrice.toLocaleString()}tr). Đừng buồn, đây là thực trạng chung của rất nhiều người trẻ hiện nay.`}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} size="lg">
                Chơi Lại
              </Button>
              <Link href="/">
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
}