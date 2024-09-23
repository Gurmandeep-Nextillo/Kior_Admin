import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, addPatientApi } from "../utils/constants";

export const addPatient = createAsyncThunk("addPatient", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + addPatientApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const addPatientSlice = createSlice({
    name: "addPatientReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearAddPatientData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPatient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addPatient.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearAddPatientData } = addPatientSlice.actions;
export default addPatientSlice.reducer;