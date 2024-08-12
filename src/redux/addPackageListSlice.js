import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addPackageApi, ApiBaseUrl } from "../utils/constants";

export const addPackage = createAsyncThunk("addPackage", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + addPackageApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const addPackageListSlice = createSlice({
    name: "addPackageReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearAddPackageData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPackage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPackage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addPackage.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearAddPackageData } = addPackageListSlice.actions;
export default addPackageListSlice.reducer;