import { useDispatch, useSelector } from "react-redux";
import { CreateTest } from "../api/test.api";
import type { CreateTestPayload } from "../components/r-types";
import { fetchTestById } from "../features/actions/test.action";
import type { AppDispatch } from "../features/store";
import { useCallback } from "react";
import {
  clearTest,
  getTestById,
  getTestByIdError,
  getTestByIdLoading,
} from "../features/reducers/getTestSlice";

export const useCreateTests = () => {
  const createTest = async (testData: CreateTestPayload) => {
    return await CreateTest(testData);
  };

  return {
    createTest,
  };
};

export const useGetTestById = () => {
  const dispatch = useDispatch<AppDispatch>();

  const test = useSelector(getTestById);
  const loading = useSelector(getTestByIdLoading);
  const error = useSelector(getTestByIdError);

  const loadTestById = useCallback(
    (testId: string) => {
      dispatch(fetchTestById(testId));
    },
    [dispatch],
  );

  const clearSelectedTest = useCallback(() => {
    dispatch(clearTest());
  }, [dispatch]);

  return {
    test,
    loading,
    error,
    loadTestById,
    clearSelectedTest,
  };
};
