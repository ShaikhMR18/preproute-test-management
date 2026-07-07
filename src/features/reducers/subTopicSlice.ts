import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { fetchSubTopics } from "../actions/test.action";
import type { SubTopicsState } from "../../types";

const initialState: SubTopicsState = {
  subTopics: [],
  loading: false,
  error: null,
};

const subTopicSlice = createSlice({
  name: "subTopics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubTopics.fulfilled, (state, action) => {
        state.loading = false;

        const merged = [...state.subTopics, ...action.payload];

        state.subTopics = Array.from(
          new Map(merged.map((item) => [item.id, item])).values(),
        );
      })
      .addCase(fetchSubTopics.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const getSubTopics = (state: RootState) => state.subTopics.subTopics;
export const getSubTopicsLoading = (state: RootState) =>
  state.subTopics.loading;
export const getSubTopicsError = (state: RootState) => state.subTopics.error;

export default subTopicSlice.reducer;
