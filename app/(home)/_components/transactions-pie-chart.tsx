"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/type";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
  empty: {
    label: "Sem dados",
    color: "#808080",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investimentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  investimentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const total = depositsTotal + investimentsTotal + expensesTotal;

  const chartData =
    total === 0
      ? [{ type: "empty", amount: 1, fill: chartConfig.empty.color }]
      : [
          {
            type: TransactionType.DEPOSIT,
            amount: depositsTotal,
            fill: chartConfig[TransactionType.DEPOSIT].color,
          },
          {
            type: TransactionType.EXPENSE,
            amount: expensesTotal,
            fill: chartConfig[TransactionType.EXPENSE].color,
          },
          {
            type: TransactionType.INVESTMENT,
            amount: investimentsTotal,
            fill: chartConfig[TransactionType.INVESTMENT].color,
          },
        ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT] || 0}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE] || 0}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT] || 0}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
