import api from "./axios";
import ENDPOINTS from "./endpoints";

export const fetchTests = async () => {
  const response = await api.get(ENDPOINTS.TESTS);
  return response.data.data;
};
