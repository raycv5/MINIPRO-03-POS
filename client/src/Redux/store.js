import { configureStore } from '@reduxjs/toolkit'
import AdminSlice from './AdminSlice'
import CashierSlice from './CashierSlice'

export const store = configureStore({
    reducer: {
        admin: AdminSlice,
        cashier: CashierSlice
    }
})