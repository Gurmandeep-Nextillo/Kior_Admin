//loginSlice 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getTestListApi } from "../utils/constants";

export const getTestList = createAsyncThunk("getTestList", async () => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + getTestListApi;
        const response = await axios.get(url, config);
        return response.data;
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