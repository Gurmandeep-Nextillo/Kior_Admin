import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getDoctorListApi } from "../utils/constants";

export const getDoctorList = createAsyncThunk("getDoctorList", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const skip = payload.skip
        if (skip != -1) {
            const url = `${ApiBaseUrl}${getDoctorListApi}?skip=${skip}&limit=20`;
            return (await axios.get(url, config)).data;
        } else {
            const url = `${ApiBaseUrl}${getDoctorListApi}`;
            return (await axios.get(url, config)).data;
        }
    } catch (error) {
        throw error.response.data;
    }
});

const getDoctorListSlice = createSlice({
    name: "getDoctorListReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetDoctorListData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDoctorList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoctorList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getDoctorList.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetDoctorListData } = getDoctorListSlice.actions;
export default getDoctorListSlice.reducer;