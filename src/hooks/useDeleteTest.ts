import { DeleteTest } from "../api/test.api";

export const useDeleteTest = () => {
  const deleteTest = async (testId: string) => {
    return await DeleteTest(testId);
  };

  return {
    deleteTest,
  };
};
