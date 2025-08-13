"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Newspaper,
  Filter,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Brain,
  BarChart3,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function NewsSentiment() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [selectedTicker, setSelectedTicker] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const timeRanges = ["1h", "24h", "7d", "30d"]
  const tickers = ["All", "RELIANCE", "TCS", "INFY", "HDFC", "NIFTY"]

  const newsData = [
    {
      id: 1,
      title: "Reliance Industries Reports Strong Q3 Earnings, Beats Estimates",
      summary:
        "RIL posted a net profit of ₹18,549 crore for Q3, surpassing analyst expectations driven by robust petrochemical margins.",
      source: "Economic Times",
      timestamp: "2 hours ago",
      sentiment: "positive",
      confidence: 92,
      ticker: "RELIANCE",
      category: "Earnings",
      impact: "High",
    },
    {
      id: 2,
      title: "IT Sector Faces Headwinds as Global Tech Spending Slows",
      summary:
        "Major IT companies including TCS and Infosys may see reduced growth as enterprise clients cut technology budgets.",
      source: "Business Standard",
      timestamp: "4 hours ago",
      sentiment: "negative",
      confidence: 78,
      ticker: "TCS",
      category: "Sector Analysis",
      impact: "Medium",
    },
    {
      id: 3,
      title: "HDFC Bank Maintains Stable Outlook Despite NIM Pressure",
      summary:
        "India's largest private bank continues to show resilient asset quality metrics while managing margin compression.",
      source: "Mint",
      timestamp: "6 hours ago",
      sentiment: "neutral",
      confidence: 85,
      ticker: "HDFC",
      category: "Banking",
      impact: "Medium",
    },
    {
      id: 4,
      title: "Nifty 50 Reaches New All-Time High on FII Inflows",
      summary:
        "Indian benchmark index surges past 22,200 mark as foreign institutional investors return to emerging markets.",
      source: "Reuters",
      timestamp: "8 hours ago",
      sentiment: "positive",
      confidence: 88,
      ticker: "NIFTY",
      category: "Market Update",
      impact: "High",
    },
    {
      id: 5,
      title: "Infosys Announces Strategic Partnership with Microsoft",
      summary:
        "The collaboration aims to accelerate cloud adoption and digital transformation for enterprise clients globally.",
      source: "Financial Express",
      timestamp: "12 hours ago",
      sentiment: "positive",
      confidence: 81,
      ticker: "INFY",
      category: "Corporate Action",
      impact: "Medium",
    },
    {
      id: 6,
      title: "Oil Prices Volatility May Impact Refining Margins",
      summary:
        "Crude oil price fluctuations could affect profitability of major refiners including Reliance Industries.",
      source: "Bloomberg",
      timestamp: "1 day ago",
      sentiment: "negative",
      confidence: 73,
      ticker: "RELIANCE",
      category: "Commodities",
      impact: "Low",
    },
  ]

  const sentimentStats = {
    positive: 45,
    negative: 28,
    neutral: 27,
  }

  const benefits = [
    "Real-time sentiment analysis from 1000+ financial news sources",
    "AI-powered confidence scoring for each sentiment prediction",
    "Historical sentiment tracking and correlation with price movements",
    "Custom alerts for sentiment shifts on watchlist stocks",
    "Integration with social media and analyst reports",
  ]

  const drawbacks = [
    "Sentiment analysis accuracy varies with news source quality",
    "Market reactions may not always align with sentiment scores",
    "Breaking news may cause temporary sentiment volatility",
    "AI models require continuous training on market-specific language",
  ]

  const filteredNews = newsData.filter((news) => {
    const matchesTicker = selectedTicker === "All" || news.ticker === selectedTicker
    const matchesSearch =
      searchQuery === "" ||
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTicker && matchesSearch
  })

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-financial-teal" />
      case "negative":
        return <TrendingDown className="w-4 h-4 text-financial-coral" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "financial-teal"
      case "negative":
        return "financial-coral"
      default:
        return "muted-foreground"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "financial-coral"
      case "Medium":
        return "financial-cyan"
      default:
        return "muted-foreground"
    }
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
              <Newspaper className="w-6 h-6 text-financial-teal" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">News & Sentiment</h1>
              <p className="text-muted-foreground">
                AI-generated sentiment analysis from financial news sources with real-time insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sentiment Overview */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Market Sentiment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-financial-teal mr-2" />
                  <h3 className="font-medium text-foreground">Positive</h3>
                </div>
                <span className="text-2xl font-bold text-financial-teal">{sentimentStats.positive}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-financial-teal h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${sentimentStats.positive}%` }}
                />
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <TrendingDown className="w-5 h-5 text-financial-coral mr-2" />
                  <h3 className="font-medium text-foreground">Negative</h3>
                </div>
                <span className="text-2xl font-bold text-financial-coral">{sentimentStats.negative}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-financial-coral h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${sentimentStats.negative}%` }}
                />
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Minus className="w-5 h-5 text-muted-foreground mr-2" />
                  <h3 className="font-medium text-foreground">Neutral</h3>
                </div>
                <span className="text-2xl font-bold text-muted-foreground">{sentimentStats.neutral}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-muted-foreground h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${sentimentStats.neutral}%` }}
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Filters and Search */}
        <section>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-2xl text-foreground">Latest News Feed</h2>

            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-financial-teal focus:border-transparent text-sm"
                />
              </div>

              {/* Time Range Filter */}
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time:</span>
                {timeRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                    className={
                      selectedTimeRange === range
                        ? "bg-financial-teal hover:bg-financial-teal/90"
                        : "border-border hover:bg-muted"
                    }
                  >
                    {range}
                  </Button>
                ))}
              </div>

              {/* Ticker Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Stock:</span>
                {tickers.map((ticker) => (
                  <Button
                    key={ticker}
                    variant={selectedTicker === ticker ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTicker(ticker)}
                    className={
                      selectedTicker === ticker
                        ? "bg-financial-teal hover:bg-financial-teal/90"
                        : "border-border hover:bg-muted"
                    }
                  >
                    {ticker}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* News Feed */}
          <div className="space-y-4">
            {filteredNews.map((news) => (
              <Card key={news.id} className="glass p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-${news.ticker === "NIFTY" ? "financial-cyan" : "financial-teal"}/20 text-${news.ticker === "NIFTY" ? "financial-cyan" : "financial-teal"} mr-2`}
                      >
                        {news.ticker}
                      </span>
                      <span className="text-xs text-muted-foreground">{news.category}</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium bg-${getImpactColor(news.impact)}/20 text-${getImpactColor(news.impact)}`}
                      >
                        {news.impact} Impact
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{news.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{news.summary}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Globe className="w-3 h-3 mr-1" />
                      <span className="mr-4">{news.source}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{news.timestamp}</span>
                    </div>
                  </div>

                  <div className="ml-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      {getSentimentIcon(news.sentiment)}
                      <span className={`ml-2 font-medium text-${getSentimentColor(news.sentiment)} capitalize`}>
                        {news.sentiment}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center mb-1">
                        <Brain className="w-3 h-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">Confidence</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 bg-muted rounded-full h-1 mr-2">
                          <div
                            className={`bg-${getSentimentColor(news.sentiment)} h-1 rounded-full`}
                            style={{ width: `${news.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-foreground">{news.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">AI Sentiment Analysis</h2>
          <Card className="glass p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-teal/20 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-financial-teal" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Data Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously monitors 1000+ financial news sources, social media, and analyst reports
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-coral/20 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-financial-coral" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Natural language processing models analyze context, tone, and market implications
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-financial-cyan/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-financial-cyan" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">Sentiment Scoring</h3>
                <p className="text-sm text-muted-foreground">
                  Generates sentiment scores with confidence levels and market impact predictions
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

        {/* Sentiment Insights */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Sentiment Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Sentiment Accuracy",
                description: "AI models achieve 87% accuracy in predicting short-term price movements",
                icon: Activity,
                color: "financial-teal",
                stat: "87%",
              },
              {
                title: "News Volume",
                description: "Processing 10,000+ financial news articles daily across global markets",
                icon: Globe,
                color: "financial-coral",
                stat: "10K+",
              },
              {
                title: "Response Time",
                description: "Sentiment analysis completed within 30 seconds of news publication",
                icon: Clock,
                color: "financial-cyan",
                stat: "30s",
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
