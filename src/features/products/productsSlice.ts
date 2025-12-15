import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.items.push(...action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (p: Product) => p.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
  },
});

export const { addProducts, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
