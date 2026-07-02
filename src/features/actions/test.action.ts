import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import * as testApi from "../../api/test.api";

export const fetchTests = createAsyncThunk(
  "tests/fetchTests",
  async (_, { rejectWithValue }) => {
    try {
      return await testApi.fetchTests();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data ?? axiosError.message
      );
    }
  }
);