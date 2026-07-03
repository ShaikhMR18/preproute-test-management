import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../features/store";
import {
  getSubjects,
  getSubjectsLoading,
  getSubjectsError,
} from "../features/reducers/subjectSlice";
import { fetchSubjects } from "../features/actions/test.action";

export const useSubjects = () => {
  const dispatch = useDispatch<AppDispatch>();

  const subjects = useSelector(getSubjects);
  const loading = useSelector(getSubjectsLoading);
  const error = useSelector(getSubjectsError);

  const loadSubjects = useCallback(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  return {
    subjects,
    loading,
    error,
    loadSubjects,
  };
};
