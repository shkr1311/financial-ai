'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  stockInfo: {
    Ticker: string;
    MarketCap: number;
    Beta: number;
    TrailingEPS: number;
    TrailingPE: number;
  }[];
  metric: 'MarketCap' | 'Beta' | 'TrailingEPS' | 'TrailingPE';
}

const COLORS = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#F39C12', // Orange
  '#8E44AD', // Purple
  '#1ABC9C', // Teal
  '#E74C3C', // Crimson
];

export default function LineChart({ stockInfo, metric }: LineChartProps) {
  const labels = stockInfo.map((stock) => stock.Ticker);

  const datasets = stockInfo.map((stock, idx) => ({
    label: stock.Ticker,
    data: [stock[metric]], // Single point; you can expand with historical data if available
    borderColor: COLORS[idx % COLORS.length],
    backgroundColor: COLORS[idx % COLORS.length],
    fill: false,
    tension: 0.3,
    pointRadius: 5,
    pointHoverRadius: 7,
    borderWidth: 2,
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Stock ${metric} Comparison`,
        font: { size: 18 },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return <Line data={data} options={options} />;
}
