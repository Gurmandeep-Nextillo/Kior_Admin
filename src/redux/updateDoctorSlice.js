import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updateDoctorApi } from "../utils/constants";

export const updateDoctor = createAsyncThunk("updateDoctor", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + updateDoctorApi;
        const response = await axios.put(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const updateDoctorSlice = createSlice({
    name: "updateDoctorReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearUpdateDoctorData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateDoctor.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearUpdateDoctorData } = updateDoctorSlice.actions;
export default updateDoctorSlice.reducer;