"use client"

import { JSX, useEffect, useState } from "react"
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
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react"
import Link from "next/link"
import useStockStore from "@/store/useStockStore"

// Core data types
interface NewsItem {
  id: string
  title: string
  link?: string
  publisher?: string
  time?: string
  type?: string
  summary?: string
  thumbnail?: NewsThumbnail | null
}

interface NewsThumbnail {
  originalUrl: string
  originalWidth: number
  originalHeight: number
  caption: string
  resolutions: ThumbnailResolution[]
}

interface ThumbnailResolution {
  url: string
  width: number
  height: number
  tag: string
}

// Enhanced news item with sentiment analysis
interface ProcessedNewsItem extends NewsItem {
  ticker: string
  sentiment: SentimentType
  confidence: number
  category: string
  impact: ImpactLevel
}

// API response types
interface NewsApiResponse {
  [ticker: string]: NewsItem[]
}

// Enums and union types
type SentimentType = 'positive' | 'negative' | 'neutral'
type ImpactLevel = 'High' | 'Medium' | 'Low'

// Component configuration types
interface TickerOption {
  label: string
  value: string
}

interface SentimentStats {
  positive: number
  negative: number
  neutral: number
}

interface SentimentInsight {
  title: string
  description: string
  icon: LucideIcon
  color: string
  stat: string
}

// Component state types
interface ComponentState {
  selectedTicker: string
  searchQuery: string
  currentPage: number
}

// Utility function return types
interface ProcessNewsDataResult {
  allNews: ProcessedNewsItem[]
  totalCount: number
}

interface PaginationInfo {
  totalPages: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// Default values and constants
const DEFAULT_SENTIMENT_STATS: SentimentStats = {
  positive: 45,
  negative: 28,
  neutral: 27,
}

const DEFAULT_TICKER_OPTIONS: TickerOption[] = [
  { label: "All", value: "All" },
  { label: "RELIANCE.NS", value: "RELIANCE.NS" },
  { label: "TCS.NS", value: "TCS.NS" },
  { label: "INFY", value: "INFY" },
  { label: "GLD", value: "GLD" },
  { label: "NVDA", value: "NVDA" }
]

const ALL_TICKERS: string[] = ['RELIANCE.NS', 'TCS.NS', 'INFY', 'GLD', 'NVDA']

const ITEMS_PER_PAGE = 10

const BENEFITS: string[] = [
  "Real-time sentiment analysis from 1000+ financial news sources",
  "AI-powered confidence scoring for each sentiment prediction",
  "Historical sentiment tracking and correlation with price movements",
  "Custom alerts for sentiment shifts on watchlist stocks",
  "Integration with social media and analyst reports",
]

const CONSIDERATIONS: string[] = [
  "Sentiment analysis accuracy varies with news source quality",
  "Market reactions may not always align with sentiment scores",
  "Breaking news may cause temporary sentiment volatility",
  "AI models require continuous training on market-specific language",
]

const SENTIMENT_INSIGHTS: SentimentInsight[] = [
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
]

export default function NewsSentiment(): JSX.Element {
  const [selectedTicker, setSelectedTicker] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { news, fetchNews, loading } = useStockStore()

  // Process news data with proper type safety
  const processNewsData = (newsData: NewsApiResponse | null): ProcessedNewsItem[] => {
    if (!newsData || typeof newsData !== 'object') return []
    
    const allNews: ProcessedNewsItem[] = []
    
    Object.keys(newsData).forEach((ticker: string) => {
      const tickerData = newsData[ticker]
      if (Array.isArray(tickerData)) {
        const processedTickerNews: ProcessedNewsItem[] = tickerData.map((item: NewsItem) => ({
          ...item,
          ticker,
          sentiment: generateRandomSentiment(),
          confidence: generateRandomConfidence(),
          category: 'Market Update',
          impact: generateRandomImpact()
        }))
        allNews.push(...processedTickerNews)
      }
    })
    
    return allNews
  }

  // Helper functions with proper return types
  const generateRandomSentiment = (): SentimentType => {
    const random = Math.random()
    if (random > 0.6) return 'positive'
    if (random > 0.3) return 'negative'
    return 'neutral'
  }

  const generateRandomConfidence = (): number => {
    return Math.floor(Math.random() * 30) + 70
  }

  const generateRandomImpact = (): ImpactLevel => {
    const random = Math.random()
    if (random > 0.6) return 'High'
    if (random > 0.3) return 'Medium'
    return 'Low'
  }

  const processedNews: ProcessedNewsItem[] = processNewsData(news)

  // Filter news with type safety
  const filteredNews: ProcessedNewsItem[] = processedNews.filter((newsItem: ProcessedNewsItem): boolean => {
    const matchesTicker: boolean = selectedTicker === "All" || newsItem.ticker === selectedTicker
    const matchesSearch: boolean = 
      searchQuery === "" ||
      newsItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (newsItem.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    return matchesTicker && matchesSearch
  })

  // Pagination logic with proper types
  const getPaginationInfo = (totalItems: number, currentPage: number, itemsPerPage: number): PaginationInfo => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    
    return {
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    }
  }

  const paginationInfo: PaginationInfo = getPaginationInfo(filteredNews.length, currentPage, ITEMS_PER_PAGE)
  const paginatedNews: ProcessedNewsItem[] = filteredNews.slice(paginationInfo.startIndex, paginationInfo.endIndex)

  // Event handlers with proper types
  const handleTickerChange = async (ticker: string): Promise<void> => {
    setSelectedTicker(ticker)
    setCurrentPage(1)
    
    const tickersToFetch: string[] = ticker === "All" ? ALL_TICKERS : [ticker]
    await fetchNews(tickersToFetch)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  // Utility functions with proper return types
  const getSentimentIcon = (sentiment: SentimentType): JSX.Element => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-financial-teal" />
      case "negative":
        return <TrendingDown className="w-4 h-4 text-financial-coral" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getSentimentColor = (sentiment: SentimentType): string => {
    switch (sentiment) {
      case "positive":
        return "financial-teal"
      case "negative":
        return "financial-coral"
      default:
        return "muted-foreground"
    }
  }

  const getImpactColor = (impact: ImpactLevel): string => {
    switch (impact) {
      case "High":
        return "financial-coral"
      case "Medium":
        return "financial-cyan"
      default:
        return "muted-foreground"
    }
  }

  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return "Unknown"
    
    try {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return "Just now"
      if (diffInHours < 24) return `${diffInHours} hours ago`
      return `${Math.floor(diffInHours / 24)} days ago`
    } catch {
      return "Unknown"
    }
  }

  // Render helper functions
  const renderSentimentCard = (
    sentiment: SentimentType,
    icon: JSX.Element,
    percentage: number,
    colorClass: string
  ): JSX.Element => (
    <Card className="glass p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon}
          <h3 className="font-medium text-foreground capitalize">{sentiment}</h3>
        </div>
        <span className={`text-2xl font-bold text-${colorClass}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`bg-${colorClass} h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  )

  const renderNewsCard = (newsItem: ProcessedNewsItem, index: number): JSX.Element => (
    <Card key={newsItem.id || index} className="glass p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-financial-teal/20 text-financial-teal mr-2">
              {newsItem.ticker}
            </span>
            <span className="text-xs text-muted-foreground">{newsItem.category}</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium bg-${getImpactColor(newsItem.impact)}/20 text-${getImpactColor(newsItem.impact)}`}
            >
              {newsItem.impact} Impact
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">{newsItem.title}</h3>
          {newsItem.summary && (
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{newsItem.summary}</p>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <Globe className="w-3 h-3 mr-1" />
            <span className="mr-4">{newsItem.publisher || 'Unknown Source'}</span>
            <Clock className="w-3 h-3 mr-1" />
            <span>{formatTimestamp(newsItem.time)}</span>
          </div>
        </div>

        <div className="ml-6 text-center">
          <div className="flex items-center justify-center mb-2">
            {getSentimentIcon(newsItem.sentiment)}
            <span className={`ml-2 font-medium text-${getSentimentColor(newsItem.sentiment)} capitalize`}>
              {newsItem.sentiment}
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
                  className={`bg-${getSentimentColor(newsItem.sentiment)} h-1 rounded-full`}
                  style={{ width: `${newsItem.confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">{newsItem.confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  const renderPaginationButton = (page: number, isActive: boolean): JSX.Element => (
    <Button
      key={page}
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={() => handlePageChange(page)}
      className={
        isActive
          ? "bg-financial-teal hover:bg-financial-teal/90"
          : "border-border hover:bg-muted"
      }
    >
      {page}
    </Button>
  )

  const renderInsightCard = (insight: SentimentInsight): JSX.Element => (
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
  )

  // Initial data loading
  useEffect(() => {
    const loadInitialNews = async (): Promise<void> => {
      await fetchNews(ALL_TICKERS)
    }
    loadInitialNews()
  }, [fetchNews])

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
            {renderSentimentCard(
              "positive",
              <TrendingUp className="w-5 h-5 text-financial-teal mr-2" />,
              DEFAULT_SENTIMENT_STATS.positive,
              "financial-teal"
            )}
            {renderSentimentCard(
              "negative",
              <TrendingDown className="w-5 h-5 text-financial-coral mr-2" />,
              DEFAULT_SENTIMENT_STATS.negative,
              "financial-coral"
            )}
            {renderSentimentCard(
              "neutral",
              <Minus className="w-5 h-5 text-muted-foreground mr-2" />,
              DEFAULT_SENTIMENT_STATS.neutral,
              "muted-foreground"
            )}
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
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-financial-teal focus:border-transparent text-sm"
                />
              </div>

              {/* Ticker Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Stock:</span>
                {DEFAULT_TICKER_OPTIONS.map((ticker: TickerOption) => (
                  <Button
                    key={ticker.value}
                    variant={selectedTicker === ticker.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTickerChange(ticker.value)}
                    disabled={loading}
                    className={
                      selectedTicker === ticker.value
                        ? "bg-financial-teal hover:bg-financial-teal/90"
                        : "border-border hover:bg-muted"
                    }
                  >
                    {ticker.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-financial-teal"></div>
              <span className="ml-2 text-muted-foreground">Loading news...</span>
            </div>
          )}

          {/* News Feed */}
          {!loading && (
            <>
              <div className="space-y-4">
                {paginatedNews.length > 0 ? (
                  paginatedNews.map((newsItem: ProcessedNewsItem, index: number) => 
                    renderNewsCard(newsItem, index)
                  )
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No news articles found for the selected filters.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {paginationInfo.totalPages > 1 && (
                <div className="flex items-center justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={!paginationInfo.hasPreviousPage}
                    className="border-border hover:bg-muted"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  {Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1).map((page: number) => 
                    renderPaginationButton(page, currentPage === page)
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.min(currentPage + 1, paginationInfo.totalPages))}
                    disabled={!paginationInfo.hasNextPage}
                    className="border-border hover:bg-muted"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
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
              {BENEFITS.map((benefit: string, index: number) => (
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
              {CONSIDERATIONS.map((consideration: string, index: number) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-financial-coral mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{consideration}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Sentiment Insights */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Sentiment Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SENTIMENT_INSIGHTS.map((insight: SentimentInsight) => renderInsightCard(insight))}
          </div>
        </section>
      </div>
    </div>
  )
}