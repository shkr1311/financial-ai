'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  stockInfo: {
    Ticker: string;
    MarketCap: number;
    Beta: number;
    TrailingEPS: number;
    TrailingPE: number;
  }[];
}

export default function MetricsChart({ stockInfo }: MetricsChartProps) {
  const labels = stockInfo.map((stock) => stock.Ticker);

  const data = {
    labels,
    datasets: [
      {
        label: 'Market Cap (₹)',
        data: stockInfo.map((stock) => stock.MarketCap),
        backgroundColor: 'rgba(0, 120, 255, 0.6)',
      },
      {
        label: 'Beta',
        data: stockInfo.map((stock) => stock.Beta),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Trailing EPS',
        data: stockInfo.map((stock) => stock.TrailingEPS),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Trailing PE',
        data: stockInfo.map((stock) => stock.TrailingPE),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Metrics Comparison',
      },
    },
  };

  return <Bar data={data} options={options} />;
}
