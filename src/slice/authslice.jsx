import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username: localStorage.getItem("username"),
    accessToken: localStorage.getItem("accessToken"),
    expiredDate: localStorage.getItem("expiredDate"),
    xrequestid : localStorage.getItem("xrequestid"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        saveToken (state, action)   {
            // console.log("debug 6 save token payload " + JSON.stringify(action.payload));
            // const {username, password, token, } = action.payload;
            // state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            state.expiredDate = action.payload.expiredDate;
            state.xrequestid = action.payload.xrequestid;

            localStorage.setItem("accessToken", state.accessToken);
            localStorage.setItem("expiredDate", state.expiredDate);
            // localStorage.setItem("expiredDate", "2026-09-19 10:45:00");
            localStorage.setItem("xrequestId", state.xrequestid);
        },
        // refreshToken (state, action)   {
            // state.accessToken = action.payload.accessToken;
            // state.refreshToken = action.payload.refreshToken;
            // localStorage.setItem("accessToken", state.accessToken);
            // localStorage.setItem("refreshToken", state.refreshToken);
        // },
        // validateToken(state, action)   {
        //     // console.log("dispatch new token", action.payload);
        //
        //     state.accessToken = action.payload.accessToken;
        //     state.refreshToken = action.payload.refreshToken;
        //     state.exp = action.payload.exp;
        //
        //     const date2 = new Date(0);
        //     date2.setUTCSeconds(parseInt(state.exp));
        //     // console.log("new token will expired on ", state.exp, date2);
        //
        //     localStorage.setItem("accessToken", state.accessToken);
        //     localStorage.setItem("refreshToken", state.refreshToken);
        //     localStorage.setItem("exp", state.exp);
        //     localStorage.setItem("expiredtime", date2);
        // },
        // clearToken(state, action) {
        clearToken(state) {
            localStorage.clear();
            clearAllCookies();
            return initialState;
        },
    },
});

export const {saveToken, clearToken} = authSlice.actions;

export default authSlice.reducer;

