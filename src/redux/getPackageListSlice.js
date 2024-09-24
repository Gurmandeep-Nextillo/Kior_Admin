import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getPackageListApi } from "../utils/constants";

export const getPackageList = createAsyncThunk("getPackageList", async (payload) => {
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
            const url = `${ApiBaseUrl}${getPackageListApi}?skip=${skip}&limit=20`;
            return (await axios.get(url, config)).data;
        } else {
            const url = `${ApiBaseUrl}${getPackageListApi}`;
            return (await axios.get(url, config)).data;
        }

    } catch (error) {
        throw error.response.data;
    }
});

const getPackageListSlice = createSlice({
    name: "getPackageListReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetPackageListData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPackageList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPackageList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getPackageList.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetPackageListData } = getPackageListSlice.actions;
export default getPackageListSlice.reducer;