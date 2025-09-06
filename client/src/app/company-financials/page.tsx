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
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
} from 'lucide-react';
import Link from 'next/link';
import useStockStore from '@/store/useStockStore';

// Format with Indian number system commas
function formatIndianNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

// 🔄 Utility function: format money values in Indian style (₹, Cr, L Cr)
function formatNumber(value: number | string): string {
  if (!value || isNaN(Number(value))) return 'N/A';
  const num = Number(value);

  // Convert to Crores
  if (num >= 1e7) {
    const crores = num / 1e7;

    // If >= 1 Lakh Crore (100,000 Cr) → show in L Cr
    if (crores >= 1e5) {
      return '₹' + (crores / 1e5).toFixed(2).replace(/\.00$/, '') + 'L Cr';
    }

    // If >= 100 Cr → show as L Cr with space
    if (crores >= 100) {
      return '₹' + (crores / 100).toFixed(2).replace(/\.00$/, '') + ' L Cr';
    }

    // Otherwise normal Crores with commas
    return (
      '₹' +
      formatIndianNumber(Number(crores.toFixed(2).replace(/\.00$/, ''))) +
      ' Cr'
    );
  }

  // Lakhs
  if (num >= 1e5) {
    return (
      '₹' +
      formatIndianNumber(Number((num / 1e5).toFixed(2).replace(/\.00$/, ''))) +
      ' L'
    );
  }

  // Thousands
  if (num >= 1e3) {
    return (
      '₹' +
      formatIndianNumber(Number((num / 1e3).toFixed(2).replace(/\.00$/, ''))) +
      ' K'
    );
  }

  // Plain number
  return '₹' + formatIndianNumber(num);
}

export default function CompanyFinancials() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState('RELIANCE.NS');

  const {
    stockData,
    loading,
    error,
    fetchStockSummaryOverview,
    fetchFinancialRatios,
    fetchHistoricalData, // ✅ include historical fetch
    historicalData,
  } = useStockStore();

  const companies = [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
    { symbol: 'INFY', name: 'Infosys Ltd' },
    { symbol: 'HDFCBANK.BO', name: 'HDFC Bank Ltd' },
  ];

  const ratiosData = stockData
    ? {
        profitability: [
          {
            name: 'Gross Profit Margin',
            value: stockData.Profitability?.GrossProfitMargin,
          },
          {
            name: 'Operating Margin',
            value: stockData.Profitability?.OperatingMargin,
          },
          {
            name: 'Net Profit Margin',
            value: stockData.Profitability?.NetProfitMargin,
          },
          {
            name: 'Return on Equity',
            value: stockData.Profitability?.ReturnOnEquity,
          },
          {
            name: 'Return on Assets',
            value: stockData.Profitability?.ReturnOnAssets,
          },
        ],
        liquidity: [
          { name: 'Current Ratio', value: stockData.Liquidity?.CurrentRatio },
          { name: 'Quick Ratio', value: stockData.Liquidity?.QuickRatio },
          { name: 'Cash Ratio', value: stockData.Liquidity?.CashRatio },
          {
            name: 'Working Capital',
            value: formatNumber(stockData.Liquidity?.WorkingCapital),
          },
        ],
        leverage: [
          { name: 'Debt-to-Equity', value: stockData.Leverage?.DebtToEquity },
          {
            name: 'Interest Coverage',
            value: stockData.Leverage?.InterestCoverage,
          },
          { name: 'Asset Coverage', value: stockData.Leverage?.AssetCoverage },
        ],
      }
    : null;

  // 🔄 Fetch summary when company changes
  useEffect(() => {
    if (selectedCompany) {
      fetchStockSummaryOverview(selectedCompany);
    }
  }, [selectedCompany, fetchStockSummaryOverview]);

  useEffect(() => {
    if (selectedCompany && activeTab === 'ratios') {
      fetchFinancialRatios(selectedCompany);
    }
    if (selectedCompany && activeTab === 'historical') {
      fetchHistoricalData(selectedCompany); // ✅ call store function
    }
  }, [selectedCompany, activeTab, fetchFinancialRatios, fetchHistoricalData]);

  useEffect(() => {
    console.log('stockData', stockData);
  }, [stockData]);

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
                  for informed decisions
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
            Select Company
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {companies.map((company) => (
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
        </section>

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
                  // <div className="w-full">
                  //   <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                  //     {selectedCompany} - Company Overview
                  //   </h3>
                  //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  //     <div className="space-y-4">
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Market Cap
                  //         </p>
                  //         <p className="font-bold text-xl text-foreground">
                  //           {currentData.marketCap}
                  //         </p>
                  //       </div>
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Revenue (TTM)
                  //         </p>
                  //         <p className="font-bold text-xl text-foreground">
                  //           {currentData.revenue}
                  //         </p>
                  //       </div>
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Sector
                  //         </p>
                  //         <p className="font-medium text-foreground">
                  //           {currentData.sector}
                  //         </p>
                  //       </div>
                  //     </div>
                  //     <div className="space-y-4">
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Net Income
                  //         </p>
                  //         <p className="font-bold text-xl text-financial-teal">
                  //           {currentData.netIncome}
                  //         </p>
                  //       </div>
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">EPS</p>
                  //         <p className="font-bold text-xl text-foreground">
                  //           {currentData.eps}
                  //         </p>
                  //       </div>
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Employees
                  //         </p>
                  //         <p className="font-medium text-foreground">
                  //           {currentData.employees}
                  //         </p>
                  //       </div>
                  //     </div>
                  //     <div className="space-y-4">
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           P/E Ratio
                  //         </p>
                  //         <p className="font-bold text-xl text-foreground">
                  //           {currentData.peRatio}
                  //         </p>
                  //       </div>
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Book Value
                  //         </p>
                  //         <p className="font-bold text-xl text-foreground">
                  //           {currentData.bookValue}
                  //         </p>
                  //       </div>
                  //       <div>
                  //         <p className="text-sm text-muted-foreground">
                  //           Dividend Yield
                  //         </p>
                  //         <p className="font-bold text-xl text-financial-teal">
                  //           {currentData.dividendYield}
                  //         </p>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
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
                        <p className='text-sm text-muted-foreground'>Sector</p>
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
              ) : ratiosData ? (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                  {/* Profitability */}
                  <Card className='glass p-6'>
                    <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
                      <DollarSign className='w-5 h-5 text-financial-teal mr-2' />
                      Profitability Ratios
                    </h3>
                    <div className='space-y-4'>
                      {ratiosData.profitability.map((ratio) => (
                        <div
                          key={ratio.name}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm text-muted-foreground'>
                            {ratio.name}
                          </span>
                          <div className='flex items-center'>
                            <span className='font-medium text-foreground mr-2'>
                              {ratio.value || 'N/A'}
                            </span>
                            {/* 🔄 No trend data from API → skip icons for now */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Liquidity */}
                  <Card className='glass p-6'>
                    <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
                      <BarChart3 className='w-5 h-5 text-financial-cyan mr-2' />
                      Liquidity Ratios
                    </h3>
                    <div className='space-y-4'>
                      {ratiosData.liquidity.map((ratio) => (
                        <div
                          key={ratio.name}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm text-muted-foreground'>
                            {ratio.name}
                          </span>
                          <div className='flex items-center'>
                            <span className='font-medium text-foreground mr-2'>
                              {ratio.value || 'N/A'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Leverage */}
                  <Card className='glass p-6'>
                    <h3 className='font-display font-semibold text-xl text-foreground mb-4 flex items-center'>
                      <PieChart className='w-5 h-5 text-financial-coral mr-2' />
                      Leverage Ratios
                    </h3>
                    <div className='space-y-4'>
                      {ratiosData.leverage.map((ratio) => (
                        <div
                          key={ratio.name}
                          className='flex items-center justify-between'
                        >
                          <span className='text-sm text-muted-foreground'>
                            {ratio.name}
                          </span>
                          <div className='flex items-center'>
                            <span className='font-medium text-foreground mr-2'>
                              {ratio.value || 'N/A'}
                            </span>
                          </div>
                        </div>
                      ))}
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
                          <th className='px-4 py-2 text-left'>Net Income</th>
                          <th className='px-4 py-2 text-left'>EPS</th>
                          <th className='px-4 py-2 text-left'>ROE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockData.map((row: any, idx: number) => (
                          <tr key={idx} className='border-t border-border'>
                            <td className='px-4 py-2'>{row.Year}</td>
                            <td className='px-4 py-2'>
                              {row.Revenue ? formatNumber(row.Revenue) : 'N/A'}
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
      </div>
      {/* Floating Add Button */}
      <Button
        size='lg'
        className='fixed bottom-6 right-6 w-16 h-16 rounded-2xl shadow-xl 
             bg-gradient-to-br from-financial-teal to-emerald-500 
             hover:scale-110 hover:shadow-2xl active:scale-95 
             transition-all duration-300 ease-out text-white flex 
             items-center justify-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-8 h-8 drop-shadow-md'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4v16m8-8H4'
          />
        </svg>
      </Button>
    </div>
  );
}
