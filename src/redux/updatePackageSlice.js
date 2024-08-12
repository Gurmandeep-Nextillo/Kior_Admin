import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updatePackageApi } from "../utils/constants";

export const updatePackage = createAsyncThunk("updatePackage", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + updatePackageApi;
        const response = await axios.put(url, payload, config);
        console.log("Update sucess pac", response.data)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const updatePackageSlice = createSlice({
    name: "updatePackageReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearUpdatePackageData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePackage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePackage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updatePackage.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearUpdatePackageData } = updatePackageSlice.actions;
export default updatePackageSlice.reducer;