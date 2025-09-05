from django.shortcuts import render 
import yfinance as yf
from django.http import JsonResponse
import json
import re
import pandas as pd
import numpy as np

def index(request):
    return render(request, 'index.html')


# ================== EXISTING CODE (unchanged) ==================
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


# ================== NEW FUNCTIONS ==================
def heatmap_view(request, tickers):
    """
    Returns correlation heatmap data (not an image, JSON format).
    Frontend can use this to render heatmap with JS.
    """
    try:
        ticker_list = [t.strip().upper() for t in tickers.split(",")]
        df = yf.download(ticker_list, period="6mo")["Adj Close"]

        corr = df.corr().round(2).fillna(0).to_dict()
        return JsonResponse(corr, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


def top_gainers_view(request, tickers):
    """
    Returns top 5 gainers from given tickers.
    """
    try:
        ticker_list = [t.strip().upper() for t in tickers.split(",")]
        df = yf.download(ticker_list, period="5d")["Adj Close"]

        pct_change = df.pct_change().iloc[-1] * 100
        top_gainers = pct_change.sort_values(ascending=False).head(5)

        result = [{"Ticker": t, "Change%": round(chg, 2)} for t, chg in top_gainers.items()]
        return JsonResponse(result, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)



