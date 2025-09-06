'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  DollarSign,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader,
  Check,
  Plus,
  X,
} from 'lucide-react';
import Link from 'next/link';
import useStockStore from '@/store/useStockStore';

export default function MarketDashboard() {
  const { fetchMultipleLiveStocks, stockData, error, loading } =
    useStockStore();
  // const {fetchMultipleLiveStocks, error, loading} = useStockStore()

  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [tickers, setTickers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddTicker = () => {
    if (input.trim() && !tickers.includes(input.toUpperCase())) {
      setTickers([...tickers, input.toUpperCase()]);
      setInput('');
    }
  };

  const handleRemoveTicker = (ticker: string) => {
    setTickers(tickers.filter((t) => t !== ticker));
  };

  const handleSubmit = () => {
    console.log('Selected Tickers:', tickers);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 1000); // show tick for 1s
  };

  const marketIndices = [
    {
      name: 'NIFTY 50',
      value: '22,147.90',
      change: '+267.45',
      percent: '+1.22%',
      positive: true,
    },
    {
      name: 'S&P 500',
      value: '4,567.18',
      change: '-36.82',
      percent: '-0.80%',
      positive: false,
    },
    {
      name: 'GOLD',
      value: '$2,034.50',
      change: '+10.25',
      percent: '+0.51%',
      positive: true,
    },
    {
      name: 'CRUDE OIL',
      value: '$73.25',
      change: '-0.82',
      percent: '-1.11%',
      positive: false,
    },
    {
      name: 'USD/INR',
      value: '83.12',
      change: '+0.24',
      percent: '+0.29%',
      positive: true,
    },
  ];

  const sectorData = [
    { name: 'Technology', change: 2.4, volume: 'High' },
    { name: 'Healthcare', change: 1.8, volume: 'Medium' },
    { name: 'Finance', change: -0.5, volume: 'High' },
    { name: 'Energy', change: -1.2, volume: 'Low' },
    { name: 'Consumer', change: 0.8, volume: 'Medium' },
    { name: 'Industrial', change: 1.1, volume: 'Low' },
    { name: 'Materials', change: -0.3, volume: 'Medium' },
    { name: 'Utilities', change: 0.4, volume: 'Low' },
  ];

  const topGainers = [
    {
      symbol: 'RELIANCE',
      price: '2,847.50',
      change: '+4.2%',
      sparkline: [100, 105, 102, 108, 104.2],
    },
    {
      symbol: 'TCS',
      price: '3,654.80',
      change: '+3.8%',
      sparkline: [100, 98, 103, 106, 103.8],
    },
    {
      symbol: 'INFY',
      price: '1,456.20',
      change: '+3.1%',
      sparkline: [100, 102, 99, 105, 103.1],
    },
    {
      symbol: 'HDFC',
      price: '1,678.90',
      change: '+2.9%',
      sparkline: [100, 101, 104, 102, 102.9],
    },
  ];

  const topLosers = [
    {
      symbol: 'BAJAJ',
      price: '8,234.10',
      change: '-2.8%',
      sparkline: [100, 98, 95, 97, 97.2],
    },
    {
      symbol: 'MARUTI',
      price: '10,567.30',
      change: '-2.1%',
      sparkline: [100, 99, 96, 98, 97.9],
    },
    {
      symbol: 'WIPRO',
      price: '432.80',
      change: '-1.9%',
      sparkline: [100, 97, 98, 95, 98.1],
    },
    {
      symbol: 'TITAN',
      price: '3,245.60',
      change: '-1.5%',
      sparkline: [100, 98, 99, 97, 98.5],
    },
  ];

  const benefits = [
    'Real-time market data with millisecond precision',
    'Interactive sector heatmaps for quick analysis',
    'Advanced charting with 50+ technical indicators',
    'Customizable watchlists and alerts',
    'Historical data going back 20+ years',
  ];

  const drawbacks = [
    'Requires stable internet connection for real-time data',
    'Advanced features may overwhelm new traders',
    'Data delays possible during high volatility periods',
    'Premium features require subscription',
  ];

  const Sparkline = ({
    data,
    positive,
  }: {
    data: number[];
    positive: boolean;
  }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 60;
        const y = 20 - ((value - min) / range) * 20;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width='60' height='20' className='inline-block'>
        <polyline
          points={points}
          fill='none'
          stroke={positive ? 'var(--financial-teal)' : 'var(--financial-coral)'}
          strokeWidth='1.5'
        />
      </svg>
    );
  };

  // const stockData = null
  useEffect(() => {
    const testLiveData = async () => {
      // await fetchLiveStockData('AAPL');
      await fetchMultipleLiveStocks([
        'AAPL',
        '^NSEI',
        'GLD',
        'CL=F',
        'USDINR=X',
      ]);
      console.log('Live Stock Data:', stockData);
    };

    testLiveData();
  }, []);

  useEffect(() => {
    console.log('stockData', stockData);
  }, [stockData]);

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='bg-financial-charcoal border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex items-center mb-4'>
            <Link href='/'>
              <Button variant='ghost' size='sm' className='mr-4'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className='flex items-center mb-4'>
            <div className='w-12 h-12 rounded-lg bg-financial-teal/20 flex items-center justify-center mr-4'>
              <BarChart3 className='w-6 h-6 text-financial-teal' />
            </div>
            <div>
              <h1 className='font-display font-bold text-3xl text-foreground'>
                Market Dashboard
              </h1>
              <p className='text-muted-foreground'>
                Real-time market data with interactive charts and comprehensive
                sector analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Market Indices */}
        <section>
          <h2 className='font-display font-semibold text-2xl text-foreground mb-6'>
            Live Market Indices
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {!stockData &&
              marketIndices.map((index) => (
                <Card
                  key={index.name}
                  className='glass p-4 hover:scale-105 transition-all duration-300'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-medium text-foreground text-sm'>
                      {index.name}
                    </h3>
                    {index.positive ? (
                      <TrendingUp className='w-4 h-4 text-financial-teal' />
                    ) : (
                      <TrendingDown className='w-4 h-4 text-financial-coral' />
                    )}
                  </div>
                  <div className='space-y-1'>
                    <p className='font-bold text-lg text-foreground'>
                      {index.value}
                    </p>
                    <div className='flex items-center space-x-2 text-sm'>
                      <span
                        className={
                          index.positive
                            ? 'text-financial-teal'
                            : 'text-financial-coral'
                        }
                      >
                        {index.change}
                      </span>
                      <span
                        className={
                          index.positive
                            ? 'text-financial-teal'
                            : 'text-financial-coral'
                        }
                      >
                        {index.percent}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            {stockData &&
              Object.entries(stockData).map(([ticker, data]) => {
                const summary = data.summary;
                if (loading)
                  return (
                    <div className='flex items-center justify-center h-screen'>
                      <Loader className='size-10 animate-spin' />
                    </div>
                  );
                return (
                  <Card
                    key={ticker}
                    className='glass p-4 hover:scale-105 transition-all duration-300'
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='font-medium text-foreground text-sm'>
                        {ticker}
                      </h3>
                      {summary.positive ? (
                        <TrendingUp className='w-4 h-4 text-financial-teal' />
                      ) : (
                        <TrendingDown className='w-4 h-4 text-financial-coral' />
                      )}
                    </div>
                    <div className='space-y-1'>
                      <p className='font-bold text-lg text-foreground'>
                        {summary.value}
                      </p>
                      <div className='flex items-center space-x-2 text-sm'>
                        <span
                          className={
                            summary.positive
                              ? 'text-financial-teal'
                              : 'text-financial-coral'
                          }
                        >
                          {summary.change}
                        </span>
                        <span
                          className={
                            summary.positive
                              ? 'text-financial-teal'
                              : 'text-financial-coral'
                          }
                        >
                          {summary.percent}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        </section>

        {/* Interactive Chart Section */}
        <section>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='font-display font-semibold text-2xl text-foreground'>
              Interactive Charts
            </h2>
            <div className='flex items-center space-x-2'>
              {['1D', '1W', '1M', '3M', '1Y'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={
                    selectedTimeframe === timeframe ? 'default' : 'outline'
                  }
                  size='sm'
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={
                    selectedTimeframe === timeframe
                      ? 'bg-financial-teal hover:bg-financial-teal/90'
                      : 'border-border hover:bg-muted'
                  }
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
          <Card className='glass p-6'>
            <div className='h-64 flex items-center justify-center bg-muted/20 rounded-lg'>
              <div className='text-center'>
                <Activity className='w-12 h-12 text-financial-teal mx-auto mb-4' />
                <p className='text-muted-foreground'>
                  Interactive Chart Component
                </p>
                <p className='text-sm text-muted-foreground mt-2'>
                  Real-time data visualization for {selectedTimeframe} timeframe
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Sector Heatmap */}
        <section>
          <h2 className='font-display font-semibold text-2xl text-foreground mb-6'>
            Sector Performance Heatmap
          </h2>
          <Card className='glass p-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {sectorData.map((sector) => (
                <div
                  key={sector.name}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    sector.change > 0
                      ? 'bg-financial-teal/20 hover:bg-financial-teal/30'
                      : 'bg-financial-coral/20 hover:bg-financial-coral/30'
                  }`}
                  onMouseEnter={() => setHoveredSector(sector.name)}
                  onMouseLeave={() => setHoveredSector(null)}
                >
                  <div className='text-center'>
                    <h3 className='font-medium text-foreground text-sm mb-2'>
                      {sector.name}
                    </h3>
                    <p
                      className={`font-bold text-lg ${
                        sector.change > 0
                          ? 'text-financial-teal'
                          : 'text-financial-coral'
                      }`}
                    >
                      {sector.change > 0 ? '+' : ''}
                      {sector.change}%
                    </p>
                    <p className='text-xs text-muted-foreground mt-1'>
                      Vol: {sector.volume}
                    </p>
                  </div>
                  {hoveredSector === sector.name && (
                    <div className='absolute z-10 bg-background border border-border rounded-lg p-2 mt-2 shadow-lg'>
                      <p className='text-sm text-foreground'>
                        Click to explore {sector.name} stocks
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Top Gainers and Losers */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h2 className='font-display font-semibold text-2xl text-foreground mb-6 flex items-center'>
              <TrendingUp className='w-6 h-6 text-financial-teal mr-2' />
              Top Gainers
            </h2>
            <Card className='glass p-6'>
              <div className='space-y-4'>
                {topGainers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className='flex items-center justify-between p-3 rounded-lg hover:bg-muted/20'
                  >
                    <div>
                      <h3 className='font-medium text-foreground'>
                        {stock.symbol}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        ₹{stock.price}
                      </p>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <Sparkline data={stock.sparkline} positive={true} />
                      <span className='font-medium text-financial-teal'>
                        {stock.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <h2 className='font-display font-semibold text-2xl text-foreground mb-6 flex items-center'>
              <TrendingDown className='w-6 h-6 text-financial-coral mr-2' />
              Top Losers
            </h2>
            <Card className='glass p-6'>
              <div className='space-y-4'>
                {topLosers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className='flex items-center justify-between p-3 rounded-lg hover:bg-muted/20'
                  >
                    <div>
                      <h3 className='font-medium text-foreground'>
                        {stock.symbol}
                      </h3>
                      <p className='text-sm text-muted-foreground'>
                        ₹{stock.price}
                      </p>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <Sparkline data={stock.sparkline} positive={false} />
                      <span className='font-medium text-financial-coral'>
                        {stock.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Benefits and Drawbacks */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <Card className='glass p-6'>
            <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
              <CheckCircle className='w-5 h-5 text-financial-teal mr-2' />
              Benefits
            </h3>
            <ul className='space-y-3'>
              {benefits.map((benefit, index) => (
                <li key={index} className='flex items-start'>
                  <Zap className='w-4 h-4 text-financial-teal mr-2 mt-0.5 flex-shrink-0' />
                  <span className='text-muted-foreground text-sm'>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className='glass p-6'>
            <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
              <XCircle className='w-5 h-5 text-financial-coral mr-2' />
              Considerations
            </h3>
            <ul className='space-y-3'>
              {drawbacks.map((drawback, index) => (
                <li key={index} className='flex items-start'>
                  <AlertTriangle className='w-4 h-4 text-financial-coral mr-2 mt-0.5 flex-shrink-0' />
                  <span className='text-muted-foreground text-sm'>
                    {drawback}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Related Examples */}
        <section>
          <h2 className='font-display font-semibold text-2xl text-foreground mb-6'>
            Related Market Examples
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                title: 'Tech Sector Rally',
                description:
                  'Technology stocks showing strong momentum with AI-driven growth',
                icon: Globe,
                color: 'financial-teal',
              },
              {
                title: 'Energy Volatility',
                description:
                  'Oil and gas sectors experiencing increased volatility due to geopolitical events',
                icon: DollarSign,
                color: 'financial-coral',
              },
              {
                title: 'Market Correlation',
                description:
                  'Strong correlation between global indices during recent trading sessions',
                icon: Activity,
                color: 'financial-teal',
              },
            ].map((example) => (
              <Card
                key={example.title}
                className='glass p-6 hover:scale-105 transition-all duration-300'
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-${example.color}/20 flex items-center justify-center mb-4`}
                >
                  <example.icon className={`w-5 h-5 text-${example.color}`} />
                </div>
                <h3 className='font-medium text-foreground mb-2'>
                  {example.title}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {example.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
      {/* Floating Add Button */}
      <Button
        size='lg'
        onClick={() => setOpen(!open)}
        className='fixed bottom-6 right-6 w-16 h-16 rounded-2xl shadow-xl 
                   bg-gradient-to-br from-financial-teal to-emerald-500 
                   hover:scale-110 hover:shadow-2xl active:scale-95 
                   transition-all duration-300 ease-out text-white flex 
                   items-center justify-center z-50'
      >
        {submitted ? (
          <Check className='w-8 h-8' />
        ) : (
          <Plus className='w-8 h-8' />
        )}
      </Button>

      {/* Expandable Input Box */}
      {open && (
        <div className='fixed bottom-28 right-6 w-80 bg-background border border-border rounded-xl shadow-2xl p-4 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300'>
          <h3 className='font-semibold text-lg mb-3 text-foreground'>
            Add Tickers
          </h3>

          {/* Input field with add button */}
          <div className='flex space-x-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTicker()}
              placeholder='Enter ticker symbol (e.g., AAPL)'
              className='flex-1 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-financial-teal'
            />
            <Button
              variant='secondary'
              onClick={handleAddTicker}
              className='shrink-0'
            >
              Select
            </Button>
          </div>

          {/* Selected tickers */}
          <div className='flex flex-wrap gap-2 mt-3'>
            {tickers.map((ticker) => (
              <div
                key={ticker}
                className='flex items-center bg-financial-teal/20 text-financial-teal px-3 py-1 rounded-full text-sm'
              >
                {ticker}
                <X
                  className='w-4 h-4 ml-2 cursor-pointer hover:text-financial-coral'
                  onClick={() => handleRemoveTicker(ticker)}
                />
              </div>
            ))}
          </div>

          {/* Submit button */}
          <Button
            className='mt-4 w-full bg-financial-teal hover:bg-financial-teal/90'
            onClick={handleSubmit}
            disabled={tickers.length === 0}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
