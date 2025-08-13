"use client"

import { useState } from "react"
import {
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  Activity,
  ArrowLeft,
  Search,
  Download,
  RefreshCw,
} from "lucide-react"

const riskLevels = [
  {
    level: "Conservative",
    range: "0-25",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/30",
  },
  {
    level: "Moderate",
    range: "26-50",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-400/30",
  },
  {
    level: "Aggressive",
    range: "51-75",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-400/30",
  },
  {
    level: "High Risk",
    range: "76-100",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-400/30",
  },
]

const portfolioRisks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    riskScore: 32,
    volatility: "12.4%",
    beta: 1.21,
    maxDrawdown: "-8.2%",
    sharpeRatio: 1.45,
    trend: "up",
    recommendation: "Hold",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    riskScore: 78,
    volatility: "45.6%",
    beta: 2.14,
    maxDrawdown: "-23.1%",
    sharpeRatio: 0.89,
    trend: "down",
    recommendation: "Reduce",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    riskScore: 28,
    volatility: "18.3%",
    beta: 0.95,
    maxDrawdown: "-12.4%",
    sharpeRatio: 1.67,
    trend: "up",
    recommendation: "Buy",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    riskScore: 65,
    volatility: "38.2%",
    beta: 1.89,
    maxDrawdown: "-19.7%",
    sharpeRatio: 1.23,
    trend: "up",
    recommendation: "Hold",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    riskScore: 45,
    volatility: "28.7%",
    beta: 1.33,
    maxDrawdown: "-15.6%",
    sharpeRatio: 1.12,
    trend: "up",
    recommendation: "Buy",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    riskScore: 38,
    volatility: "22.1%",
    beta: 1.08,
    maxDrawdown: "-11.9%",
    sharpeRatio: 1.34,
    trend: "up",
    recommendation: "Hold",
  },
]

const riskFactors = [
  {
    factor: "Market Volatility",
    impact: "High",
    description: "Current VIX levels indicate elevated market uncertainty",
  },
  {
    factor: "Interest Rate Risk",
    impact: "Medium",
    description: "Fed policy changes may affect bond and equity valuations",
  },
  {
    factor: "Sector Concentration",
    impact: "Medium",
    description: "Tech sector overweight increases correlation risk",
  },
  { factor: "Liquidity Risk", impact: "Low", description: "Most positions maintain adequate trading volume" },
  { factor: "Currency Risk", impact: "Low", description: "Limited international exposure reduces FX impact" },
]

export default function RiskMeterPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("All")

  const filteredStocks = portfolioRisks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRiskLevel =
      selectedRiskLevel === "All" ||
      riskLevels.find(
        (level) =>
          stock.riskScore >= Number.parseInt(level.range.split("-")[0]) &&
          stock.riskScore <= Number.parseInt(level.range.split("-")[1]),
      )?.level === selectedRiskLevel
    return matchesSearch && matchesRiskLevel
  })

  const getRiskLevel = (score: number) => {
    return (
      riskLevels.find(
        (level) =>
          score >= Number.parseInt(level.range.split("-")[0]) && score <= Number.parseInt(level.range.split("-")[1]),
      ) || riskLevels[0]
    )
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Buy":
        return "text-green-400 bg-green-500/20"
      case "Hold":
        return "text-yellow-400 bg-yellow-500/20"
      case "Reduce":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-slate-400 bg-slate-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-700/50 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-red-400" />
                  <span>Risk Meter</span>
                </h1>
                <p className="text-slate-400 mt-1">Advanced risk assessment with AI-powered volatility analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="glass-hover px-4 py-2 rounded-lg text-slate-300 border border-slate-600 hover:border-red-400 transition-all flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Portfolio Risk Overview */}
        <div className="glass p-8 rounded-2xl border border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Activity className="w-6 h-6 text-red-400" />
            <span>Portfolio Risk Overview</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${42 * 2.51} 251`}
                    className="text-red-400"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">42</span>
                </div>
              </div>
              <p className="text-slate-300 font-medium">Overall Risk Score</p>
              <p className="text-yellow-400 text-sm">Moderate Risk</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24.3%</div>
              <p className="text-slate-300 font-medium">Portfolio Volatility</p>
              <p className="text-green-400 text-sm">↓ 2.1% vs last month</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1.34</div>
              <p className="text-slate-300 font-medium">Sharpe Ratio</p>
              <p className="text-green-400 text-sm">Above benchmark</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">-12.7%</div>
              <p className="text-slate-300 font-medium">Max Drawdown</p>
              <p className="text-red-400 text-sm">6M period</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {riskLevels.map((level) => (
              <div
                key={level.level}
                className={`${level.bgColor} ${level.borderColor} border rounded-xl p-4 text-center`}
              >
                <div className={`text-lg font-bold ${level.color} mb-1`}>{level.range}</div>
                <div className="text-slate-300 text-sm">{level.level}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis Controls */}
        <div className="glass p-6 rounded-2xl border border-slate-700/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors"
                />
              </div>

              <select
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-colors"
              >
                <option value="All">All Risk Levels</option>
                {riskLevels.map((level) => (
                  <option key={level.level} value={level.level}>
                    {level.level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              {["1W", "1M", "3M", "6M", "1Y"].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeframe === timeframe
                      ? "bg-red-500 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Analysis Table */}
        <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-red-400" />
              <span>Individual Stock Risk Analysis</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-medium">Stock</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Risk Score</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Volatility</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Beta</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Max Drawdown</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Sharpe Ratio</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => {
                  const riskLevel = getRiskLevel(stock.riskScore)
                  return (
                    <tr
                      key={stock.symbol}
                      className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-white">{stock.symbol}</div>
                          <div className="text-sm text-slate-400">{stock.name}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-2 ${riskLevel.bgColor} rounded-full overflow-hidden`}>
                            <div
                              className={`h-full bg-gradient-to-r ${riskLevel.color.replace("text-", "from-")} to-transparent`}
                              style={{ width: `${stock.riskScore}%` }}
                            />
                          </div>
                          <span className={`font-semibold ${riskLevel.color}`}>{stock.riskScore}</span>
                        </div>
                      </td>
                      <td className="p-4 text-white font-medium">{stock.volatility}</td>
                      <td className="p-4 text-white font-medium">{stock.beta}</td>
                      <td className="p-4 text-red-400 font-medium">{stock.maxDrawdown}</td>
                      <td className="p-4 text-white font-medium">{stock.sharpeRatio}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(stock.recommendation)}`}
                        >
                          {stock.recommendation}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="glass p-8 rounded-2xl border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span>Current Risk Factors</span>
          </h3>

          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/30"
              >
                <div className="flex-1">
                  <div className="font-semibold text-white mb-1">{factor.factor}</div>
                  <div className="text-sm text-slate-400">{factor.description}</div>
                </div>
                <div className="ml-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      factor.impact === "High"
                        ? "text-red-400 bg-red-500/20"
                        : factor.impact === "Medium"
                          ? "text-yellow-400 bg-yellow-500/20"
                          : "text-green-400 bg-green-500/20"
                    }`}
                  >
                    {factor.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Considerations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-2xl border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>Benefits</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">Real-time risk assessment with AI-powered analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">Portfolio-level risk aggregation and correlation analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">Customizable risk tolerance and alert thresholds</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">Historical backtesting and scenario analysis</span>
              </li>
            </ul>
          </div>

          <div className="glass p-8 rounded-2xl border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span>Considerations</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">
                  Risk models based on historical data may not predict future events
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">
                  Black swan events and market crashes can exceed model predictions
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">Requires regular model updates and parameter adjustments</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">
                  Should be used alongside fundamental analysis and market research
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
