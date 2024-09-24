import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getHospitalListApi } from "../utils/constants";

export const getHospitalList = createAsyncThunk("getHospitalList", async (payload) => {
    try {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token"),
            },
        };
        const skip = payload.skip
        const url = `${ApiBaseUrl}${getHospitalListApi}?skip=${skip}&limit=20`;
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const getHospitalListSlice = createSlice({
    name: "getHospitalListReducer",

    initialState: {
        isLoading: false,
        data: null,
    },
    reducers: {
        clearGetHospitalListData: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHospitalList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHospitalList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getHospitalList.rejected, (state) => {
                state.isError = false;
            });
    },
});

export const { clearGetHospitalListData } = getHospitalListSlice.actions;
export default getHospitalListSlice.reducer;