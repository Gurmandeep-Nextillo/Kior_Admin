//loginSlice 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, loginApi, } from "../utils/constants";

export const loginUser = createAsyncThunk("loginUser", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        };
        const url = ApiBaseUrl + loginApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const loginSlice = createSlice({
    name: "loginReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearLoginData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;