import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addTestApi, ApiBaseUrl } from "../utils/constants";

export const addTest = createAsyncThunk("addTest", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + addTestApi;
        console.log(" payload  add ===>", payload)
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const addTestSlice = createSlice({
    name: "addTestReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearAddTestData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addTest.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearAddTestData } = addTestSlice.actions;
export default addTestSlice.reducer;