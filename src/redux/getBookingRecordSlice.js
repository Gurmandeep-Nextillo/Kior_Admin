import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getBookingRecordApi, getPatientListApi, } from "../utils/constants";

export const getBookingRecord = createAsyncThunk("getBookingRecord", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + getBookingRecordApi;
        console.log("URL ===>", url)
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const getBookingRecordSlice = createSlice({
    name: "getBookingRecordReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetBookingRecordData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookingRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getBookingRecord.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetBookingRecordData } = getBookingRecordSlice.actions;
export default getBookingRecordSlice.reducer;