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
