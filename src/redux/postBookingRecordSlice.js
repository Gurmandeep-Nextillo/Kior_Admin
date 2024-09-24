import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, postBookingRecordApi } from "../utils/constants";

export const postBookingRecord = createAsyncThunk("postBookingRecord", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + postBookingRecordApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const postBookingRecordSlice = createSlice({
    name: "postBookingRecordSReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearPostBookingRecordData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postBookingRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postBookingRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(postBookingRecord.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearPostBookingRecordData } = postBookingRecordSlice.actions;
export default postBookingRecordSlice.reducer;