import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./categorySlice";
import { subCategorySlice } from "./subCategorySlice";

const rootReducer = combineReducers({
   categories: categorySlice.reducer,
   subCategories: subCategorySlice.reducer,
});
export const store = configureStore({
   reducer: rootReducer,
});
