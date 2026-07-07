import type { CreateTestPayload } from "../components/r-types";
import type { CreateQuestionsPayload } from "../types";
import api from "./axios";
import ENDPOINTS from "./endpoints";

export const fetchTests = async () => {
  const response = await api.get(ENDPOINTS.TESTS);
  return response.data.data;
};

export const fetchSubjects = async () => {
  const response = await api.get(ENDPOINTS.SUBJECTS);
  return response.data.data;
};

export const fetchTopics = async (subjectId: string) => {
  const response = await api.get(`${ENDPOINTS.TOPICS}/${subjectId}`);
  return response.data.data;
};

export const fetchSubTopics = async (topicId: string) => {
  const response = await api.get(`${ENDPOINTS.SUBTOPICS}/${topicId}`);
  return response.data.data;
};

export const CreateTest = async (testData: CreateTestPayload) => {
  const response = await api.post(ENDPOINTS.CREATE_TEST, testData);
  return response.data;
};

export const fetchTest = async (testId: string) => {
  const response = await api.get(`${ENDPOINTS.GET_TEST}/${testId}`);
  return response.data.data;
};

export const CreateBulkQuestions = async (
  createQuestions: CreateQuestionsPayload,
) => {
  const response = await api.post(ENDPOINTS.CREATE_QUESTIONS, createQuestions);
  return response.data;
};
