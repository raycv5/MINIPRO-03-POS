import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
   name: "category",
   initialState: {
      value: [],
   },
   reducers: {
      categoryData: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { categoryData } = categorySlice.actions;
export default categorySlice.reducer;
