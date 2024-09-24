import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getTestListApi } from "../utils/constants";

export const getTestList = createAsyncThunk("getTestList", async (payload) => {
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
            const url = `${ApiBaseUrl}${getTestListApi}?skip=${skip}&limit=20`;
            return (await axios.get(url, config)).data;
        } else {
            const url = `${ApiBaseUrl}${getTestListApi}`;
            return (await axios.get(url, config)).data;
        }

    } catch (error) {
        throw error.response.data;
    }
});

const getTestListSlice = createSlice({
    name: "getTestListReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetTestListData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTestList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTestList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getTestList.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetTestListData } = getTestListSlice.actions;
export default getTestListSlice.reducer;