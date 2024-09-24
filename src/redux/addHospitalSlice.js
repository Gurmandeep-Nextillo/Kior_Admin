import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, addHospitalApi } from "../utils/constants";

export const addHospital = createAsyncThunk("addHospital", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + addHospitalApi;
        const response = await axios.post(url, payload, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const addHospitalSlice = createSlice({
    name: "addHospitalReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearAddHospitalData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addHospital.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addHospital.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addHospital.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearAddHospitalData } = addHospitalSlice.actions;
export default addHospitalSlice.reducer;