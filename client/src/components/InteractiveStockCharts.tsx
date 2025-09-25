import { useState, useEffect, useMemo, JSX } from 'react';

// Type definitions
interface StockInfo {
  Ticker: string;
  LongBusinessSummary: string;
  Sector: string;
  FullTimeEmployees: number;
  Website: string;
  MarketCap: number;
  Beta: number;
  TrailingEPS: number;
  TrailingPE: number;
}

interface StockData {
  [ticker: string]: {
    summary: {
      value: string;
      change: string;
      percent: string;
      positive: boolean;
    };
  };
}

interface ProcessedStockData {
  ticker: string;
  marketCap: number;
  marketCapRaw: number;
  employees: number;
  employeesRaw: number;
  trailingPE: number;
  trailingEPS: number;
  beta: number;
  sector: string;
  color: string;
  website: string;
  businessSummary: string;
}

interface SectorData {
  sector: string;
  count: number;
  totalMarketCap: number;
  totalEmployees: number;
  color: string;
}

interface ChartConfig {
  id: string;
  title: string;
  icon: any;
  description: string;
  component: JSX.Element;
}

interface InteractiveStockChartsProps {
  stockInfo: StockInfo[] | null;
  stockData: StockData | null;
}
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';
import {
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Target,
  Zap,
  Globe,
  Building,
} from 'lucide-react';

const InteractiveStockCharts: React.FC<InteractiveStockChartsProps> = ({
  stockInfo,
  stockData,
}) => {
  const [selectedChart, setSelectedChart] = useState<string>('marketCap');
  const [hoveredData, setHoveredData] = useState<any>(null);

  // Color palette for charts
  const colors = [
    '#00C9A7',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FCEA2B',
    '#FF9A85',
    '#D63031',
  ];

  // Process data for different chart types
  const chartData = useMemo(() => {
    if (!stockInfo || !Array.isArray(stockInfo))
      return { basic: [], sectors: [] };

    const processedData: ProcessedStockData[] = stockInfo.map(
      (stock, index) => ({
        ticker: stock.Ticker,
        marketCap: stock.MarketCap / 1e12, // Convert to trillions
        marketCapRaw: stock.MarketCap,
        employees: stock.FullTimeEmployees / 1000, // Convert to thousands
        employeesRaw: stock.FullTimeEmployees,
        trailingPE: stock.TrailingPE || 0,
        trailingEPS: stock.TrailingEPS || 0,
        beta: stock.Beta || 0,
        sector: stock.Sector,
        color: colors[index % colors.length],
        website: stock.Website,
        businessSummary: stock.LongBusinessSummary,
      })
    );

    const sectors: SectorData[] = processedData.reduce(
      (acc: SectorData[], stock) => {
        const existing = acc.find((item) => item.sector === stock.sector);
        if (existing) {
          existing.count += 1;
          existing.totalMarketCap += stock.marketCapRaw;
          existing.totalEmployees += stock.employeesRaw;
        } else {
          acc.push({
            sector: stock.sector,
            count: 1,
            totalMarketCap: stock.marketCapRaw,
            totalEmployees: stock.employeesRaw,
            color: stock.color,
          });
        }
        return acc;
      },
      []
    );

    return {
      basic: processedData,
      sectors: sectors,
    };
  }, [stockInfo]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-background border border-border rounded-lg p-3 shadow-lg'>
          <p className='font-medium text-foreground'>{data.ticker}</p>
          <div className='space-y-1 mt-2'>
            {payload.map((entry: any, index: number) => (
              <div key={index} className='flex items-center space-x-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: entry.color }}
                />
                <span className='text-sm text-muted-foreground'>
                  {entry.name}:{' '}
                  {typeof entry.value === 'number'
                    ? entry.value.toFixed(2)
                    : entry.value}
                </span>
              </div>
            ))}
          </div>
          {data.sector && (
            <p className='text-xs text-muted-foreground mt-2'>
              Sector: {data.sector}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Chart configurations
  const chartConfigs: ChartConfig[] = [
    {
      id: 'marketCap',
      title: 'Market Capitalization Comparison',
      icon: DollarSign,
      description: 'Compare market values across tickers',
      component: (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={chartData.basic}>
            <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
            <XAxis
              dataKey='ticker'
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey='marketCap'
              name='Market Cap (Trillions)'
              fill='#00C9A7'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'employees',
      title: 'Employee Count Comparison',
      icon: Users,
      description: 'Compare workforce sizes across companies',
      component: (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={chartData.basic}>
            <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
            <XAxis
              dataKey='ticker'
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey='employees'
              name='Employees (Thousands)'
              fill='#4ECDC4'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'valuation',
      title: 'Valuation Metrics',
      icon: TrendingUp,
      description: 'P/E Ratio vs EPS comparison',
      component: (
        <ResponsiveContainer width='100%' height={300}>
          <ScatterChart data={chartData.basic}>
            <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
            <XAxis
              type='number'
              dataKey='trailingEPS'
              name='EPS'
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              type='number'
              dataKey='trailingPE'
              name='P/E Ratio'
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name='Valuation' fill='#FF6B6B' />
          </ScatterChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'sectors',
      title: 'Sector Distribution',
      icon: Target,
      description: 'Portfolio composition by sectors',
      component: (
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={chartData.sectors}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ sector, count }: { sector: string; count: number }) =>
                `${sector} (${count})`
              }
              outerRadius={80}
              fill='#8884d8'
              dataKey='count'
            >
              {chartData.sectors?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'risk',
      title: 'Risk Analysis',
      icon: Zap,
      description: 'Beta values across tickers',
      component: (
        <ResponsiveContainer width='100%' height={300}>
          <RadarChart data={chartData.basic}>
            <PolarGrid stroke='hsl(var(--border))' />
            <PolarAngleAxis
              dataKey='ticker'
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[
                0,
                Math.max(...(chartData.basic?.map((d) => d.beta) || [2])),
              ]}
              tick={{ fill: '#E5E7EB', fontSize: 10 }}
              tickCount={4}
            />
            <Radar
              name='Beta'
              dataKey='beta'
              stroke='#45B7D1'
              fill='#45B7D1'
              fillOpacity={0.3}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      icon: Activity,
      description: 'EPS trends across tickers',
      component: (
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={chartData.basic}>
            <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' />
            <XAxis
              dataKey='ticker'
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fill: '#E5E7EB', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type='monotone'
              dataKey='trailingEPS'
              name='Trailing EPS'
              stroke='#96CEB4'
              strokeWidth={3}
              dot={{ fill: '#96CEB4', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#96CEB4', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
  ];

  const currentChart = chartConfigs.find(
    (chart: ChartConfig) => chart.id === selectedChart
  );

  if (!stockInfo || !Array.isArray(stockInfo) || stockInfo.length === 0) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <BarChart3 className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
          <p className='text-muted-foreground'>
            No stock data available for charting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Chart Navigation */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='font-display font-semibold text-2xl text-foreground'>
            Interactive Stock Analysis
          </h2>
          <p className='text-muted-foreground mt-1'>
            {currentChart?.description}
          </p>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
        {chartConfigs.map((chart) => (
          <Button
            key={chart.id}
            variant={selectedChart === chart.id ? 'default' : 'outline'}
            size='sm'
            onClick={() => setSelectedChart(chart.id)}
            className={`flex items-center space-x-2 ${
              selectedChart === chart.id
                ? 'bg-financial-teal hover:bg-financial-teal/90'
                : 'border-border hover:bg-muted'
            }`}
          >
            <chart.icon className='w-4 h-4' />
            <span className='hidden sm:inline'>
              {chart.title.split(' ')[0]}
            </span>
          </Button>
        ))}
      </div>

      {/* Main Chart Display */}
      <Card className='glass p-6'>
        <div className='flex items-center space-x-3 mb-6'>
          {currentChart && (
            <>
              <div className='w-10 h-10 rounded-lg bg-financial-teal/20 flex items-center justify-center'>
                <currentChart.icon className='w-5 h-5 text-financial-teal' />
              </div>
              <div>
                <h3 className='font-semibold text-lg text-foreground'>
                  {currentChart.title}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {currentChart.description}
                </p>
              </div>
            </>
          )}
        </div>

        <div className='min-h-[300px]'>{currentChart?.component}</div>
      </Card>

      {/* Stock Info Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {chartData.basic?.map((stock) => (
          <Card
            key={stock.ticker}
            className='glass p-4 hover:scale-105 transition-all duration-300'
          >
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center space-x-3'>
                <div
                  className='w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm'
                  style={{ backgroundColor: stock.color }}
                >
                  {stock.ticker.charAt(0)}
                </div>
                <div>
                  <h3 className='font-semibold text-foreground'>
                    {stock.ticker}
                  </h3>
                  <p className='text-xs text-muted-foreground'>
                    {stock.sector}
                  </p>
                </div>
              </div>
              <Globe className='w-4 h-4 text-muted-foreground' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Market Cap:
                </span>
                <span className='font-medium text-foreground'>
                  ${stock.marketCap.toFixed(2)}T
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  Employees:
                </span>
                <span className='font-medium text-foreground'>
                  {stock.employees.toFixed(0)}K
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  P/E Ratio:
                </span>
                <span className='font-medium text-foreground'>
                  {stock.trailingPE.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Beta:</span>
                <span
                  className={`font-medium ${
                    stock.beta > 1
                      ? 'text-financial-coral'
                      : 'text-financial-teal'
                  }`}
                >
                  {stock.beta.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Key Insights */}
      <Card className='glass p-6'>
        <h3 className='font-semibold text-lg text-foreground mb-4 flex items-center'>
          <Building className='w-5 h-5 text-financial-teal mr-2' />
          Key Insights
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='space-y-2'>
            <h4 className='font-medium text-foreground'>
              Largest by Market Cap
            </h4>
            <p className='text-sm text-muted-foreground'>
              {chartData.basic?.reduce((prev, current) =>
                prev.marketCapRaw > current.marketCapRaw ? prev : current
              )?.ticker || 'N/A'}
            </p>
          </div>
          <div className='space-y-2'>
            <h4 className='font-medium text-foreground'>Highest P/E Ratio</h4>
            <p className='text-sm text-muted-foreground'>
              {chartData.basic?.reduce((prev, current) =>
                prev.trailingPE > current.trailingPE ? prev : current
              )?.ticker || 'N/A'}
            </p>
          </div>
          <div className='space-y-2'>
            <h4 className='font-medium text-foreground'>Most Employees</h4>
            <p className='text-sm text-muted-foreground'>
              {chartData.basic?.reduce((prev, current) =>
                prev.employeesRaw > current.employeesRaw ? prev : current
              )?.ticker || 'N/A'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveStockCharts;
