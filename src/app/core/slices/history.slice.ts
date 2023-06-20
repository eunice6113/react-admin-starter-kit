import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
    history: [],
    searchParams: {}
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        storeSearchParam:  (state, { payload }) => {
            state.searchParams = payload
        },
        setHistory: (state, { payload }) => {

            const newLoc = payload
            const newHistory = [...state.history, newLoc];
            state.history = newHistory

            console.log('setHistory state =>', state, 'payload =>', payload )
            // console.log('setHistory state.history =>', state.history )

        },
    },
});

export const { setHistory, storeSearchParam } = historySlice.actions;

export default historySlice.reducer;

