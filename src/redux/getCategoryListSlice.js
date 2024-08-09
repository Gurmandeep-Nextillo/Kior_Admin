//loginSlice 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getCategoryListApi } from "../utils/constants";

export const getCategoryList = createAsyncThunk("getCategoryList", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const skip = payload.skip
        const url = `${ApiBaseUrl}${getCategoryListApi}?skip=${skip}&limit=10`;
        console.log("Url ===>", url)
        const response = await axios.get(url, config);
        console.log("response ===>", response.data)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const getCategoryListSlice = createSlice({
    name: "getCategoryListReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetCategoryListData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoryList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCategoryList.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetCategoryListData } = getCategoryListSlice.actions;
export default getCategoryListSlice.reducer;