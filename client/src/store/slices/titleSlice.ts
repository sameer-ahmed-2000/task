import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";


type Status = "idle" | "loading" | "succeeded" | "failed";

interface Title {
    uuid: string;
    title: string;
    subject: string;
    description: string | null;
}

interface TitleState {
    titles: Title[];
    status: Status;
    error: string | null;
}

const initialState: TitleState = {
    titles: [],
    status: "idle",
    error: null,
};



export const fetchTitles = createAsyncThunk("titles/fetchTitles", async () => {
    const token = Cookies.get("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await axios.get("http://localhost:8000/api/v1/title/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const addTitle = createAsyncThunk("titles/addTitle", async (newTitle: Omit<Title, "uuid">) => {
    const token = Cookies.get("token");
    if (!token) {
        throw new Error("No token found");
    }
    const response = await axios.post("http://localhost:8000/api/v1/title/", newTitle, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const deleteTitle = createAsyncThunk("titles/deleteTitle", async (uuid: string) => {
    const token = Cookies.get("token");
    if (!token) {
        throw new Error("No token found");
    }
    await axios.delete(`http://localhost:8000/api/v1/title/${uuid}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return uuid;
});

const titleSlice = createSlice({
    name: "titles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTitles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTitles.fulfilled, (state, action: PayloadAction<Title[]>) => {
                state.status = "succeeded";
                state.titles = action.payload;
            })
            .addCase(fetchTitles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? String(action.error.message) : "Failed to fetch titles";
            })
            .addCase(addTitle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addTitle.fulfilled, (state, action: PayloadAction<Title>) => {
                state.status = "succeeded";
                state.titles.push(action.payload);
            })
            .addCase(addTitle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? String(action.error.message) : "Failed to add title";
            })
            .addCase(deleteTitle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTitle.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.titles = state.titles.filter((title) => title.uuid !== action.payload);
            })
            .addCase(deleteTitle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? String(action.error.message) : "Failed to delete title";
            });
    },
});

export default titleSlice.reducer;

export const selectTitles = (state: RootState) => state.titles.titles;
export const selectTitleStatus = (state: RootState) => state.titles.status;
export const selectTitleError = (state: RootState) => state.titles.error;
