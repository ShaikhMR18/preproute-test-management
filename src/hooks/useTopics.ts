import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../features/store";
import { fetchTopics } from "../features/actions/test.action";
import {
  getTopics,
  getTopicsError,
  getTopicsLoading,
} from "../features/reducers/topicSlice";

export const useTopics = () => {
  const dispatch = useDispatch<AppDispatch>();

  const topics = useSelector(getTopics);
  const loading = useSelector(getTopicsLoading);
  const error = useSelector(getTopicsError);

  const loadTopics = useCallback(
    (subjectId: string) => {
      dispatch(fetchTopics(subjectId));
    },
    [dispatch],
  );
  return {
    topics,
    loading,
    error,
    loadTopics,
  };
};
