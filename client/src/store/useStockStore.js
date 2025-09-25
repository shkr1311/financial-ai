// stores/useStockStore.js
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { stockApi } from '@/lib/axios';
import { showErrorToast } from '@/components/ToastComponent';

const useStockStore = create((set) => ({
  stockData: null,
  ratiosData: null,
  news: null,
  popularMarketIndices: null,
  loading: false,
  error: null,
  historicalData: [],

  // ✅ Fetch live stock data
  fetchLiveStockData: async (ticker) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`live/${ticker}/`);
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch stock data.';
      set({ loading: false, error: message });
      showErrorToast({
        message: 'Error fetching stock data!',
        message: message,
      });
    }
  },

  // ✅ Fetch 5-day historical data
  fetchRecentData: async (ticker) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`${ticker}/`);
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch historical data.';
      set({ loading: false, error: message });
      showErrorToast({
        message: 'Error fetching historical data!',
        description: message,
      });
    }
  },

  fetchMultipleLiveStocks: async (tickers) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(
        `multiple-live/${tickers.join(',')}/`
      );
      set({ stockData: response.data, loading: false });

      return { data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch multiple stock data.';
      set({ loading: false, error: message });
      showErrorToast({
        message: 'Error fetching multiple stock data!',
        description: message,
      });
    }
  },

  fetchMultipleLiveStocksOthers: async () => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`multiple-live-others/`);
      set({ popularMarketIndices: response.data, loading: false });

      return { data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch multiple stock data.';
      set({ loading: false, error: message });
      showErrorToast({
        message: 'Error fetching multiple stocks!',
        description: message,
      });
    }
  },

  fetchStockSummaryOverview: async (ticker) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`summary/${ticker}/`);
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        'Failed to fetch the overview of stock summary.';
      set({ loading: false, error: message });
      showErrorToast({
        message: 'Error fetching overview!',
        description: message,
      });
    }
  },

  // ✅ Fetch Financial Ratios
  fetchFinancialRatios: async (ticker) => {
    set({ loading: true, error: null });
    console.log('ticker', ticker);
    try {
      const response = await stockApi.get(`ratios/${ticker}/`);
      console.log('response', response.data);

      // ✅ Expecting API response with categories: profitability, liquidity, leverage
      set({
        ratiosData: response.data,
        loading: false,
      });

      return {
        stockData: response.data,
        message: 'Fetching financial ratios successful!',
      };
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch the financial ratios.';
      set({ loading: false, error: message, ratiosData: null });
      showErrorToast({
        message: 'Error fetching financial ratios!',
        description: message,
      });
    }
  },

  fetchHistoricalData: async (ticker) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`history/${ticker}/`);
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch historical data.';
      set({ loading: false, error: message });
      showErrorToast({
        message: 'Error fetching historical data!',
        description: message,
      });
    }
  },

  fetchNews: async (tickers) => {
    try {
      set({ loading: false, error: null });
      const response = await stockApi.get(
        `multiple-news/${tickers.join(',')}/`
      );
      console.log('here');
      set({ news: response.data, loading: false });
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch news.';
      set({ loading: false, error: message });
      showErrorToast({ message: 'Error fetching news!', description: message });
    }
  },

  // ✅ Reset stock data
  resetStockData: () => {
    set({
      stockData: null,
      ratiosData: null, // ✅ Reset ratios too
      error: null,
      loading: false,
    });
  },
}));

export default useStockStore;
