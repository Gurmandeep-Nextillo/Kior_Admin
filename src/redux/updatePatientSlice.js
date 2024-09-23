import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updatePatientApi } from "../utils/constants";

export const updatePatient = createAsyncThunk("updatePatient", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + updatePatientApi;
        console.log("url ==>", url, payload)
        const response = await axios.put(url, payload, config);
        console.log("response.data ==>", response.data)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const updatePatientSlice = createSlice({
    name: "updatePatientReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearUpdatePatientData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePatient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updatePatient.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearUpdatePatientData } = updatePatientSlice.actions;
export default updatePatientSlice.reducer;