import { createSlice } from "@reduxjs/toolkit";

export const subCategorySlice = createSlice({
   name: "subCategory",
   initialState: {
      value: [],
   },
   reducers: {
      subCategoryData: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { subCategoryData } = subCategorySlice.actions;
export default subCategorySlice.reducer;
