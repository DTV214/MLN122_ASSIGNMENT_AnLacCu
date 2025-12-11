"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { year: "2020", wage: 8, house: 35 },
  { year: "2021", wage: 9, house: 42 },
  { year: "2022", wage: 10, house: 50 },
  { year: "2023", wage: 11, house: 58 },
  { year: "2024", wage: 12, house: 69 },
  { year: "2025", wage: 13, house: 75 },
];

export function IncomeChart() {
  return (
    <Card className="bg-white/90 backdrop-blur shadow-xl border-primary/20">
      <CardHeader>
        <CardTitle className="font-serif text-primary text-xl">
          Sự lệch pha đáng báo động
        </CardTitle>
        <CardDescription>
          So sánh tốc độ tăng Giá nhà (Triệu/m2) và Thu nhập (Triệu/tháng) qua
          các năm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHouse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="house"
                name="Giá nhà (Tr/m2)"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorHouse)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="wage"
                name="Thu nhập (Tr/tháng)"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorWage)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-red-600">
              Giá nhà tăng 28% trong năm qua <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Khoảng cách giàu nghèo ngày càng nới rộng
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
