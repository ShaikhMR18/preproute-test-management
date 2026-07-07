import { useGetTestById } from "../../hooks/useTest";
import { useEffect } from "react";
import type { TestDetails } from "../r-types";
import {
  ChapterIcon,
  DifficultyIcon,
  EditIcon,
  LeaderBoardIcon,
  QuizIcon,
  TickIcon,
  TimerIcon,
} from "../../assets";
import { useNavigate } from "react-router-dom";
import QuestionSummarySkeleton from "../QuestionSummarySkeleton";

type TestID = {
  testId: string;
  onTestDataLoaded?: (data: TestDetails) => void;
};

const QuestionSummary = ({ testId }: TestID) => {
  const { test, loadTestById, loading } = useGetTestById();
  const navigate = useNavigate();
  const isCompleted =
    (test?.questions?.length ?? 0) >= (test?.total_questions ?? 0);

  useEffect(() => {
    if (testId) {
      loadTestById(testId);
    }
  }, [testId, loadTestById]);

  return (
    <>
      {isCompleted && (
        <div className="mb-4 flex items-center gap-4">
          <h1 className="text-xl font-semibold text-[#2E3446]">Test Created</h1>

          <div className="flex items-center gap-2 rounded-md border border-[#2ECC71] bg-[#F6FFF9] px-3 py-1">
            <TickIcon width={14} height={14} />
            <span className="text-xs font-medium text-[#27AE60]">
              All {test?.total_questions} Questions done
            </span>
          </div>
        </div>
      )}
      {loading ? (
        <QuestionSummarySkeleton />
      ) : (
        <div className="rounded-lg border border-[#E8ECF4] bg-white p-5">
          {/* Top */}
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#1B1B5F] px-3 py-1 text-xs font-medium text-white">
                {test?.type}
              </span>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ChapterIcon width={24} height={24} />
                  <h2 className="text-xl font-semibold text-[#1F2937]">
                    {test?.name}
                  </h2>
                </div>

                <span className="rounded-md bg-[#2AB7A9] px-3 py-1 text-sm font-medium text-white flex gap-1">
                  <DifficultyIcon height={18} width={18} />
                  {test?.difficulty}
                </span>
              </div>
            </div>

            <button
              className="rounded-md p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/tests/${testId}/edit`)}
            >
              <EditIcon width={20} height={20} />
            </button>
          </div>

          {/* Details */}
          <div className="mt-8 flex justify-between">
            {/* Left */}
            <div className="space-y-5">
              <div className="flex">
                <span className="w-20 text-sm text-[#6B7180]">Subject</span>

                <span className="mr-2">:</span>

                <span className="font-medium text-[#374151]">
                  {test?.subject}
                </span>
              </div>

              <div className="flex items-start">
                <span className="w-20 text-sm text-[#6B7180]">Topic</span>

                <span className="mr-2">:</span>

                <div className="flex flex-wrap gap-2">
                  {test?.topics?.map((topic) => (
                    <span className="rounded-full border border-[#FFC84D] px-3 py-1 text-xs text-[#E6A100]">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start">
                <span className="w-20 text-sm text-[#6B7180]">Sub Topic</span>

                <span className="mr-2">:</span>

                <div>
                  {test?.sub_topics?.map((subTopic) => (
                    <span className="rounded-full border border-[#FFC84D] px-3 py-1 text-xs text-[#E6A100]">
                      {subTopic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Bottom */}
            <div className="flex items-end">
              <div className="flex items-center rounded-lg border border-[#E8ECF4] bg-white px-5 py-2">
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <TimerIcon height={20} width={20} />

                  <span>{test?.total_time}</span>
                </div>

                <div className="mx-5 h-5 w-px bg-[#E5E7EB]" />

                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <QuizIcon width={20} height={20} />

                  <span>{test?.total_questions}</span>
                </div>

                <div className="mx-5 h-5 w-px bg-[#E5E7EB]" />

                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <LeaderBoardIcon width={20} height={20} />

                  <span>{test?.total_marks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionSummary;
