import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer } from "@/types/customer";

interface CustomersState {
  items: Customer[];
}

const initialState: CustomersState = {
  items: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.items.push(...action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.items.findIndex(
        (c: Customer) => c.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addCustomers, updateCustomer, setCustomers } =
  customersSlice.actions;
export default customersSlice.reducer;
