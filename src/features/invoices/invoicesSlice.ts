import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Invoice } from "@/types/invoice";

interface InvoicesState {
  items: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  items: [],
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.items.push(...action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.items.findIndex(
        (inv: Invoice) => inv.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    syncProductUpdate: (
      state,
      action: PayloadAction<{ oldName: string; newName: string }>
    ) => {
      state.items.forEach((invoice) => {
        if (invoice.productName === action.payload.oldName) {
          invoice.productName = action.payload.newName;
        }
      });
    },
    syncCustomerUpdate: (
      state,
      action: PayloadAction<{ oldName: string; newName: string }>
    ) => {
      state.items.forEach((invoice) => {
        if (invoice.customerName === action.payload.oldName) {
          invoice.customerName = action.payload.newName;
        }
      });
    },
  },
});

export const {
  addInvoices,
  updateInvoice,
  setLoading,
  setError,
  syncProductUpdate,
  syncCustomerUpdate,
} = invoicesSlice.actions;
export default invoicesSlice.reducer;
