import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updateCategoryApi } from "../utils/constants";

export const updateCategory = createAsyncThunk("updateCategory", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + updateCategoryApi;
        const response = await axios.put(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const updateCategorySlice = createSlice({
    name: "updateCategoryReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearUpdateCategoryData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearUpdateCategoryData } = updateCategorySlice.actions;
export default updateCategorySlice.reducer;