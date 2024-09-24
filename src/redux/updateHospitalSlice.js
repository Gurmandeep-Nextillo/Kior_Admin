import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updateHospitalApi } from "../utils/constants";

export const updateHospital = createAsyncThunk("updateHospital", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const url = ApiBaseUrl + updateHospitalApi;
        console.log("url ==>", url, payload)
        const response = await axios.put(url, payload, config);
        console.log("response.data ==>", response.data)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const updateHospitalSlice = createSlice({
    name: "updateHospitalReducer",
    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearUpdateHospitalData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateHospital.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateHospital.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateHospital.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearUpdateHospitalData } = updateHospitalSlice.actions;
export default updateHospitalSlice.reducer;