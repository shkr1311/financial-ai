from django.shortcuts import render
import yfinance as yf
from django.http import JsonResponse
import json
import re

def index(request):
  return render(request, 'index.html')

def stock_data(request, ticker):
  try:
    stock = yf.Ticker(ticker)
    hist = stock.history(period="5d")
    data_json = hist.reset_index().to_dict(orient="records")
    return JsonResponse(data_json, safe=False)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)

def live_price(request, ticker):
  try:
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d", interval="1m")
    if not data.empty:
      latest = data.tail(1).reset_index().to_dict(orient="records")[0]
      return JsonResponse(latest, safe=False)
    else:
      return JsonResponse({"error": "No data found"}, status=404)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)

def format_stock_summary(stock_data):
  try:
      open_price = stock_data["Open"]
      close_price = stock_data["Close"]

      change = close_price - open_price
      percent = (change / open_price) * 100 if open_price else 0

      return {
        "value": f"{close_price:,.2f}", 
        "change": f"{change:+.2f}", 
        "percent": f"{percent:+.2f}%", 
        "positive": change >= 0
      }
  except KeyError:
    return {"error": "Missing required stock fields"}


def multiple_live_prices(request, tickers):
  try:
    ticker_list = [t.strip().upper() for t in tickers.split(",")]
    data = yf.download(ticker_list, period="1d", interval="1m", group_by="ticker")

    results = {}
    for ticker in ticker_list:
      try:
        latest = data[ticker].dropna().tail(1).reset_index().to_dict(orient="records")[0]
        results[ticker] = {
          "raw": latest,
          "summary": format_stock_summary(latest)
        }
      except Exception:
        results[ticker] = {"error": "No data found"}
    return JsonResponse(results, safe=False)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)

def extract_founding_year(text):
  match = re.search(r'\b(?:founded|incorporated)\s+in\s+(\d{4})', text, re.IGNORECASE)
  if match:
    return int(match.group(1))
  else:
    return None

def stock_summary(request, ticker):
  try:
    stock = yf.Ticker(ticker)
    info = stock.info  # metadata dict
    
    # Direct values (if available)
    market_cap = info.get("marketCap")
    sector = info.get("sector")
    pe_ratio = info.get("trailingPE")
    book_value = info.get("bookValue")
    div_yield = info.get("dividendYield")
    eps = info.get("epsTrailingTwelveMonths") or info.get("earningsPerShare")
    employees = info.get("fullTimeEmployees")
    founded = info.get("founded") or info.get("longBusinessSummary")  # fallback, not always available
      
    # Derived values from quarterly statements
    revenue_ttm, net_income_ttm = None, None
    try:
      inc = stock.quarterly_income_stmt
      if not inc.empty:
        if "Total Revenue" in inc.index:
          revenue_ttm = inc.loc["Total Revenue"].iloc[:4].sum()
        if "Net Income" in inc.index:
          net_income_ttm = inc.loc["Net Income"].iloc[:4].sum()
    except Exception:
      pass

    # Build JSON response
    result = {
      "MarketCap": market_cap,
      "RevenueTTM": revenue_ttm,
      "Sector": sector,
      "NetIncomeTTM": net_income_ttm,
      "EPS": eps,
      "Employees": employees,
      "PERatio": pe_ratio,
      "BookValue": book_value,
      "Founded": founded,
      "DividendYield": div_yield,
    }

    return JsonResponse(result, safe=False)
  
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)

def financial_ratios(request, ticker):
  try:
    stock = yf.Ticker(ticker)

    income = stock.financials
    balance = stock.balance_sheet
    cashflow = stock.cashflow

    if income.empty or balance.empty:
      return JsonResponse({"error": "Financial data not available"}, status=404)

    def safe_get(df, key, default=0):
        try:
            val = df.loc[key].iloc[0]
            return float(val) if val is not None else default
        except Exception:
            return default

    # Income statement
    revenue = safe_get(income, "Total Revenue")
    gross_profit = safe_get(income, "Gross Profit")
    operating_income = safe_get(income, "Operating Income")
    net_income = safe_get(income, "Net Income")
    ebit = safe_get(income, "EBIT")
    interest_expense = safe_get(income, "Interest Expense")

    # Balance sheet
    total_assets = safe_get(balance, "Total Assets")
    total_equity = safe_get(balance, "Total Stockholder Equity")
    total_debt = safe_get(balance, "Total Debt")
    current_assets = safe_get(balance, "Total Current Assets")
    current_liabilities = safe_get(balance, "Total Current Liabilities")
    inventory = safe_get(balance, "Inventory")
    cash = safe_get(balance, "Cash")
    intangibles = safe_get(balance, "Goodwill")

    # --- Profitability ---
    gross_margin = (gross_profit / revenue * 100) if revenue else None
    operating_margin = (operating_income / revenue * 100) if revenue else None
    net_margin = (net_income / revenue * 100) if revenue else None
    roe = (net_income / total_equity * 100) if total_equity else None
    roa = (net_income / total_assets * 100) if total_assets else None

    # --- Liquidity ---
    current_ratio = (current_assets / current_liabilities) if current_liabilities else None
    quick_ratio = ((current_assets - inventory) / current_liabilities) if current_liabilities else None
    cash_ratio = (cash / current_liabilities) if current_liabilities else None
    working_capital = (current_assets - current_liabilities) if current_assets and current_liabilities else None

    # --- Leverage ---
    debt_to_equity = (total_debt / total_equity) if total_equity else None
    interest_coverage = (ebit / abs(interest_expense)) if ebit and interest_expense else None
    asset_coverage = ((total_assets - intangibles - current_liabilities) / total_debt) if total_assets and total_debt else None

    result = {
      "Profitability": {
        "GrossProfitMargin": f"{gross_margin:.2f}%" if gross_margin else None,
        "OperatingMargin": f"{operating_margin:.2f}%" if operating_margin else None,
        "NetProfitMargin": f"{net_margin:.2f}%" if net_margin else None,
        "ReturnOnEquity": f"{roe:.2f}%" if roe else None,
        "ReturnOnAssets": f"{roa:.2f}%" if roa else None,
      },
      "Liquidity": {
        "CurrentRatio": round(current_ratio, 2) if current_ratio else None,
        "QuickRatio": round(quick_ratio, 2) if quick_ratio else None,
        "CashRatio": round(cash_ratio, 2) if cash_ratio else None,
        "WorkingCapital": working_capital,
      },
      "Leverage": {
        "DebtToEquity": round(debt_to_equity, 2) if debt_to_equity else None,
        "InterestCoverage": f"{interest_coverage:.2f}x" if interest_coverage else None,
        "AssetCoverage": round(asset_coverage, 2) if asset_coverage else None,
      }
    }

    return JsonResponse(result, safe=False)

  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)

def financial_history(request, ticker):
  try:
    stock = yf.Ticker(ticker)

    # Get financials & balance sheet (annual)
    income = stock.financials
    balance = stock.balance_sheet
    shares_out = stock.info.get("sharesOutstanding")

    if income.empty or balance.empty:
      return JsonResponse({"error": "Financial data not available"}, status=404)

    data = []
    for year in income.columns[:5]:  # Last 5 years (if available)
        try:
          revenue = income.loc["Total Revenue"].get(year)
        except KeyError:
          revenue = None

        try:
          net_income = income.loc["Net Income"].get(year)
        except KeyError:
          net_income = None

        try:
          equity = balance.loc["Total Stockholder Equity"].get(year)
        except KeyError:
          equity = None

        # EPS = Net Income / Shares Outstanding (approximation)
        eps = net_income / shares_out if net_income and shares_out else None

        # ROE = Net Income / Equity
        roe = net_income / equity if net_income and equity else None

        data.append({
          "Year": year.year if hasattr(year, "year") else str(year),
          "Revenue": revenue,
          "NetIncome": net_income,
          "EPS": eps,
          "ROE": roe
        })

    return JsonResponse(data, safe=False)

  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)

