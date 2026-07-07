import { UpdateTest } from "../api/test.api";
import type { CreateTestPayload } from "../components/r-types";

export const useUpdateTest = () => {
  const updateTest = async (id: string, payload: CreateTestPayload) => {
    return await UpdateTest(id, payload);
  };

  return {
    updateTest,
  };
};
