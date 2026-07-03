import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { TopicsState } from "../../types";
import { fetchTopics } from "../actions/test.action";

const initialState: TopicsState = {
  topics: [],
  loading: false,
  error: null,
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const getTopics = (state: RootState) => state.topics.topics;

export const getTopicsLoading = (state: RootState) => state.topics.loading;

export const getTopicsError = (state: RootState) => state.topics.error;

export default topicSlice.reducer;
