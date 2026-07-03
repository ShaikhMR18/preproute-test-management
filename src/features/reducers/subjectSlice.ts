import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { fetchSubjects } from "../actions/test.action";
import type {  SubjectsState } from "../../types";

const initialState: SubjectsState = {
  subjects: [],
  loading: false,
  error: null,
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export const getSubjects = (state: RootState) => state.subject.subjects;
export const getSubjectsLoading = (state: RootState) => state.subject.loading;
export const getSubjectsError = (state: RootState) => state.subject.error;

export default subjectSlice.reducer;