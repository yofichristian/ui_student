import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../slice/authslice.jsx";
import {menuSlice} from "../slice/menuslice.jsx";

export const store = configureStore({
    reducer: {
        // calculator: calculatorSlice.reducer,
        auth: authSlice.reducer,
        menu: menuSlice.reducer,
        // upload: uploadSlice.reducer,
        // helper: helperSlice.reducer,
    }
});

export default store;

