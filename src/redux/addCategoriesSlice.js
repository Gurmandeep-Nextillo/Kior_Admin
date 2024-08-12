import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addCategoryApi, ApiBaseUrl } from "../utils/constants";

export const addCategory = createAsyncThunk("addCategory", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + addCategoryApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const addCategoriesSlice = createSlice({
    name: "addCategoryReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearAddCategoryData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addCategory.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearAddCategoryData } = addCategoriesSlice.actions;
export default addCategoriesSlice.reducer;