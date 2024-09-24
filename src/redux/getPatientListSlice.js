import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getPatientListApi, } from "../utils/constants";

export const getPatientList = createAsyncThunk("getPatientList", async (payload) => {
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
            const url = `${ApiBaseUrl}${getPatientListApi}?skip=${skip}&limit=20`;
            return (await axios.get(url, config)).data;
        } else {
            const url = `${ApiBaseUrl}${getPatientListApi}`;
            return (await axios.get(url, config)).data;
        }
    } catch (error) {
        throw error.response.data;
    }
});

const getPatientListSlice = createSlice({
    name: "getPatientListReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetPatientListData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPatientList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPatientList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getPatientList.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetPatientListData } = getPatientListSlice.actions;
export default getPatientListSlice.reducer;