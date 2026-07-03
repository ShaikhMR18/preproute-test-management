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

      return rejectWithValue(axiosError.response?.data ?? axiosError.message);
    }
  },
);

export const fetchSubjects = createAsyncThunk(
  "tests/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      return await testApi.fetchSubjects();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(axiosError.response?.data ?? axiosError.message);
    }
  },
);

export const fetchTopics = createAsyncThunk(
  "tests/fetchTopics",
  async (subjectId: string, { rejectWithValue }) => {
    try {
      return await testApi.fetchTopics(subjectId);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(axiosError.response?.data ?? axiosError.message);
    }
  },
);

export const fetchSubTopics = createAsyncThunk(
  "tests/fetchSubTopics",
  async (topicId: string, { rejectWithValue }) => {
    try {
      return await testApi.fetchSubTopics(topicId);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(axiosError.response?.data ?? axiosError.message);
    }
  },
);