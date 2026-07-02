import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../features/store";
import { getTests, getTestsError, getTestsLoading } from "../features/reducers/testSlice";
import { fetchTests } from "../features/actions/test.action";



export const useTests = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tests = useSelector(getTests);
  const loading = useSelector(getTestsLoading);
  const error = useSelector(getTestsError);

  const loadTests = useCallback(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return {
    tests,
    loading,
    error,
    loadTests,
  };
};