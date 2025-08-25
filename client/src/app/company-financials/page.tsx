"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Building2,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Calendar,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function CompanyFinancials() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCompany, setSelectedCompany] = useState("RELIANCE")

  const companies = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd" },
    { symbol: "TCS", name: "Tata Consultancy Services" },
    { symbol: "INFY", name: "Infosys Ltd" },
    { symbol: "HDFC", name: "HDFC Bank Ltd" },
  ]

  const overviewData = {
    RELIANCE: {
      marketCap: "₹19.2L Cr",
      revenue: "₹7.92L Cr",
      netIncome: "₹60,705 Cr",
      eps: "₹91.2",
      peRatio: "31.2",
      bookValue: "₹1,456",
      dividendYield: "0.35%",
      sector: "Oil & Gas",
      employees: "236,000",
      founded: "1973",
    },
    TCS: {
      marketCap: "₹13.3L Cr",
      revenue: "₹2.15L Cr",
      netIncome: "₹42,867 Cr",
      eps: "₹115.8",
      peRatio: "31.6",
      bookValue: "₹312",
      dividendYield: "3.2%",
      sector: "Information Technology",
      employees: "614,795",
      founded: "1968",
    },
  }

  const ratiosData = {
    profitability: [
      { name: "Gross Profit Margin", value: "42.5%", trend: "up" },
      { name: "Operating Margin", value: "18.7%", trend: "up" },
      { name: "Net Profit Margin", value: "7.7%", trend: "down" },
      { name: "Return on Equity", value: "12.4%", trend: "up" },
      { name: "Return on Assets", value: "5.8%", trend: "up" },
    ],
    liquidity: [
      { name: "Current Ratio", value: "1.24", trend: "up" },
      { name: "Quick Ratio", value: "0.89", trend: "down" },
      { name: "Cash Ratio", value: "0.34", trend: "up" },
      { name: "Working Capital", value: "₹45,230 Cr", trend: "up" },
    ],
    leverage: [
      { name: "Debt-to-Equity", value: "0.42", trend: "down" },
      { name: "Interest Coverage", value: "8.7x", trend: "up" },
      { name: "Debt Service Coverage", value: "2.1x", trend: "up" },
      { name: "Asset Coverage", value: "1.8x", trend: "up" },
    ],
  }

  const historicalData = [
    { year: "2024", revenue: "₹7.92L", netIncome: "₹60,705", eps: "₹91.2", roe: "12.4%" },
    { year: "2023", revenue: "₹8.74L", netIncome: "₹73,670", eps: "₹110.8", roe: "13.8%" },
    { year: "2022", revenue: "₹7.92L", netIncome: "₹60,705", eps: "₹91.2", roe: "12.4%" },
    { year: "2021", revenue: "₹5.40L", netIncome: "₹49,128", eps: "₹73.8", roe: "9.2%" },
    { year: "2020", revenue: "₹6.23L", netIncome: "₹39,880", eps: "₹60.0", roe: "7.8%" },
  ]

  const benefits = [
    "Comprehensive financial data from verified sources",
    "Real-time updates with quarterly earnings integration",
    "Advanced ratio analysis with peer comparisons",
    "Historical trends spanning 10+ years",
    "Export capabilities for further analysis",
  ]

  const drawbacks = [
    "Data accuracy depends on company reporting quality",
    "Historical data may not predict future performance",
    "Ratios require industry context for proper interpretation",
    "Some metrics may be delayed by reporting cycles",
  ]

  const currentData = overviewData[selectedCompany as keyof typeof overviewData] || overviewData.RELIANCE

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "ratios", label: "Ratios", icon: Calculator },
    { id: "historical", label: "Historical Data", icon: Calendar },
  ]

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
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-financial-teal/20 flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-financial-teal" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-foreground">Company Financials</h1>
                <p className="text-muted-foreground">
                  Comprehensive financial data, ratios, and historical analysis for informed decisions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-financial-teal text-financial-teal bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-financial-coral text-financial-coral bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Company Selector */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Select Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {companies.map((company) => (
              <Card
                key={company.symbol}
                className={`glass p-4 cursor-pointer transition-all duration-300 ${
                  selectedCompany === company.symbol
                    ? "ring-2 ring-financial-teal bg-financial-teal/10"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedCompany(company.symbol)}
              >
                <div className="text-center">
                  <h3 className="font-display font-bold text-lg text-foreground">{company.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{company.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tabs Navigation */}
        <section>
          <div className="flex items-center space-x-1 mb-8 bg-muted/20 p-1 rounded-lg">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 ${
                  activeTab === tab.id
                    ? "bg-financial-teal hover:bg-financial-teal/90 text-white"
                    : "hover:bg-muted text-muted-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <Card className="glass p-8">
                <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                  {selectedCompany} - Company Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                      <p className="font-bold text-xl text-foreground">{currentData.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue (TTM)</p>
                      <p className="font-bold text-xl text-foreground">{currentData.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sector</p>
                      <p className="font-medium text-foreground">{currentData.sector}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Net Income</p>
                      <p className="font-bold text-xl text-financial-teal">{currentData.netIncome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">EPS</p>
                      <p className="font-bold text-xl text-foreground">{currentData.eps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="font-medium text-foreground">{currentData.employees}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">P/E Ratio</p>
                      <p className="font-bold text-xl text-foreground">{currentData.peRatio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Book Value</p>
                      <p className="font-bold text-xl text-foreground">{currentData.bookValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium text-foreground">{currentData.founded}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Dividend Yield</p>
                      <p className="font-bold text-xl text-financial-teal">{currentData.dividendYield}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-financial-teal mr-2" />
                        <span className="text-sm text-muted-foreground">Revenue Growth</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-financial-teal mr-2" />
                        <span className="text-sm text-muted-foreground">Profit Margin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "ratios" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="glass p-6">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 text-financial-teal mr-2" />
                    Profitability Ratios
                  </h3>
                  <div className="space-y-4">
                    {ratiosData.profitability.map((ratio) => (
                      <div key={ratio.name} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{ratio.name}</span>
                        <div className="flex items-center">
                          <span className="font-medium text-foreground mr-2">{ratio.value}</span>
                          {ratio.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-financial-teal" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-financial-coral" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass p-6">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 text-financial-cyan mr-2" />
                    Liquidity Ratios
                  </h3>
                  <div className="space-y-4">
                    {ratiosData.liquidity.map((ratio) => (
                      <div key={ratio.name} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{ratio.name}</span>
                        <div className="flex items-center">
                          <span className="font-medium text-foreground mr-2">{ratio.value}</span>
                          {ratio.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-financial-teal" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-financial-coral" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass p-6">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center">
                    <PieChart className="w-5 h-5 text-financial-coral mr-2" />
                    Leverage Ratios
                  </h3>
                  <div className="space-y-4">
                    {ratiosData.leverage.map((ratio) => (
                      <div key={ratio.name} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{ratio.name}</span>
                        <div className="flex items-center">
                          <span className="font-medium text-foreground mr-2">{ratio.value}</span>
                          {ratio.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-financial-teal" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-financial-coral" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "historical" && (
            <div className="space-y-8">
              <Card className="glass p-8">
                <h3 className="font-display font-semibold text-2xl text-foreground mb-6">5-Year Financial History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Year</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Net Income</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">EPS</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">ROE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalData.map((data, index) => (
                        <tr key={data.year} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-4 px-4 font-medium text-foreground">{data.year}</td>
                          <td className="py-4 px-4 text-right text-foreground">{data.revenue}</td>
                          <td className="py-4 px-4 text-right text-financial-teal">{data.netIncome}</td>
                          <td className="py-4 px-4 text-right text-foreground">{data.eps}</td>
                          <td className="py-4 px-4 text-right text-foreground">{data.roe}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="font-display font-semibold text-xl text-foreground mb-4">Key Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-financial-teal/20 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-financial-teal" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Revenue Growth</h4>
                    <p className="text-sm text-muted-foreground">5-year CAGR of 8.2%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-financial-coral/20 flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-financial-coral" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Margin Expansion</h4>
                    <p className="text-sm text-muted-foreground">Net margin improved 2.1%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-financial-cyan/20 flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-8 h-8 text-financial-cyan" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">ROE Stability</h4>
                    <p className="text-sm text-muted-foreground">Consistent 10%+ returns</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
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
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Financial Analysis Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Peer Comparison",
                description: "Compare financial metrics with industry peers and competitors",
                icon: BarChart3,
                color: "financial-teal",
              },
              {
                title: "Trend Analysis",
                description: "Identify patterns and trends in historical financial performance",
                icon: TrendingUp,
                color: "financial-coral",
              },
              {
                title: "Valuation Models",
                description: "DCF, P/E, and other valuation methodologies for fair value estimation",
                icon: Calculator,
                color: "financial-cyan",
              },
            ].map((tool) => (
              <Card key={tool.title} className="glass p-6 hover:scale-105 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-${tool.color}/20 flex items-center justify-center mb-4`}>
                  <tool.icon className={`w-5 h-5 text-${tool.color}`} />
                </div>
                <h3 className="font-medium text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
