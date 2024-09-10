import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getPackageDetailApi } from "../utils/constants";

export const getPackageDetail = createAsyncThunk("getPackageDetail", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + getPackageDetailApi;
        const response = await axios.gey(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const getPackageDetailSlice = createSlice({
    name: "getPackageDetailReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetPackageDetail: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPackageDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPackageDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getPackageDetail.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetPackageDetail } = getPackageDetailSlice.actions;
export default getPackageDetailSlice.reducer;