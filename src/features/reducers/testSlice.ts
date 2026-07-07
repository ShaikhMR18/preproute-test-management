import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { fetchTests } from "../actions/test.action";
import type { Test, TestState } from "../../types";

const initialState: TestState = {
  tests: [] as Test[],
  loading: false,
  error: null,
};

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const getTests = (state: RootState) => state.tests.tests;
export const getTestsLoading = (state: RootState) => state.tests.loading;
export const getTestsError = (state: RootState) => state.tests.error;

export default testSlice.reducer;
