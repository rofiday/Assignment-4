import { create } from "zustand";
import { login, logout } from "../services/api";

const useAuthStore = create((set) => ({
  isLoading: false,
  status: null,
  message: null,
  error: null,
  token: null,
  isAuthenticated: false,
  username: null,
  roleName: null,
  checkUserLogin: () => {
    if (localStorage.getItem("isAuthenticated")) {
      console.log("authenticated");
      set({ isAuthenticated: true });
      set({ username: localStorage.getItem("username") });
      set({ roleName: localStorage.getItem("roleName") });
    }
  },
  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await login(data);
      set({
        status: response.status,
        message: response.message,
        token: response.data,
      });
    } catch (error) {
      console.error("Error Login:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async (data) => {
    set({ isLoading: true });
    try {
      const response = await logout(data);
      console.log(response);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
}));

export default useAuthStore;
