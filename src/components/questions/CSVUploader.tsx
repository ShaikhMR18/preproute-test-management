import { useRef, useState } from "react";
import Papa from "papaparse";
import Button from "../r-Buttton/Button";
import { DownLoadIcon } from "../../assets";
import { CreateBulkQuestions } from "../../api/test.api";
import { showError, showSuccess } from "../../utils/toast";
import type { CreateQuestionsPayload, Difficulty } from "../../types";

interface CSVUploadButtonProps {
  subjectId: string;
  testId: string;
  onSuccess?: () => void;
}

type CSVRow = {
  type: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: "option1" | "option2" | "option3" | "option4";
  explanation: string;
  difficulty: Difficulty;
};

const CSVUploadButton = ({
  subjectId,
  testId,
  onSuccess,
}: CSVUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,

      complete: async ({ data, errors }) => {
        try {
          if (errors.length) {
            throw new Error(errors[0].message);
          }

          const questions = data.map((row) => ({
            type: row.type,
            subject: subjectId,
            question: row.question?.trim(),
            option1: row.option1?.trim(),
            option2: row.option2?.trim(),
            option3: row.option3?.trim(),
            option4: row.option4?.trim(),
            correct_option: row.correct_option,
            explanation: row.explanation?.trim(),
            difficulty: row.difficulty,
            test_id: testId,
          }));

          const invalidRow = questions.find(
            (q) =>
              !q.question ||
              !q.option1 ||
              !q.option2 ||
              !q.option3 ||
              !q.option4,
          );

          if (invalidRow) {
            throw new Error(
              "CSV contains invalid or empty rows.",
            );
          }

          const payload: CreateQuestionsPayload = {
            questions,
          };

          const response =
            await CreateBulkQuestions(payload);

          if (response.status === "success") {
            showSuccess(response.message);

            onSuccess?.();
          } else {
            showError(
              response.message ??
                "Failed to upload questions.",
            );
          }
        } catch (error) {
          showError(
            error instanceof Error
              ? error.message
              : "CSV upload failed.",
          );
        } finally {
          setUploading(false);

          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
      },
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="default"
        disabled={uploading}
        className="flex gap-1 rounded-lg px-2 py-2"
        onClick={() => inputRef.current?.click()}
      >
        <DownLoadIcon width={20} height={20} />

        {uploading ? "Uploading..." : "CSV"}
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleUpload}
      />
    </>
  );
};

export default CSVUploadButton;