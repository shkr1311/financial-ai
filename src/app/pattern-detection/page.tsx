"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Target,
  BarChart3,
  Activity,
  Eye,
  Play,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Brain,
  Zap,
  Search,
} from "lucide-react"
import Link from "next/link"

export default function PatternDetection() {
  const [selectedPattern, setSelectedPattern] = useState("head-shoulders")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [selectedStock, setSelectedStock] = useState("RELIANCE")

  const patterns = [
    {
      id: "head-shoulders",
      name: "Head & Shoulders",
      type: "Reversal",
      reliability: 85,
      description: "Classic reversal pattern indicating potential trend change",
      color: "financial-coral",
    },
    {
      id: "double-top",
      name: "Double Top",
      type: "Reversal",
      reliability: 78,
      description: "Bearish reversal pattern with two peaks at similar levels",
      color: "financial-coral",
    },
    {
      id: "ascending-triangle",
      name: "Ascending Triangle",
      type: "Continuation",
      reliability: 72,
      description: "Bullish continuation pattern with rising support line",
      color: "financial-teal",
    },
    {
      id: "cup-handle",
      name: "Cup & Handle",
      type: "Continuation",
      reliability: 80,
      description: "Bullish continuation pattern resembling a cup with handle",
      color: "financial-teal",
    },
    {
      id: "flag",
      name: "Bull Flag",
      type: "Continuation",
      reliability: 75,
      description: "Short-term consolidation after strong upward movement",
      color: "financial-teal",
    },
    {
      id: "wedge",
      name: "Rising Wedge",
      type: "Reversal",
      reliability: 70,
      description: "Bearish pattern with converging trend lines sloping upward",
      color: "financial-coral",
    },
  ]

  const detectedPatterns = [
    {
      stock: "RELIANCE",
      pattern: "Head & Shoulders",
      timeframe: "1D",
      confidence: 87,
      status: "Forming",
      priceTarget: "₹2,650",
      stopLoss: "₹2,900",
      riskReward: "1:2.5",
      detected: "2 hours ago",
    },
    {
      stock: "TCS",
      pattern: "Ascending Triangle",
      timeframe: "4H",
      confidence: 92,
      status: "Confirmed",
      priceTarget: "₹3,850",
      stopLoss: "₹3,600",
      riskReward: "1:3.2",
      detected: "4 hours ago",
    },
    {
      stock: "INFY",
      pattern: "Cup & Handle",
      timeframe: "1D",
      confidence: 78,
      status: "Forming",
      priceTarget: "₹1,580",
      stopLoss: "₹1,420",
      riskReward: "1:2.8",
      detected: "6 hours ago",
    },
    {
      stock: "HDFC",
      pattern: "Double Top",
      timeframe: "1D",
      confidence: 83,
      status: "Confirmed",
      priceTarget: "₹1,550",
      stopLoss: "₹1,720",
      riskReward: "1:2.1",
      detected: "8 hours ago",
    },
  ]

  const tradeSetups = [
    {
      pattern: "Head & Shoulders",
      entry: "Break below neckline",
      target: "Height of head projected downward",
      stopLoss: "Above right shoulder",
      timeframe: "Medium-term (2-4 weeks)",
      success_rate: "85%",
    },
    {
      pattern: "Ascending Triangle",
      entry: "Break above resistance",
      target: "Height of triangle added to breakout",
      stopLoss: "Below support line",
      timeframe: "Short-term (1-2 weeks)",
      success_rate: "72%",
    },
  ]

  const benefits = [
    "Automated pattern recognition across 500+ stocks simultaneously",
    "Real-time alerts when patterns form or confirm",
    "Historical backtesting data for pattern reliability",
    "Integration with risk management and position sizing",
    "Custom pattern alerts and watchlist notifications",
  ]

  const drawbacks = [
    "False breakouts can occur, especially in volatile markets",
    "Pattern recognition accuracy varies with market conditions",
    "Requires confirmation before taking trading positions",
    "Some patterns may take weeks or months to fully develop",
  ]

  const timeframes = ["5M", "15M", "1H", "4H", "1D", "1W"]
  const stocks = ["RELIANCE", "TCS", "INFY", "HDFC", "WIPRO", "BAJAJ"]

  const currentPattern = patterns.find((p) => p.id === selectedPattern) || patterns[0]

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
              <Target className="w-6 h-6 text-financial-teal" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">Pattern Detection</h1>
              <p className="text-muted-foreground">
                Automated technical pattern recognition with AI-powered trade setups and alerts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Pattern Library */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Pattern Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patterns.map((pattern) => (
              <Card
                key={pattern.id}
                className={`glass p-6 cursor-pointer transition-all duration-300 ${
                  selectedPattern === pattern.id ? "ring-2 ring-financial-teal bg-financial-teal/10" : "hover:scale-105"
                }`}
                onClick={() => setSelectedPattern(pattern.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-${pattern.color}/20 text-${pattern.color}`}
                  >
                    {pattern.type}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">Reliability:</span>
                    <span className="font-bold text-foreground">{pattern.reliability}%</span>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{pattern.name}</h3>
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Chart */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-2xl text-foreground">Pattern Visualization</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Stock:</span>
                {stocks.slice(0, 4).map((stock) => (
                  <Button
                    key={stock}
                    variant={selectedStock === stock ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStock(stock)}
                    className={
                      selectedStock === stock
                        ? "bg-financial-teal hover:bg-financial-teal/90"
                        : "border-border hover:bg-muted"
                    }
                  >
                    {stock}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                {timeframes.slice(2, 6).map((tf) => (
                  <Button
                    key={tf}
                    variant={selectedTimeframe === tf ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(tf)}
                    className={
                      selectedTimeframe === tf
                        ? "bg-financial-teal hover:bg-financial-teal/90"
                        : "border-border hover:bg-muted"
                    }
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Card className="glass p-8">
            <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg relative">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-financial-teal mx-auto mb-4" />
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {currentPattern.name} Pattern
                </h3>
                <p className="text-muted-foreground mb-4">
                  Interactive chart showing {selectedStock} with {currentPattern.name} pattern highlighted
                </p>
                <Button className="bg-financial-teal hover:bg-financial-teal/90 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  See Trade Setup
                </Button>
              </div>

              {/* Pattern overlay indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-financial-teal rounded-full mr-2"></div>
                  <span className="text-xs text-muted-foreground">Support/Resistance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-financial-coral rounded-full mr-2"></div>
                  <span className="text-xs text-muted-foreground">Pattern Boundary</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-financial-cyan rounded-full mr-2"></div>
                  <span className="text-xs text-muted-foreground">Entry/Exit Points</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Recently Detected Patterns */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Recently Detected Patterns</h2>
          <div className="space-y-4">
            {detectedPatterns.map((detection, index) => (
              <Card key={index} className="glass p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground">{detection.stock}</h3>
                      <p className="text-sm text-muted-foreground">{detection.detected}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{detection.pattern}</p>
                      <p className="text-sm text-muted-foreground">{detection.timeframe} timeframe</p>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <Brain className="w-4 h-4 text-financial-teal mr-2" />
                        <span className="text-sm font-medium text-foreground">{detection.confidence}%</span>
                      </div>
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div
                          className="bg-financial-teal h-1 rounded-full"
                          style={{ width: `${detection.confidence}%` }}
                        />
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        detection.status === "Confirmed"
                          ? "bg-financial-teal/20 text-financial-teal"
                          : "bg-financial-coral/20 text-financial-coral"
                      }`}
                    >
                      {detection.status}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-medium text-financial-teal">{detection.priceTarget}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stop Loss</p>
                      <p className="font-medium text-financial-coral">{detection.stopLoss}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">R:R</p>
                      <p className="font-medium text-foreground">{detection.riskReward}</p>
                    </div>
                    <Button size="sm" className="bg-financial-teal hover:bg-financial-teal/90 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View Setup
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Trade Setup Guide */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Trade Setup Guidelines</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tradeSetups.map((setup, index) => (
              <Card key={index} className="glass p-6">
                <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center">
                  <Target className="w-5 h-5 text-financial-teal mr-2" />
                  {setup.pattern}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Signal:</span>
                    <span className="text-foreground font-medium">{setup.entry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Target:</span>
                    <span className="text-financial-teal font-medium">{setup.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stop Loss:</span>
                    <span className="text-financial-coral font-medium">{setup.stopLoss}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeframe:</span>
                    <span className="text-foreground font-medium">{setup.timeframe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="text-financial-teal font-bold">{setup.success_rate}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">AI Pattern Recognition</h2>
          <Card className="glass p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-teal/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-financial-teal" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Pattern Scanning</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously scans 500+ stocks across multiple timeframes for emerging patterns
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-coral/20 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-financial-coral" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">AI Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models identify and classify patterns with confidence scoring
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-financial-cyan" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Trade Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time notifications with entry points, targets, and risk management levels
                </p>
              </div>
            </div>
          </Card>
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
                  <Lightbulb className="w-4 h-4 text-financial-teal mr-2 mt-0.5 flex-shrink-0" />
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

        {/* Pattern Statistics */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Pattern Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Patterns Detected",
                description: "Total patterns identified across all timeframes this month",
                icon: Activity,
                color: "financial-teal",
                stat: "1,247",
              },
              {
                title: "Success Rate",
                description: "Average success rate of confirmed patterns reaching targets",
                icon: Target,
                color: "financial-coral",
                stat: "78%",
              },
              {
                title: "Average R:R",
                description: "Mean risk-to-reward ratio across all pattern-based trades",
                icon: BarChart3,
                color: "financial-cyan",
                stat: "1:2.4",
              },
            ].map((stat) => (
              <Card key={stat.title} className="glass p-6 hover:scale-105 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}/20 flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-foreground mr-2">{stat.title}</h3>
                  <span className={`text-2xl font-bold text-${stat.color}`}>{stat.stat}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
