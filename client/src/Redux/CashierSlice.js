import { createSlice } from '@reduxjs/toolkit';

const CashierSlice = createSlice({
    name: 'cashier',
    initialState: {
        value: {}
    },
    reducers: {
        setCashierData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCashierData } = CashierSlice.actions;
export default CashierSlice.reducer;