import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching data
export const uploadFile = createAsyncThunk('uploadFile', async (image) => {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
    }
    const formData = new FormData();
    formData.append('myfile', image);

    try {
        const url = "https://dev-api-nanny.virtualittechnology.com/v1/upload"
        const response = await axios.post(url, formData, { headers });
        return response.data;
    } catch (error) {
        console.log("Upload Image Error ===> ", error.message)
        throw error;
    }
});

const uploadFileSlice = createSlice({
    name: 'uploadFileReducer',
    initialState: {
        data: null,
        loading: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                console.log("Upload Image Error ===> ", action.payload)
                state.loading = 'idle';
                state.error = action.error.message;
            });
    },
});

export default uploadFileSlice.reducer;