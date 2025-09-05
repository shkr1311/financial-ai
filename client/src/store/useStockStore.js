// stores/useStockStore.js
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { stockApi } from '@/lib/axios';

const useStockStore = create((set) => ({
  stockData: null,
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
      toast.error(message);
    }
  },

  // ✅ Fetch 5-day historical data
  fetchRecentData: async (ticker) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`${ticker}/`); // adjust endpoint if needed
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch historical data.';
      set({ loading: false, error: message });
      toast.error(message);
    }
  },

  fetchMultipleLiveStocks: async (tickers) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(
        `multiple-live/${tickers.join(',')}/`
      );
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch multiple stock data.';
      set({ loading: false, error: message });
      toast.error(message);
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
      toast.error(message);
    }
  },

  fetchFinancialRatios: async (ticker) => {
    set({ loading: true, error: null });

    try {
      const response = await stockApi.get(`ratios/${ticker}/`);
      set({ stockData: response.data, loading: false });
    } catch (error) {
      const message =
        error.response?.data?.error || 'Failed to fetch the financial ratios.';
      set({ loading: false, error: message });
      toast.error(message);
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
      toast.error(message);
    }
  },

  // ✅ Reset stock data
  resetStockData: () => {
    set({
      stockData: null,
      error: null,
      loading: false,
    });
  },
}));

export default useStockStore;
