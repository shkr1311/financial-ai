'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  Building2,
  Loader,
  Calculator,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import useStockStore from '@/store/useStockStore';
import FloatingTickerInput from '@/components/FloatingTickerInput/FloatingTickerInput';
import useAuthStore from '@/store/useAuthStore';

// Format with Indian number system commas
function formatIndianNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

// 🔄 Utility function: format money values in Indian style
function formatNumber(value: number | string): string {
  if (!value || isNaN(Number(value))) return 'N/A';
  const num = Number(value);

  if (num >= 1e7) {
    const crores = num / 1e7;
    if (crores >= 1e5)
      return '₹' + (crores / 1e5).toFixed(2).replace(/\.00$/, '') + 'L Cr';
    if (crores >= 100)
      return '₹' + (crores / 100).toFixed(2).replace(/\.00$/, '') + ' L Cr';
    return (
      '₹' +
      formatIndianNumber(Number(crores.toFixed(2).replace(/\.00$/, ''))) +
      ' Cr'
    );
  }

  if (num >= 1e5) {
    return (
      '₹' +
      formatIndianNumber(Number((num / 1e5).toFixed(2).replace(/\.00$/, ''))) +
      ' L'
    );
  }

  if (num >= 1e3) {
    return (
      '₹' +
      formatIndianNumber(Number((num / 1e3).toFixed(2).replace(/\.00$/, ''))) +
      ' K'
    );
  }

  return '₹' + formatIndianNumber(num);
}

export default function CompanyFinancials() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [userTickers, setUserTickers] = useState<
    { symbol: string; name: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    stockData,
    loading,
    error,
    fetchStockSummaryOverview,
    fetchFinancialRatios,
    fetchHistoricalData,
    ratiosData,
  } = useStockStore();

  const { getTickers, tickers, authUser, checkAuth } = useAuthStore();

  // Default companies (fallback if user has no tickers)
  const defaultCompanies = [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
    { symbol: 'INFY', name: 'Infosys Ltd' },
    { symbol: 'HDFCBANK.BO', name: 'HDFC Bank Ltd' },
  ];

  // Navigation functions
  const handlePreviousCompanies = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextCompanies = () => {
    setCurrentIndex((prev) => Math.min(userTickers.length - 3, prev + 1));
  };

  // Visible companies (3 at a time)
  const visibleCompanies = userTickers.slice(currentIndex, currentIndex + 3);

  // Initialize auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch tickers when authUser is available
  useEffect(() => {
    if (authUser) getTickers();
  }, [authUser]);

  // Process user tickers
  useEffect(() => {
    if (tickers && Array.isArray(tickers) && tickers.length > 0) {
      const userCompanies = tickers.map((ticker) => ({
        symbol: ticker,
        name: `${ticker} Company`,
      }));
      setUserTickers(userCompanies);
      if (!selectedCompany) setSelectedCompany(userCompanies[0].symbol);
    } else {
      setUserTickers(defaultCompanies);
      if (!selectedCompany) setSelectedCompany(defaultCompanies[0].symbol);
    }
    // setCurrentIndex(0); // reset carousel on tickers change
  }, [tickers, authUser]);

  // Fetch data when tab or company changes
  useEffect(() => {
    const fetchData = async (selectedCompany: string | null) => {
      if (selectedCompany) {
        if (activeTab === 'overview')
          await fetchStockSummaryOverview(selectedCompany);
        if (activeTab === 'ratios') {
          console.log('fetchFinancialRatios', selectedCompany);
          await fetchFinancialRatios(selectedCompany);
          console.log('fetchFinancialRatios done');
        }
        if (activeTab === 'historical')
          await fetchHistoricalData(selectedCompany);
      }
    };
    fetchData(selectedCompany);
  }, [
    selectedCompany,
    activeTab,
    fetchStockSummaryOverview,
    fetchFinancialRatios,
    fetchHistoricalData,
  ]);

  useEffect(() => {
    console.log('ratiosData', ratiosData);
  }, [ratiosData]);

  // 📊 Map API data into UI-friendly structure
  const currentData = stockData
    ? {
        marketCap: formatNumber(stockData.MarketCap),
        revenue: formatNumber(stockData.RevenueTTM),
        netIncome: formatNumber(stockData.NetIncomeTTM),
        eps: stockData.EPS || 'N/A',
        peRatio: stockData.PERatio || 'N/A',
        bookValue: formatNumber(stockData.BookValue),
        dividendYield: stockData.DividendYield || 'N/A',
        sector: stockData.Sector || 'N/A',
        employees: formatNumber(stockData.Employees),
        founded: stockData.Founded || 'N/A',
      }
    : {};

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'ratios', label: 'Ratios', icon: Calculator },
    { id: 'historical', label: 'Historical Data', icon: Calendar },
  ];

  // Show loading if still checking auth or fetching tickers
  if (!authUser && !userTickers.length) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Loader className='w-10 h-10 animate-spin text-financial-teal' />
          <p className='text-muted-foreground'>Loading user data...</p>
        </div>
      </div>
    );
  }

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
          <div className='flex items-center justify-between'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 rounded-lg bg-financial-teal/20 flex items-center justify-center mr-4'>
                <Building2 className='w-6 h-6 text-financial-teal' />
              </div>
              <div>
                <h1 className='font-display font-bold text-3xl text-foreground'>
                  Company Financials
                </h1>
                <p className='text-muted-foreground'>
                  Comprehensive financial data, ratios, and historical analysis
                  for your selected companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        {/* Company Selector */}
        <section>
          <h2 className='font-display font-semibold text-2xl text-foreground mb-6'>
            {authUser && tickers?.length > 0
              ? 'Your Companies'
              : 'Select Company'}
          </h2>
          {userTickers.length === 0 ? (
            <Card className='glass p-8 text-center'>
              <p className='text-muted-foreground'>
                No companies available. Please add some tickers to your
                watchlist.
              </p>
            </Card>
          ) : (
            <div className='relative'>
              {/* Navigation and Company Cards Container */}
              <div className='flex items-center space-x-4'>
                {/* Left Arrow */}
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handlePreviousCompanies}
                  disabled={currentIndex === 0}
                  className={`flex-shrink-0 ${
                    currentIndex === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-muted'
                  }`}
                >
                  <ChevronLeft className='w-6 h-6' />
                </Button>

                {/* Companies Grid (3 companies) */}
                <div className='flex-1 grid grid-cols-3 gap-4'>
                  {visibleCompanies.map((company) => (
                    <Card
                      key={company.symbol}
                      className={`glass p-4 cursor-pointer transition-all duration-300 ${
                        selectedCompany === company.symbol
                          ? 'ring-2 ring-financial-teal bg-financial-teal/10'
                          : 'hover:scale-105'
                      }`}
                      onClick={() => setSelectedCompany(company.symbol)}
                    >
                      <div className='text-center'>
                        <h3 className='font-display font-bold text-lg text-foreground'>
                          {company.symbol}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          {company.name}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Right Arrow */}
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handleNextCompanies}
                  disabled={currentIndex >= userTickers.length - 3}
                  className={`flex-shrink-0 ${
                    currentIndex >= userTickers.length - 3
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-muted'
                  }`}
                >
                  <ChevronRight className='w-6 h-6' />
                </Button>
              </div>

              {/* Progress Indicator */}
              {/* {userTickers.length > 3 && (
                <div className='flex justify-center mt-4 space-x-2'>
                  {Array.from({
                    length: Math.ceil(userTickers.length / 3),
                  }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        Math.floor(currentIndex / 3) === index
                          ? 'bg-financial-teal'
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              )} */}
            </div>
          )}
        </section>

        {/* Show tabs only if a company is selected */}
        {selectedCompany && (
          <>
            {/* Tabs Navigation */}
            <section>
              <div className='flex items-center space-x-1 mb-8 bg-muted/20 p-1 rounded-lg'>
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'ghost'}
                    className={`flex-1 ${
                      activeTab === tab.id
                        ? 'bg-financial-teal hover:bg-financial-teal/90 text-white'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className='w-4 h-4 mr-2' />
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className='space-y-8'>
                  <Card className='glass p-8 min-h-[300px] flex items-center justify-center'>
                    {loading ? (
                      <div className='flex flex-col items-center justify-center space-y-4'>
                        <Loader className='w-10 h-10 animate-spin text-financial-teal' />
                        <p className='text-muted-foreground'>Loading data...</p>
                      </div>
                    ) : error ? (
                      <p className='text-financial-coral'>Error: {error}</p>
                    ) : (
                      <div className='w-full'>
                        <h3 className='font-display font-semibold text-2xl text-foreground mb-8'>
                          {selectedCompany} - Company Overview
                        </h3>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                          {/* Market Cap */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Market Cap
                            </p>
                            <p className='text-2xl font-bold text-foreground mt-1'>
                              {currentData.marketCap}
                            </p>
                          </Card>

                          {/* Revenue */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Revenue (TTM)
                            </p>
                            <p className='text-2xl font-bold text-foreground mt-1'>
                              {currentData.revenue}
                            </p>
                          </Card>

                          {/* Net Income */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Net Income
                            </p>
                            <p className='text-2xl font-bold text-financial-teal mt-1'>
                              {currentData.netIncome}
                            </p>
                          </Card>

                          {/* EPS */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>EPS</p>
                            <p className='text-2xl font-bold text-foreground mt-1'>
                              {currentData.eps}
                            </p>
                          </Card>

                          {/* P/E Ratio */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              P/E Ratio
                            </p>
                            <p className='text-2xl font-bold text-foreground mt-1'>
                              {currentData.peRatio}
                            </p>
                          </Card>

                          {/* Book Value */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Book Value
                            </p>
                            <p className='text-2xl font-bold text-foreground mt-1'>
                              {currentData.bookValue}
                            </p>
                          </Card>

                          {/* Dividend Yield */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Dividend Yield
                            </p>
                            <p className='text-2xl font-bold text-financial-teal mt-1'>
                              {currentData.dividendYield}
                            </p>
                          </Card>

                          {/* Employees */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Employees
                            </p>
                            <p className='text-2xl font-bold text-foreground mt-1'>
                              {currentData.employees}
                            </p>
                          </Card>

                          {/* Sector */}
                          <Card className='p-6 bg-muted/10 rounded-2xl shadow-sm hover:shadow-md transition'>
                            <p className='text-sm text-muted-foreground'>
                              Sector
                            </p>
                            <p className='text-lg font-medium text-foreground mt-1'>
                              {currentData.sector}
                            </p>
                          </Card>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* ratios */}
              {activeTab === 'ratios' && (
                <div className='space-y-8'>
                  {loading ? (
                    <div className='flex flex-col items-center justify-center space-y-4'>
                      <Loader className='w-10 h-10 animate-spin text-financial-teal' />
                      <p className='text-muted-foreground'>
                        Loading financial ratios...
                      </p>
                    </div>
                  ) : error ? (
                    <p className='text-financial-coral'>Error: {error}</p>
                  ) : // ) : (ratiosData.profitability && ratiosData.liquidity && ratiosData.leverage) ? (
                  ratiosData ? (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                      {/* Profitability */}
                      <Card className='glass p-6'>
                        <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
                          <DollarSign className='w-5 h-5 text-financial-teal mr-2' />
                          Profitability Ratios
                        </h3>
                        <div className='space-y-4'>
                          {Object.entries(ratiosData?.Profitability || {}).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className='flex items-center justify-between'
                              >
                                <span className='text-sm text-muted-foreground'>
                                  {key}
                                </span>
                                <div className='flex items-center'>
                                  <span className='font-medium text-foreground mr-2'>
                                    {value !== null && value !== undefined ? String(value) : 'N/A'}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </Card>

                      {/* Liquidity */}
                      <Card className='glass p-6'>
                        <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
                          <BarChart3 className='w-5 h-5 text-financial-cyan mr-2' />
                          Liquidity Ratios
                        </h3>
                        <div className='space-y-4'>
                          {Object.entries(ratiosData?.Liquidity || {}).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className='flex items-center justify-between'
                              >
                                <span className='text-sm text-muted-foreground'>
                                  {key}
                                </span>
                                <div className='flex items-center'>
                                  <span className='font-medium text-foreground mr-2'>
                                    {value !== null && value !== undefined ? String(value) : 'N/A'}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </Card>

                      {/* Leverage */}
                      <Card className='glass p-6'>
                        <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
                          <PieChart className='w-5 h-5 text-financial-coral mr-2' />
                          Leverage Ratios
                        </h3>
                        <div className='space-y-4'>
                          {Object.entries(ratiosData?.Leverage || {}).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className='flex items-center justify-between'
                              >
                                <span className='text-sm text-muted-foreground'>
                                  {key}
                                </span>
                                <div className='flex items-center'>
                                  <span className='font-medium text-foreground mr-2'>
                                    {value !== null && value !== undefined ? String(value) : 'N/A'}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </Card>
                    </div>
                  ) : (
                    <p className='text-muted-foreground'>
                      Select a company to view ratios
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'historical' && (
                <Card className='glass p-8'>
                  {loading ? (
                    <div className='flex flex-col items-center justify-center space-y-4'>
                      <Loader className='w-10 h-10 animate-spin text-financial-teal' />
                      <p className='text-muted-foreground'>
                        Loading historical data...
                      </p>
                    </div>
                  ) : error ? (
                    <p className='text-financial-coral'>Error: {error}</p>
                  ) : stockData && Array.isArray(stockData) ? (
                    <div>
                      <h3 className='font-display font-semibold text-2xl text-foreground mb-6'>
                        {selectedCompany} - Last 4 Years Performance
                      </h3>
                      <div className='overflow-x-auto'>
                        <table className='w-full border border-border rounded-lg'>
                          <thead className='bg-muted/30'>
                            <tr>
                              <th className='px-4 py-2 text-left'>Year</th>
                              <th className='px-4 py-2 text-left'>Revenue</th>
                              <th className='px-4 py-2 text-left'>
                                Net Income
                              </th>
                              <th className='px-4 py-2 text-left'>EPS</th>
                              <th className='px-4 py-2 text-left'>ROE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stockData.map((row: any, idx: number) => (
                              <tr key={idx} className='border-t border-border'>
                                <td className='px-4 py-2'>{row.Year}</td>
                                <td className='px-4 py-2'>
                                  {row.Revenue
                                    ? formatNumber(row.Revenue)
                                    : 'N/A'}
                                </td>
                                <td className='px-4 py-2'>
                                  {row.NetIncome
                                    ? formatNumber(row.NetIncome)
                                    : 'N/A'}
                                </td>
                                <td className='px-4 py-2'>
                                  {row.EPS !== null && row.EPS !== undefined
                                    ? row.EPS.toFixed(2)
                                    : 'N/A'}
                                </td>
                                <td className='px-4 py-2'>
                                  {row.ROE
                                    ? (row.ROE * 100).toFixed(2) + '%'
                                    : 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <p className='text-muted-foreground'>
                      No historical data found
                    </p>
                  )}
                </Card>
              )}
            </section>
          </>
        )}
      </div>
      <FloatingTickerInput />
    </div>
  );
}
