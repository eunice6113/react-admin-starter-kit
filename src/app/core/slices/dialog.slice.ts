import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
    visible: false,
};

const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        showDialog: (state, { payload }) => {
            state.visible = payload;
            console.log('state =>', state, 'payload =>', payload )
        },
    },
});

// export the actions
export const { showDialog } = dialogSlice.actions;

// export the selector (".items" being same as in slices/index.js's "items: something")
// export const dialogSelector = (state: RootState) => state.dialog;

// export the default reducer
export default dialogSlice.reducer;

