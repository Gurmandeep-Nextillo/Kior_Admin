//loginSlice 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, categoryApi } from "../utils/constants";

export const category = createAsyncThunk("category", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + categoryApi;
        console.log("payload categories ===>", payload);
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const categoriesTableSlice = createSlice({
    name: "categoriesTableReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearCategoriesTableData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(category.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(category.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(category.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearCategoriesTableData } = categoriesTableSlice.actions;
export default categoriesTableSlice.reducer;