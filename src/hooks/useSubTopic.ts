import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../features/store";
import { fetchSubTopics } from "../features/actions/test.action";
import {
  getSubTopics,
  getSubTopicsError,
  getSubTopicsLoading,
} from "../features/reducers/subTopicSlice";

export const useSubTopics = () => {
  const dispatch = useDispatch<AppDispatch>();

  const subTopics = useSelector(getSubTopics);
  const loading = useSelector(getSubTopicsLoading);
  const error = useSelector(getSubTopicsError);

  const loadSubTopics = useCallback(
    (topicId: string) => {
      dispatch(fetchSubTopics(topicId));
    },
    [dispatch],
  );
  return {
    subTopics,
    loading,
    error,
    loadSubTopics,
  };
};
