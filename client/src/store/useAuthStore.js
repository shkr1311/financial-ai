import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { showErrorToast, showSuccessToast } from '@/components/ToastComponent';

const useAuthStore = create((set) => ({
  authUser: null,
  tickers: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isCheckingAuth: true,

  // ✅ check current logged-in user
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({
        authUser: res.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({
        authUser: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ sign in
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/sign-in', {
        email,
        password,
      });

      set({
        authUser: response.data.user,
        isAuthenticated: true,
        loading: false,
      });

      showSuccessToast({message: response.data.message || 'Logged in successfully!'})
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';

      set({
        loading: false,
        error: message,
        isAuthenticated: false,
      });

      showErrorToast({message: 'Error logging in!', description: message})
      return { success: false, error: message };
    }
  },

  // ✅ sign up
  signUp: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/sign-up', userData);

      set({
        authUser: response.data.user,
        isAuthenticated: true,
        loading: false,
      });

      showSuccessToast({message: response.data.message || 'User registered successfully!'})
      return { success: true, message: response.data.message };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Signup failed. Please check your details.';

      set({
        loading: false,
        error: message,
        isAuthenticated: false,
      });

      showErrorToast({message: 'Error signing up!', description: message})
      return { success: false, error: message };
    }
  },

  updateTicker: async (tickers) => {
    try {
      const response = await axiosInstance.post('/auth/update-ticker', {
        tickers,
      });

      set((state) => ({
        authUser: {
          ...state.authUser,
          tickers: response.data.tickers,
        },
      }));

      return { success: true, tickers: response.data.tickers };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed while updating tickers!';

      set({
        loading: false,
        error: message,
      });

      showErrorToast({message: 'Error updating tickers!', description: message})
      return { success: false, error: message };
    }
  },

  getTickers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/auth/get-tickers');
      set((state) => ({
        tickers: response.data.tickers,
        authUser: state.authUser
          ? { ...state.authUser }
          : state.authUser,
      }));
      return { success: true, tickers: response.data.tickers };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed while fetching tickers!';
      set({ error: message });
      showErrorToast({message: 'Error fetching tickers!', description: message})
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');

      set({
        authUser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });

      showSuccessToast({message: 'Logged out successfully!'})
    } catch (error) {
      const message = error?.response?.data?.message || 'Failed to log out!'
      showErrorToast({message: 'Error logging out!', description: message})
      console.log('ERROR: ', error);
    }
  },
}));

export default useAuthStore;
