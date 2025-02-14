import { create } from "zustand";
import { userServiceApi } from "../services/api";

const useUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  status: null,
  message: null,
  error: null,
  isModalDeleteOpen: false,
  isModalOpen: false,
  mode: "create",
  getAllUser: async () => {
    set({ isLoading: true });
    try {
      const response = await userServiceApi.getAllUser();
      set({ users: response.data });
    } catch (error) {
      console.error("Error fetching Users:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  createUser: async (users) => {
    set({ isLoading: true });
    try {
      const response = await userServiceApi.createUser(users);
      set({ status: response.status, message: response.message });
      await get().getAllUser();
    } catch (error) {
      console.error("Error creating Users:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateUserById: async (id, users) => {
    set({ isLoading: true });
    try {
      const response = await userServiceApi.updateUserById(id, users);
      console.log(response);
      set({ status: response.status, message: response.message });
      await get().getAllUser();
    } catch (error) {
      console.error("Error updating Users:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUserById: async (id, users) => {
    set({ isLoading: true });
    try {
      const response = await userServiceApi.deleteUserById(id, users);
      console.log(response.status);
      set({ status: response.status, message: response.message });
      await get().getAllUser();
    } catch (error) {
      console.error("Error deleting Users:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
