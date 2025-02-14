import { create } from "zustand";
import { customerServiceApi } from "../services/api";

const useCustomerStore = create((set, get) => ({
  customers: [],
  isLoading: false,
  status: null,
  message: null,
  error: null,
  isModalDeleteOpen: false,
  isModalOpen: false,
  mode: "create",
  getAllCustomer: async () => {
    set({ isLoading: true });
    try {
      const response = await customerServiceApi.getAllCustomer();
      console.log(response);
      set({ customers: response.data });
    } catch (error) {
      console.error("Error fetching customers:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  createCustomer: async (customers) => {
    set({ isLoading: true });
    try {
      const response = await customerServiceApi.createCustomer(customers);
      set({ status: response.status, message: response.message });
      await get().getAllCustomer();
    } catch (error) {
      console.error("Error creating customer:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateCustomerById: async (id, customers) => {
    set({ isLoading: true });
    try {
      const response = await customerServiceApi.updateCustomerById(
        id,
        customers
      );
      set({ status: response.status, message: response.message });
      await get().getAllCustomer();
    } catch (error) {
      console.error("Error updating customer:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCustomerById: async (id, customers) => {
    set({ isLoading: true });
    try {
      const response = await customerServiceApi.deleteCustomerById(
        id,
        customers
      );
      set({ status: response.status, message: response.message });
      await get().getAllCustomer();
    } catch (error) {
      console.error("Error deleting customer:", error);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCustomerStore;
