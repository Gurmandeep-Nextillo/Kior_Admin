import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updateTestApi } from "../utils/constants";

export const updateTest = createAsyncThunk("updateTest", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + updateTestApi;
        const response = await axios.put(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const updateTestSlice = createSlice({
    name: "updateTestReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearUpdateTestData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateTest.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearUpdateTestData } = updateTestSlice.actions;
export default updateTestSlice.reducer;