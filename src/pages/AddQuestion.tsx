import { useParams } from "react-router-dom";
import QuestionSummary from "../components/questions/QuestionSummary";
import Button from "../components/r-Buttton/Button";
import { useState } from "react";
import QuestionEditor from "../components/questions/QuestionEditor";
import SolutionEditor from "../components/questions/SolutionEditor";
import OptionsSection from "../components/questions/OptionsSection";
import type { CreateQuestionsPayload, Difficulty, OptionItem } from "../types";
import QuestionSettings from "../components/questions/QuestionSettings";
import BottomActionBar from "../components/questions/BottomActionBar";
import { useGetTestById } from "../hooks/useTest";
import { CreateBulkQuestions } from "../api/test.api";
import { showError, showSuccess } from "../utils/toast";
import PublishConfirmation from "../components/PublishConfirmation";
import CSVUploadButton from "../components/questions/CSVUploader";

const AddQuestions = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState("");
  const { test, loadTestById } = useGetTestById();
  const [options, setOptions] = useState<OptionItem[]>([
    { id: 1, text: "", label: "option1" },
    { id: 2, text: "", label: "option2" },
    { id: 3, text: "", label: "option3" },
    { id: 4, text: "", label: "option4" },
  ]);

  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const [solution, setSolution] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>();
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const questionCount = test?.questions?.length ?? 0;

  const showPublishScreen = questionCount >= (test?.total_questions ?? 0);

  const handleOptionChange = (id: number, value: string) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, text: value } : option,
      ),
    );
  };
  const handleDeleteOption = (id: number) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, text: "" } : option,
      ),
    );

    if (correctOption === id) {
      setCorrectOption(null);
    }
  };
  const topicOptions =
    test?.topics?.map((item) => ({
      label: item,
      value: item,
    })) ?? [];

  const subTopicOptions =
    test?.sub_topics?.map((item) => ({
      label: item,
      value: item,
    })) ?? [];

  const resetForm = () => {
    setQuestion("");

    setOptions([
      { id: 1, text: "", label: "option1" },
      { id: 2, text: "", label: "option2" },
      { id: 3, text: "", label: "option3" },
      { id: 4, text: "", label: "option4" },
    ]);

    setCorrectOption(null);
    setSolution("");
    setDifficulty(undefined);
    setTopic("");
    setSubTopic("");
    setMediaUrl("");
  };

  const handleNext = async () => {
    if (!id) return;

    try {
      const payload: CreateQuestionsPayload = {
        questions: [
          {
            type: "mcq",
            question,
            option1: options.find((o) => o.label === "option1")?.text ?? "",
            option2: options.find((o) => o.label === "option2")?.text ?? "",
            option3: options.find((o) => o.label === "option3")?.text ?? "",
            option4: options.find((o) => o.label === "option4")?.text ?? "",
            correct_option: correctOption
              ? (`option${correctOption}` as
                  | "option1"
                  | "option2"
                  | "option3"
                  | "option4")
              : "option1",
            explanation: solution,
            difficulty: difficulty as Difficulty,
            subject: id,
            test_id: test?.id ?? "",
          },
        ],
      };

      const response = await CreateBulkQuestions(payload);

      if (response?.status === "success") {
        showSuccess(response.message);
        await loadTestById(id);
      }
    } catch (error) {
      console.error("Failed to create question:", error);
      showError("Failed to create question. Please try again.");
    } finally {
      resetForm();
    }
  };
  return (
    <div className="flex h-full ">
      <div className="flex-1 p-2">
        <QuestionSummary testId={id ?? ""} />

        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#2E3446]">
            Question{" "}
            <span className="text-[#090909]">
              {test?.questions?.length || 0}
            </span>
            <span className="text-[#99a4e4]">/{test?.total_questions}</span>
          </h2>

          <div className="flex gap-3">
            <Button
              variant="default"
              className="rounded-lg   outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 px-2 py-2"
            >
              + MCQ
            </Button>

            <CSVUploadButton
              subjectId={id ?? ""}
              testId={test?.id ?? ""}
              onSuccess={() => {
                if (id) {
                  loadTestById(id);
                }
              }}
            />
          </div>
        </div>
        {showPublishScreen ? (
          <div className="pb-2">
            <PublishConfirmation
              onCancel={() => console.log("hbhjb")}
              onConfirm={() => {
                console.log("Publish Test");
              }}
            />
          </div>
        ) : (
          <>
            <div className="">
              <QuestionEditor value={question} onChange={setQuestion} />
            </div>
            <div>
              <OptionsSection
                options={options}
                correctOption={correctOption}
                onOptionChange={handleOptionChange}
                onCorrectOptionChange={setCorrectOption}
                onDeleteOption={handleDeleteOption}
              />
            </div>
            <div className="mt-8">
              <SolutionEditor value={solution} onChange={setSolution} />
            </div>
            <div>
              <QuestionSettings
                difficulty={difficulty}
                topic={topic}
                subTopic={subTopic}
                mediaUrl={mediaUrl}
                difficultyOptions={[
                  { label: "Easy", value: "easy" },
                  { label: "Medium", value: "medium" },
                  { label: "Difficult", value: "difficult" },
                ]}
                topicOptions={topicOptions}
                subTopicOptions={subTopicOptions}
                onDifficultyChange={setDifficulty}
                onTopicChange={setTopic}
                onSubTopicChange={setSubTopic}
                onMediaUrlChange={setMediaUrl}
              />
            </div>
            <div>
              <BottomActionBar
                onExit={() => console.log("Exit")}
                onAskToEdit={() => console.log("Ask AI")}
                onNext={handleNext}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddQuestions;
