import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { fetchTestById } from "../actions/test.action";
import type { TestDetails } from "../../types";

interface TestDetailsState {
  test: TestDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestDetailsState = {
  test: null,
  loading: false,
  error: null,
};

const getTestSlice = createSlice({
  name: "getTest",
  initialState,
  reducers: {
    clearTest(state) {
      state.test = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload;
      })
      .addCase(fetchTestById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const getTestById = (state: RootState) => state.getTest.test;
export const getTestByIdLoading = (state: RootState) => state.getTest.loading;
export const getTestByIdError = (state: RootState) => state.getTest.error;

export default getTestSlice.reducer;
export const { clearTest } = getTestSlice.actions;