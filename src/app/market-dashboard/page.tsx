"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
} from "lucide-react"
import Link from "next/link"

export default function MarketDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [hoveredSector, setHoveredSector] = useState<string | null>(null)

  const marketIndices = [
    { name: "NIFTY 50", value: "22,147.90", change: "+267.45", percent: "+1.22%", positive: true },
    { name: "S&P 500", value: "4,567.18", change: "-36.82", percent: "-0.80%", positive: false },
    { name: "GOLD", value: "$2,034.50", change: "+10.25", percent: "+0.51%", positive: true },
    { name: "CRUDE OIL", value: "$73.25", change: "-0.82", percent: "-1.11%", positive: false },
    { name: "USD/INR", value: "83.12", change: "+0.24", percent: "+0.29%", positive: true },
  ]

  const sectorData = [
    { name: "Technology", change: 2.4, volume: "High" },
    { name: "Healthcare", change: 1.8, volume: "Medium" },
    { name: "Finance", change: -0.5, volume: "High" },
    { name: "Energy", change: -1.2, volume: "Low" },
    { name: "Consumer", change: 0.8, volume: "Medium" },
    { name: "Industrial", change: 1.1, volume: "Low" },
    { name: "Materials", change: -0.3, volume: "Medium" },
    { name: "Utilities", change: 0.4, volume: "Low" },
  ]

  const topGainers = [
    { symbol: "RELIANCE", price: "2,847.50", change: "+4.2%", sparkline: [100, 105, 102, 108, 104.2] },
    { symbol: "TCS", price: "3,654.80", change: "+3.8%", sparkline: [100, 98, 103, 106, 103.8] },
    { symbol: "INFY", price: "1,456.20", change: "+3.1%", sparkline: [100, 102, 99, 105, 103.1] },
    { symbol: "HDFC", price: "1,678.90", change: "+2.9%", sparkline: [100, 101, 104, 102, 102.9] },
  ]

  const topLosers = [
    { symbol: "BAJAJ", price: "8,234.10", change: "-2.8%", sparkline: [100, 98, 95, 97, 97.2] },
    { symbol: "MARUTI", price: "10,567.30", change: "-2.1%", sparkline: [100, 99, 96, 98, 97.9] },
    { symbol: "WIPRO", price: "432.80", change: "-1.9%", sparkline: [100, 97, 98, 95, 98.1] },
    { symbol: "TITAN", price: "3,245.60", change: "-1.5%", sparkline: [100, 98, 99, 97, 98.5] },
  ]

  const benefits = [
    "Real-time market data with millisecond precision",
    "Interactive sector heatmaps for quick analysis",
    "Advanced charting with 50+ technical indicators",
    "Customizable watchlists and alerts",
    "Historical data going back 20+ years",
  ]

  const drawbacks = [
    "Requires stable internet connection for real-time data",
    "Advanced features may overwhelm new traders",
    "Data delays possible during high volatility periods",
    "Premium features require subscription",
  ]

  const Sparkline = ({ data, positive }: { data: number[]; positive: boolean }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 60
        const y = 20 - ((value - min) / range) * 20
        return `${x},${y}`
      })
      .join(" ")

    return (
      <svg width="60" height="20" className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke={positive ? "var(--financial-teal)" : "var(--financial-coral)"}
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-financial-charcoal border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-financial-teal/20 flex items-center justify-center mr-4">
              <BarChart3 className="w-6 h-6 text-financial-teal" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">Market Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time market data with interactive charts and comprehensive sector analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Market Indices */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Live Market Indices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {marketIndices.map((index) => (
              <Card key={index.name} className="glass p-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground text-sm">{index.name}</h3>
                  {index.positive ? (
                    <TrendingUp className="w-4 h-4 text-financial-teal" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-financial-coral" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg text-foreground">{index.value}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className={index.positive ? "text-financial-teal" : "text-financial-coral"}>
                      {index.change}
                    </span>
                    <span className={index.positive ? "text-financial-teal" : "text-financial-coral"}>
                      {index.percent}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Chart Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-2xl text-foreground">Interactive Charts</h2>
            <div className="flex items-center space-x-2">
              {["1D", "1W", "1M", "3M", "1Y"].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={
                    selectedTimeframe === timeframe
                      ? "bg-financial-teal hover:bg-financial-teal/90"
                      : "border-border hover:bg-muted"
                  }
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
          <Card className="glass p-6">
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <Activity className="w-12 h-12 text-financial-teal mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Chart Component</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Real-time data visualization for {selectedTimeframe} timeframe
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Sector Heatmap */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Sector Performance Heatmap</h2>
          <Card className="glass p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sectorData.map((sector) => (
                <div
                  key={sector.name}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    sector.change > 0
                      ? "bg-financial-teal/20 hover:bg-financial-teal/30"
                      : "bg-financial-coral/20 hover:bg-financial-coral/30"
                  }`}
                  onMouseEnter={() => setHoveredSector(sector.name)}
                  onMouseLeave={() => setHoveredSector(null)}
                >
                  <div className="text-center">
                    <h3 className="font-medium text-foreground text-sm mb-2">{sector.name}</h3>
                    <p
                      className={`font-bold text-lg ${
                        sector.change > 0 ? "text-financial-teal" : "text-financial-coral"
                      }`}
                    >
                      {sector.change > 0 ? "+" : ""}
                      {sector.change}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Vol: {sector.volume}</p>
                  </div>
                  {hoveredSector === sector.name && (
                    <div className="absolute z-10 bg-background border border-border rounded-lg p-2 mt-2 shadow-lg">
                      <p className="text-sm text-foreground">Click to explore {sector.name} stocks</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Top Gainers and Losers */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-financial-teal mr-2" />
              Top Gainers
            </h2>
            <Card className="glass p-6">
              <div className="space-y-4">
                {topGainers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20"
                  >
                    <div>
                      <h3 className="font-medium text-foreground">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">₹{stock.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Sparkline data={stock.sparkline} positive={true} />
                      <span className="font-medium text-financial-teal">{stock.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6 flex items-center">
              <TrendingDown className="w-6 h-6 text-financial-coral mr-2" />
              Top Losers
            </h2>
            <Card className="glass p-6">
              <div className="space-y-4">
                {topLosers.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20"
                  >
                    <div>
                      <h3 className="font-medium text-foreground">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">₹{stock.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Sparkline data={stock.sparkline} positive={false} />
                      <span className="font-medium text-financial-coral">{stock.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Benefits and Drawbacks */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass p-6">
            <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-financial-teal mr-2" />
              Benefits
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Zap className="w-4 h-4 text-financial-teal mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass p-6">
            <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center">
              <XCircle className="w-5 h-5 text-financial-coral mr-2" />
              Considerations
            </h3>
            <ul className="space-y-3">
              {drawbacks.map((drawback, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-financial-coral mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{drawback}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Related Examples */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Related Market Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Tech Sector Rally",
                description: "Technology stocks showing strong momentum with AI-driven growth",
                icon: Globe,
                color: "financial-teal",
              },
              {
                title: "Energy Volatility",
                description: "Oil and gas sectors experiencing increased volatility due to geopolitical events",
                icon: DollarSign,
                color: "financial-coral",
              },
              {
                title: "Market Correlation",
                description: "Strong correlation between global indices during recent trading sessions",
                icon: Activity,
                color: "financial-teal",
              },
            ].map((example) => (
              <Card key={example.title} className="glass p-6 hover:scale-105 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-${example.color}/20 flex items-center justify-center mb-4`}>
                  <example.icon className={`w-5 h-5 text-${example.color}`} />
                </div>
                <h3 className="font-medium text-foreground mb-2">{example.title}</h3>
                <p className="text-sm text-muted-foreground">{example.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
