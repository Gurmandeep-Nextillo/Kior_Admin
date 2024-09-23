import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, addDoctorApi } from "../utils/constants";

export const addDoctor = createAsyncThunk("addDoctor", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + addDoctorApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const addDoctorSlice = createSlice({
    name: "addDoctorReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearAddDoctorData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addDoctor.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearAddDoctorData } = addDoctorSlice.actions;
export default addDoctorSlice.reducer;