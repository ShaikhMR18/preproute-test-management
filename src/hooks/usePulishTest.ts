import { PublishTest } from "../api/test.api";

export const usePublishTest = () => {
  const publishTest = async (testId: string) => {
    return await PublishTest(testId);
  };

  return {
    publishTest,
  };
};
