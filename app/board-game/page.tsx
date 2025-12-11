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
  Minus,
  Plus,
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

type TurnDetails = {
  income: number;
  safeProfit: number;
  riskProfit: number;
  interestCost: number;
  eventImpact: number;
  totalChange: number;
  explanation: string;
};

// --- DỮ LIỆU SỰ KIỆN ---
const EVENTS: GameEvent[] = [
  {
    id: 1,
    yearText: "Kinh tế Bình ổn",
    description: "Thị trường ổn định, lãi suất ngân hàng giữ mức trung bình.",
    type: "neutral",
  },
  {
    id: 2,
    yearText: "Sốt Đất Cục Bộ",
    description: "Giá đất tăng, đầu tư mạo hiểm sinh lời cao.",
    type: "market_up",
  },
  {
    id: 3,
    yearText: "Lạm Phát Tăng",
    description: "Chi phí sinh hoạt tăng, giá trị đầu tư giảm sút.",
    type: "market_down",
  },
  {
    id: 4,
    yearText: "Thăng Chức",
    description: "Thu nhập tăng nhờ năng lực làm việc tốt.",
    type: "neutral",
  },
  {
    id: 5,
    yearText: "Gói Tín Dụng Ưu Đãi",
    description: "Lãi suất vay giảm, thị trường BĐS ấm lên.",
    type: "policy",
  },
  {
    id: 6,
    yearText: "Thị Trường Đóng Băng",
    description: "Thanh khoản kém, đầu tư dễ bị lỗ.",
    type: "market_down",
  },
  {
    id: 7,
    yearText: "Chứng Khoán Bùng Nổ",
    description: "Dòng tiền đổ vào thị trường, cơ hội nhân vốn.",
    type: "market_up",
  },
  {
    id: 8,
    yearText: "Siết Chặt Tín Dụng",
    description: "Lãi suất vay tăng cao, khó tiếp cận vốn.",
    type: "market_down",
  },
];

export default function BoardGamePage() {
  // --- STATE ---
  const [age, setAge] = useState(22);
  const [savings, setSavings] = useState(100); // Khởi đầu 100tr cho dễ chơi
  const [housePrice, setHousePrice] = useState(1500);
  const [happiness, setHappiness] = useState(100);
  const [debt, setDebt] = useState(0);

  // Strategy State
  const [strategy, setStrategy] = useState<"safe" | "invest" | "borrow">(
    "safe"
  );
  const [borrowAmount, setBorrowAmount] = useState([100]);
  const [investAmount, setInvestAmount] = useState([50]); // Mới: Slider cho đầu tư

  const [gameState, setGameState] = useState<
    "intro" | "playing" | "won" | "lost"
  >("intro");
  const [history, setHistory] = useState<string[]>([]);

  // State mới: Lưu chi tiết công thức tính toán
  const [turnDetail, setTurnDetail] = useState<TurnDetails | null>(null);

  // --- LOGIC TÍNH TOÁN ---
  const handleNextTurn = () => {
    // 1. Check thua
    if (happiness <= 0 || age >= 60) {
      setGameState("lost");
      return;
    }

    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];

    // --- CÔNG THỨC TÍNH TOÁN CHI TIẾT ---

    // A. Thu nhập cơ bản (Lương - Chi tiêu)
    // Giả sử mỗi năm dư được 40% lương (Lương 15tr -> Dư ~72tr/năm)
    // Tăng nhẹ theo tuổi tác (kinh nghiệm)
    const baseIncome = Math.floor(72 * (1 + (age - 22) * 0.05));

    // B. Tính toán Lợi nhuận/Chi phí
    let safeProfit = 0; // Lãi từ phần tiền gửi ngân hàng
    let riskProfit = 0; // Lãi/Lỗ từ phần tiền đem đi đầu tư
    let interestCost = 0; // Lãi phải trả cho nợ
    const eventImpact = 0; // Tác động trực tiếp từ sự kiện (thưởng/phạt)
    let explanationText = "";

    // Lãi suất ngân hàng cơ bản: 6%
    const SAFE_RATE = 0.06;
    const BORROW_RATE = 0.12; // 12%

    if (strategy === "safe") {
      // Gửi toàn bộ tiết kiệm vào ngân hàng
      safeProfit = Math.floor(savings * SAFE_RATE);
      explanationText = `Gửi tiết kiệm toàn bộ ${savings.toLocaleString()}tr hưởng lãi 6%.`;
    } else if (strategy === "invest") {
      // Đầu tư một phần, phần còn lại gửi ngân hàng
      const actualInvest = Math.min(investAmount[0], savings);
      const remainingSafe = savings - actualInvest;

      safeProfit = Math.floor(remainingSafe * SAFE_RATE);

      // Tính lãi đầu tư dựa trên sự kiện
      let rate = 0;
      if (randomEvent.type === "market_up") rate = 0.3; // Lãi 30%
      else if (randomEvent.type === "market_down") rate = -0.2; // Lỗ 20%
      else rate = 0.1; // Lãi 10%

      riskProfit = Math.floor(actualInvest * rate);
      explanationText = `Đầu tư ${actualInvest.toLocaleString()}tr (Lợi suất ${
        rate * 100
      }%). Phần còn lại ${remainingSafe.toLocaleString()}tr gửi ngân hàng.`;
    } else if (strategy === "borrow") {
      // Vay thêm tiền để đầu tư tất tay (Vốn + Vay)
      const loan = borrowAmount[0];
      const totalCapital = savings + loan;
      setDebt((prev) => prev + loan);
      interestCost = Math.floor((debt + loan) * BORROW_RATE); // Trả lãi cho cả nợ cũ và mới

      let rate = 0;
      if (randomEvent.type === "market_up") rate = 0.4; // Đòn bẩy lãi cao: 40%
      else if (randomEvent.type === "market_down") rate = -0.25; // Lỗ nặng: 25%
      else rate = 0.05; // Lãi thấp (5%) không đủ trả lãi vay (12%)

      riskProfit = Math.floor(totalCapital * rate);
      explanationText = `Dùng đòn bẩy ${loan.toLocaleString()}tr. Tổng vốn ${totalCapital.toLocaleString()}tr đầu tư với lợi suất ${
        rate * 100
      }%. Trả lãi vay 12%.`;
    }

    // C. Tác động Hạnh phúc
    let happyChange = 0;
    if (riskProfit > 0) happyChange += 5;
    if (riskProfit < 0) happyChange -= 10;
    if (debt > savings * 2) happyChange -= 5; // Nợ nhiều stress

    // D. Thay đổi giá nhà
    let houseChangeRate = 0.08; // Tăng trung bình 8%
    if (randomEvent.type === "market_up") houseChangeRate = 0.15;
    if (randomEvent.type === "policy") houseChangeRate = -0.02; // Giảm nhẹ

    // --- CẬP NHẬT STATE ---
    const totalChange =
      baseIncome + safeProfit + riskProfit - interestCost + eventImpact;
    const newSavings = savings + totalChange;
    const newHousePrice = Math.floor(housePrice * (1 + houseChangeRate));
    const newHappiness = Math.min(100, Math.max(0, happiness + happyChange));

    setAge((prev) => prev + 1);
    setSavings(newSavings);
    setHousePrice(newHousePrice);
    setHappiness(newHappiness);

    // Lưu chi tiết để hiển thị bảng phân tích
    setTurnDetail({
      income: baseIncome,
      safeProfit,
      riskProfit,
      interestCost,
      eventImpact,
      totalChange,
      explanation: explanationText,
    });

    // Log lịch sử
    const logMsg = `${age + 1} tuổi: ${randomEvent.description}`;
    setHistory((prev) => [logMsg, ...prev].slice(0, 4));

    if (totalChange > 0)
      toast.success(`Tài sản tăng ${totalChange.toLocaleString()}tr`);
    else
      toast.error(`Tài sản giảm ${Math.abs(totalChange).toLocaleString()}tr`);
  };

  const handleBuyHouse = () => {
    const netWorth = savings - debt;
    if (netWorth >= housePrice * 0.3) {
      setGameState("won");
    } else {
      toast.warning(
        `Bạn cần tài sản ròng tối thiểu ${(
          housePrice * 0.3
        ).toLocaleString()}tr (30%) để mua!`
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
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-red-200">
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
              Hành Trình <span className="text-red-600">An Cư</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              Mục tiêu: Mua nhà trước tuổi 60. <br />
              Hãy cân nhắc kỹ giữa <strong>Tiết kiệm</strong>,{" "}
              <strong>Đầu tư</strong> và <strong>Vay nợ</strong>.
            </p>
            <Button
              size="lg"
              onClick={() => setGameState("playing")}
              className="text-lg px-12 py-6 rounded-full bg-red-600 hover:bg-red-700 shadow-xl"
            >
              Bắt đầu ngay
            </Button>
          </motion.div>
        )}

        {/* --- PLAYING SCREEN --- */}
        {gameState === "playing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cột Trái: Dashboard (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 border-2 border-slate-200 bg-white shadow-lg sticky top-24">
                <div className="text-center mb-6">
                  <Badge variant="outline" className="mb-2">
                    Năm {2025 + (age - 22)}
                  </Badge>
                  <div className="text-5xl font-black text-slate-800">
                    {age} <span className="text-lg text-slate-400">tuổi</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <span className="flex gap-2 text-green-700 font-bold">
                      <Wallet size={20} /> Tiền mặt
                    </span>
                    <span className="font-bold text-green-800">
                      {savings.toLocaleString()} Tr
                    </span>
                  </div>
                  {debt > 0 && (
                    <div className="flex justify-between p-3 bg-slate-100 rounded-lg border border-slate-200">
                      <span className="flex gap-2 text-slate-700 font-bold">
                        <AlertCircle size={20} /> Nợ
                      </span>
                      <span className="font-bold text-slate-800">
                        -{debt.toLocaleString()} Tr
                      </span>
                    </div>
                  )}
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
                  <div className="flex justify-between p-3 bg-pink-50 rounded-lg border border-pink-100">
                    <span className="flex gap-2 text-pink-700 font-bold">
                      <Heart size={20} /> Hạnh phúc
                    </span>
                    <span className="font-bold text-pink-800">{happiness}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Progress
                    value={((savings - debt) / housePrice) * 100}
                    className="h-2 bg-slate-200"
          
                  />
                  <p className="text-xs text-center mt-2 text-slate-500">
                    Tiến độ mua nhà:{" "}
                    {Math.floor(((savings - debt) / housePrice) * 100)}%
                  </p>
                </div>
              </Card>
            </div>

            {/* Cột Phải: Gameplay Area (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. KHU VỰC ĐIỀU KHIỂN CHIẾN LƯỢC */}
              <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase className="text-primary" /> Kế hoạch tài chính năm
                  nay?
                </h3>

                {/* Các nút chọn chiến lược */}
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
                    <span className="font-bold text-sm">Gửi Tiết Kiệm</span>
                    <span className="text-xs text-slate-500">
                      An toàn tuyệt đối
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
                    <span className="text-xs text-slate-500">
                      Rủi ro trung bình
                    </span>
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
                    <span className="text-xs text-slate-500">Rất rủi ro</span>
                  </button>
                </div>

                {/* SLIDER ĐIỀU CHỈNH SỐ TIỀN */}
                <AnimatePresence mode="wait">
                  {strategy === "invest" && (
                    <motion.div
                      key="invest-slider"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-blue-800 text-sm">
                          Số tiền trích đầu tư:
                        </span>
                        <span className="font-bold text-blue-800">
                          {investAmount} Triệu
                        </span>
                      </div>
                      <Slider
                        defaultValue={[50]}
                        max={savings} // Không thể đầu tư quá số tiền mình có
                        min={0}
                        step={10}
                        onValueChange={setInvestAmount}
                        className="py-4"
                      />
                      <p className="text-xs text-blue-600 italic">
                        Phần còn lại (
                        {Math.max(
                          0,
                          savings - Number(investAmount)
                        ).toLocaleString()}
                        tr) sẽ được gửi tiết kiệm an toàn (6%/năm).
                      </p>
                    </motion.div>
                  )}

                  {strategy === "borrow" && (
                    <motion.div
                      key="borrow-slider"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-orange-50 p-4 rounded-xl mb-6 border border-orange-100"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-orange-800 text-sm">
                          Số tiền muốn vay thêm:
                        </span>
                        <span className="font-bold text-orange-800">
                          {borrowAmount} Triệu
                        </span>
                      </div>
                      <Slider
                        defaultValue={[100]}
                        max={500}
                        min={50}
                        step={50}
                        onValueChange={setBorrowAmount}
                        className="py-4"
                      />
                      <p className="text-xs text-orange-600 italic">
                        Lãi suất vay 12%/năm cố định. Nếu đầu tư lỗ, bạn vẫn
                        phải trả lãi này!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nút hành động */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleNextTurn}
                    size="lg"
                    className="flex-1 bg-slate-900 hover:bg-black py-6 text-lg shadow-xl"
                  >
                    Thực hiện <ArrowRight className="ml-2" />
                  </Button>
                  <Button
                    onClick={handleBuyHouse}
                    disabled={savings - debt < housePrice * 0.3}
                    size="lg"
                    variant="outline"
                    className={`flex-1 py-6 text-lg border-2 ${
                      savings - debt >= housePrice * 0.3
                        ? "border-green-500 text-green-700 bg-green-50 animate-pulse"
                        : "border-slate-200 text-slate-400"
                    }`}
                  >
                    <Home className="mr-2" /> Mua Nhà
                  </Button>
                </div>
              </div>

              {/* 2. BẢNG PHÂN TÍCH TÀI CHÍNH (TURN ANALYSIS) - MỚI */}
              <AnimatePresence>
                {turnDetail && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 overflow-hidden"
                  >
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="font-bold text-slate-700 flex items-center gap-2">
                        <Calculator size={18} /> Báo cáo tài chính năm{" "}
                        {2025 + (age - 23)}
                      </h4>
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full ${
                          turnDetail.totalChange >= 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        Tổng kết: {turnDetail.totalChange > 0 ? "+" : ""}
                        {turnDetail.totalChange.toLocaleString()} Tr
                      </span>
                    </div>

                    <div className="p-5 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500 flex items-center gap-2">
                          <Plus size={14} /> Thu nhập từ lương (đã trừ sinh
                          hoạt)
                        </span>
                        <span className="font-medium text-slate-900">
                          +{turnDetail.income} Tr
                        </span>
                      </div>
                      {turnDetail.safeProfit > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 flex items-center gap-2">
                            <Plus size={14} /> Lãi tiết kiệm (6%)
                          </span>
                          <span className="font-medium text-green-600">
                            +{turnDetail.safeProfit} Tr
                          </span>
                        </div>
                      )}
                      {turnDetail.riskProfit !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 flex items-center gap-2">
                            {turnDetail.riskProfit > 0 ? (
                              <Plus size={14} />
                            ) : (
                              <Minus size={14} />
                            )}
                            Hiệu quả đầu tư
                          </span>
                          <span
                            className={`font-medium ${
                              turnDetail.riskProfit > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {turnDetail.riskProfit > 0 ? "+" : ""}
                            {turnDetail.riskProfit} Tr
                          </span>
                        </div>
                      )}
                      {turnDetail.interestCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 flex items-center gap-2">
                            <Minus size={14} /> Chi phí lãi vay (12%)
                          </span>
                          <span className="font-medium text-red-600">
                            -{turnDetail.interestCost} Tr
                          </span>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-dashed border-slate-200">
                        <p className="text-slate-600 italic text-xs">
                          <span className="font-bold">Giải trình:</span>{" "}
                          {turnDetail.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. Lịch sử ngắn gọn */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-400 uppercase text-xs tracking-wider">
                  Nhật ký sự kiện
                </h4>
                {history.slice(0, 2).map((log, index) => (
                  <div
                    key={index}
                    className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100"
                  >
                    {log}
                  </div>
                ))}
              </div>
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
              {gameState === "won" ? "CHÚC MỪNG!" : "GAME OVER"}
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              {gameState === "won"
                ? `Bạn đã mua được nhà ở tuổi ${age} với tài sản ròng ${(
                    savings - debt
                  ).toLocaleString()}tr.`
                : `Bạn dừng bước ở tuổi ${age}. Giá nhà đã bỏ xa thu nhập của bạn.`}
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
