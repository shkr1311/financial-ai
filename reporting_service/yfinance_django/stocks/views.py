import pandas as pd
from django.shortcuts import render
import logging
import yfinance as yf
from django.http import JsonResponse
import re

logger = logging.getLogger(__name__)

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

def multiple_live_prices_others(request):
  try:
    tickers = ['^NSEI', 'USDINR=X', 'TCS.NS', 'GLD', 'NVDA']
    ticker_list = [t.strip().upper() for t in tickers]
    data = yf.download(ticker_list, period="1d", interval="1m", group_by="ticker")
    print(f"Downloaded data: {data}")

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
    info = stock.info  
    
    market_cap = info.get("marketCap")
    sector = info.get("sector")
    pe_ratio = info.get("trailingPE")
    book_value = info.get("bookValue")
    div_yield = info.get("dividendYield")
    eps = info.get("epsTrailingTwelveMonths") or info.get("earningsPerShare")
    employees = info.get("fullTimeEmployees")
    founded = info.get("founded") or info.get("longBusinessSummary") 
      
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

    revenue = safe_get(income, "Total Revenue")
    gross_profit = safe_get(income, "Gross Profit")
    operating_income = safe_get(income, "Operating Income")
    net_income = safe_get(income, "Net Income")
    ebit = safe_get(income, "EBIT")
    interest_expense = safe_get(income, "Interest Expense")

    total_assets = safe_get(balance, "Total Assets")
    total_equity = safe_get(balance, "Total Stockholder Equity")
    total_debt = safe_get(balance, "Total Debt")
    current_assets = safe_get(balance, "Total Current Assets")
    current_liabilities = safe_get(balance, "Total Current Liabilities")
    inventory = safe_get(balance, "Inventory")
    cash = safe_get(balance, "Cash")
    intangibles = safe_get(balance, "Goodwill")

    gross_margin = (gross_profit / revenue * 100) if revenue else None
    operating_margin = (operating_income / revenue * 100) if revenue else None
    net_margin = (net_income / revenue * 100) if revenue else None
    roe = (net_income / total_equity * 100) if total_equity else None
    roa = (net_income / total_assets * 100) if total_assets else None

    current_ratio = (current_assets / current_liabilities) if current_liabilities else None
    quick_ratio = ((current_assets - inventory) / current_liabilities) if current_liabilities else None
    cash_ratio = (cash / current_liabilities) if current_liabilities else None
    working_capital = (current_assets - current_liabilities) if current_assets and current_liabilities else None

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
    
    income = stock.financials
    balance = stock.balance_sheet
    shares_out = stock.info.get("sharesOutstanding")

    if income.empty or balance.empty:
      return JsonResponse({"error": "Financial data not available"}, status=404)

    data = []
    for year in income.columns[:5]: 
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

        eps = net_income / shares_out if net_income and shares_out else None

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

def heatmap_view(request, tickers):
  try:
    logger.info(f"Heatmap request for tickers: {tickers}")
    ticker_list = [t.strip().upper() for t in tickers.split(",")]
    logger.info(f"Processed ticker list: {ticker_list}")
    
    try:
      df = yf.download(ticker_list, period="6mo", progress=False)["Adj Close"]
      logger.info(f"Downloaded data shape: {df.shape}")
    except Exception as download_error:
      logger.error(f"Download error: {str(download_error)}")
      return JsonResponse({"error": f"Failed to download data: {str(download_error)}"}, status=400)

    if df.empty:
      logger.warning("No data found for the given tickers")
      return JsonResponse({"error": "No data found"}, status=404)
      
    if len(ticker_list) == 1:
      return JsonResponse({ticker_list[0]: {ticker_list[0]: 1.0}}, safe=False)
      
    try:
      corr = df.corr().round(2).fillna(0)
      logger.info(f"Correlation matrix shape: {corr.shape}")
          
      corr_dict = {}
      for ticker1 in ticker_list:
        if ticker1 in corr.index:
          corr_dict[ticker1] = {}
          for ticker2 in ticker_list:
            if ticker2 in corr.columns:
              corr_dict[ticker1][ticker2] = float(corr.loc[ticker1, ticker2])
            else:
              corr_dict[ticker1][ticker2] = 0.0
        else:
          corr_dict[ticker1] = {t: 1.0 if t == ticker1 else 0.0 for t in ticker_list}
        
          logger.info(f"Returning correlation data for {len(corr_dict)} tickers")
          return JsonResponse(corr_dict, safe=False)
          
    except Exception as corr_error:
      logger.error(f"Correlation calculation error: {str(corr_error)}")
      return JsonResponse({"error": f"Correlation calculation failed: {str(corr_error)}"}, status=400)
          
  except Exception as e:
    logger.error(f"General error in heatmap_view: {str(e)}")
    return JsonResponse({"error": str(e)}, status=400)


def top_gainers_view(request, tickers):
  try:
    logger.info(f"Top gainers request for tickers: {tickers}")
    ticker_list = [t.strip().upper() for t in tickers.split(",")]
    try:
      df = yf.download(ticker_list, period="5d", progress=False)["Adj Close"]
      logger.info(f"Downloaded data shape for gainers: {df.shape}")
    except Exception as download_error:
      logger.error(f"Download error for gainers: {str(download_error)}")
      return JsonResponse({"error": f"Failed to download data: {str(download_error)}"}, status=400)

    if df.empty:
      return JsonResponse({"error": "No data found"}, status=404)

    try:
      if len(df) < 2:
        return JsonResponse({"error": "Not enough data for calculation"}, status=400)
          
      pct_change = ((df.iloc[-1] - df.iloc[0]) / df.iloc[0] * 100).fillna(0)
      top_gainers = pct_change.sort_values(ascending=False).head(5)

      result = [{"Ticker": str(t), "Change%": float(chg)} for t, chg in top_gainers.items()]
      logger.info(f"Returning {len(result)} top gainers")
      return JsonResponse(result, safe=False)
        
    except Exception as calc_error:
      logger.error(f"Calculation error for gainers: {str(calc_error)}")
      return JsonResponse({"error": f"Calculation failed: {str(calc_error)}"}, status=400)
          
  except Exception as e:
    logger.error(f"General error in top_gainers_view: {str(e)}")
    return JsonResponse({"error": str(e)}, status=400)

def top_losers_view(request, tickers):
  try:
    logger.info(f"Top losers request for tickers: {tickers}")
    ticker_list = [t.strip().upper() for t in tickers.split(",")]
    
    try:
      df = yf.download(ticker_list, period="5d", progress=False)["Adj Close"]
      logger.info(f"Downloaded data shape for losers: {df.shape}")
    except Exception as download_error:
      logger.error(f"Download error for losers: {str(download_error)}")
      return JsonResponse({"error": f"Failed to download data: {str(download_error)}"}, status=400)

    if df.empty:
      return JsonResponse({"error": "No data found"}, status=404)

    try:
      if len(df) < 2:
        return JsonResponse({"error": "Not enough data for calculation"}, status=400)
          
      pct_change = ((df.iloc[-1] - df.iloc[0]) / df.iloc[0] * 100).fillna(0)
      top_losers = pct_change.sort_values(ascending=True).head(5)

      result = [{"Ticker": str(t), "Change%": float(chg)} for t, chg in top_losers.items()]
      logger.info(f"Returning {len(result)} top losers")
      return JsonResponse(result, safe=False)
        
    except Exception as calc_error:
      logger.error(f"Calculation error for losers: {str(calc_error)}")
      return JsonResponse({"error": f"Calculation failed: {str(calc_error)}"}, status=400)
          
  except Exception as e:
    logger.error(f"General error in top_losers_view: {str(e)}")
    return JsonResponse({"error": str(e)}, status=400)

def api_health_check(request):
  return JsonResponse({
    "status": "ok",
    "message": "API is working",
    "timestamp": pd.Timestamp.now().isoformat()
  })

def multiple_stock_news(request, tickers):
  try:
    ticker_list = [t.strip().upper() for t in tickers.split(",")]
    results = {}

    for ticker in ticker_list:
      try:
        stock = yf.Ticker(ticker)
        news_items = stock.news or []
        formatted_news = []

        for n in news_items:
          content = n.get("content")
          if not isinstance(content, dict):
            continue  # skip if content is None or malformed

          formatted_news.append({
            "id": n.get("id", "N/A"),
            "title": content.get("title", "N/A"),
            "link": content.get("link", "N/A"),
            "publisher": content.get("publisher", "N/A"),
            "time": content.get("pubDate", "N/A"),
            "type": content.get("type", "N/A"),
            "thumbnail": content.get("thumbnail", {}),
          })

        results[ticker] = formatted_news if formatted_news else "No news found"

      except Exception as inner_e:
        results[ticker] = {"error": f"Failed to fetch news: {str(inner_e)}"}

    return JsonResponse(results, safe=False)

  except Exception as e:
    return JsonResponse({"error": str(e)}, status=400)
