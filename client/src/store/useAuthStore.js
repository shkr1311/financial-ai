import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
  authUser: null,
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

      toast.success(response.data.message || 'Logged in successfully!');
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';

      set({
        loading: false,
        error: message,
        isAuthenticated: false,
      });

      toast.error(message);
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

      toast.success(response.data.message || 'User registered successfully!');
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

      toast.error(message);
      return { success: false, error: message };
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

      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error logging out!');
      console.log('ERROR: ', error);
    }
  },
}));

export default useAuthStore;
