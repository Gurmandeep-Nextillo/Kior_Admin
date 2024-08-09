//loginSlice 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, logoutApi, } from "../utils/constants";

export const logout = createAsyncThunk("logout", async () => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + logoutApi;
        const response = await axios.post(url, {}, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const logoutSlice = createSlice({
    name: "logoutReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearlogoutData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(logout.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearlogoutData } = logoutSlice.actions;
export default logoutSlice.reducer;