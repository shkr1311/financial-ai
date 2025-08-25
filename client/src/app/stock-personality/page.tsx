"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  TrendingUp,
  Brain,
  Filter,
  Star,
  Zap,
  Shield,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Activity,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function StockPersonalityTags() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [hoveredStock, setHoveredStock] = useState<string | null>(null)

  const personalityTypes = [
    {
      name: "Steady Performer",
      description: "Consistent growth with low volatility",
      color: "financial-teal",
      icon: Shield,
    },
    {
      name: "Hot & Risky",
      description: "High potential returns with increased volatility",
      color: "financial-coral",
      icon: Zap,
    },
    {
      name: "Sleeper",
      description: "Undervalued stocks with hidden potential",
      color: "financial-cyan",
      icon: Target,
    },
  ]

  const stockData = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      price: "₹2,847.50",
      change: "+1.2%",
      positive: true,
      personality: "Steady Performer",
      confidence: 85,
      reasoning: "Consistent revenue growth of 12% YoY with low volatility patterns",
      volume: "High",
      marketCap: "₹19.2L Cr",
    },
    {
      symbol: "ZOMATO",
      name: "Zomato Ltd",
      price: "₹156.80",
      change: "+8.4%",
      positive: true,
      personality: "Hot & Risky",
      confidence: 78,
      reasoning: "High growth potential but significant price swings in recent months",
      volume: "Very High",
      marketCap: "₹1.4L Cr",
    },
    {
      symbol: "DIXON",
      name: "Dixon Technologies",
      price: "₹4,234.20",
      change: "+2.1%",
      positive: true,
      personality: "Sleeper",
      confidence: 72,
      reasoning: "Strong fundamentals but trading below intrinsic value estimates",
      volume: "Medium",
      marketCap: "₹28K Cr",
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: "₹3,654.80",
      change: "-0.5%",
      positive: false,
      personality: "Steady Performer",
      confidence: 92,
      reasoning: "Stable earnings with predictable business model and strong moat",
      volume: "High",
      marketCap: "₹13.3L Cr",
    },
    {
      symbol: "PAYTM",
      name: "One97 Communications",
      price: "₹425.60",
      change: "-3.2%",
      positive: false,
      personality: "Hot & Risky",
      confidence: 65,
      reasoning: "Volatile fintech sector with regulatory uncertainties",
      volume: "High",
      marketCap: "₹27K Cr",
    },
    {
      symbol: "CAMS",
      name: "Computer Age Management",
      price: "₹2,156.40",
      change: "+0.8%",
      positive: true,
      personality: "Sleeper",
      confidence: 68,
      reasoning: "Niche market leader with steady growth but low analyst coverage",
      volume: "Low",
      marketCap: "₹10K Cr",
    },
  ]

  const benefits = [
    "AI-powered personality analysis using 50+ data points",
    "Real-time confidence scoring based on market behavior",
    "Historical personality tracking and evolution",
    "Integration with portfolio risk assessment",
    "Customizable personality filters and alerts",
  ]

  const drawbacks = [
    "AI predictions are not guaranteed investment advice",
    "Personality tags can change rapidly during market volatility",
    "Limited historical data for newer stocks",
    "Requires understanding of risk tolerance levels",
  ]

  const filteredStocks =
    selectedFilter === "All" ? stockData : stockData.filter((stock) => stock.personality === selectedFilter)

  const getPersonalityColor = (personality: string) => {
    const type = personalityTypes.find((p) => p.name === personality)
    return type?.color || "financial-teal"
  }

  const getPersonalityIcon = (personality: string) => {
    const type = personalityTypes.find((p) => p.name === personality)
    return type?.icon || Shield
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
              <TrendingUp className="w-6 h-6 text-financial-teal" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">Stock Personality Tags</h1>
              <p className="text-muted-foreground">
                AI-powered personality analysis for stocks with confidence scores and behavioral insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Personality Types Legend */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Personality Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalityTypes.map((type) => (
              <Card key={type.name} className="glass p-6 hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-${type.color}/20 flex items-center justify-center mr-3`}>
                    <type.icon className={`w-5 h-5 text-${type.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">{type.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{type.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-2xl text-foreground">Stock Analysis</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-4">Filter by:</span>
              {["All", ...personalityTypes.map((p) => p.name)].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={
                    selectedFilter === filter
                      ? "bg-financial-teal hover:bg-financial-teal/90"
                      : "border-border hover:bg-muted"
                  }
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Stock Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => {
              const PersonalityIcon = getPersonalityIcon(stock.personality)
              const personalityColor = getPersonalityColor(stock.personality)

              return (
                <Card
                  key={stock.symbol}
                  className="glass p-6 hover:scale-105 transition-all duration-300 cursor-pointer relative"
                  onMouseEnter={() => setHoveredStock(stock.symbol)}
                  onMouseLeave={() => setHoveredStock(null)}
                >
                  {/* Stock Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-foreground">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">{stock.price}</p>
                      <p className={`text-sm ${stock.positive ? "text-financial-teal" : "text-financial-coral"}`}>
                        {stock.change}
                      </p>
                    </div>
                  </div>

                  {/* Personality Badge */}
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-8 h-8 rounded-lg bg-${personalityColor}/20 flex items-center justify-center mr-3`}
                    >
                      <PersonalityIcon className={`w-4 h-4 text-${personalityColor}`} />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${personalityColor}/20 text-${personalityColor}`}
                    >
                      {stock.personality}
                    </span>
                  </div>

                  {/* Confidence Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">AI Confidence</span>
                      <span className="text-sm font-medium text-foreground">{stock.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`bg-${personalityColor} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${stock.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Stock Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="text-foreground">{stock.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap:</span>
                      <span className="text-foreground">{stock.marketCap}</span>
                    </div>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredStock === stock.symbol && (
                    <div className="absolute z-10 bottom-full left-0 right-0 mb-2 p-4 bg-background border border-border rounded-lg shadow-lg">
                      <div className="flex items-start mb-2">
                        <Brain className={`w-4 h-4 text-${personalityColor} mr-2 mt-0.5 flex-shrink-0`} />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">AI Reasoning</p>
                          <p className="text-xs text-muted-foreground">{stock.reasoning}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-muted-foreground mr-2">Confidence:</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-muted rounded-full h-1 mr-2">
                                <div
                                  className={`bg-${personalityColor} h-1 rounded-full`}
                                  style={{ width: `${stock.confidence}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-foreground">{stock.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </section>

        {/* Interactive Demo Component */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">How It Works</h2>
          <Card className="glass p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-teal/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-financial-teal" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Data Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes 50+ data points including price patterns, volume, volatility, and market sentiment
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-coral/20 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-financial-coral" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models identify behavioral patterns and assign personality traits
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-financial-cyan" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Confidence Score</h3>
                <p className="text-sm text-muted-foreground">
                  Each prediction comes with a confidence score based on data quality and model certainty
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

        {/* Related Examples */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Personality Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Steady Performers",
                description: "85% of steady performers maintain their personality for 6+ months",
                icon: Activity,
                color: "financial-teal",
                stat: "85%",
              },
              {
                title: "Hot & Risky Stocks",
                description: "Average volatility 3x higher than market with 40% higher returns",
                icon: Zap,
                color: "financial-coral",
                stat: "3x",
              },
              {
                title: "Sleeper Discoveries",
                description: "72% of identified sleepers outperform market within 12 months",
                icon: Target,
                color: "financial-cyan",
                stat: "72%",
              },
            ].map((insight) => (
              <Card key={insight.title} className="glass p-6 hover:scale-105 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-${insight.color}/20 flex items-center justify-center mb-4`}>
                  <insight.icon className={`w-5 h-5 text-${insight.color}`} />
                </div>
                <div className="flex items-center mb-2">
                  <h3 className="font-medium text-foreground mr-2">{insight.title}</h3>
                  <span className={`text-2xl font-bold text-${insight.color}`}>{insight.stat}</span>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
