import type { InputHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];

  multiple?: boolean;

  value: string | string[];

  onChange: (value: string | string[]) => void;

  className?: string;

  error?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: "row" | "column";
  className?: string;
}
export interface SubTopic {
  id: string;
  name: string;
}

export interface CreateTestPayload {
  name: string;
  type: "chapterwise" | "subjectwise" | "mock";
  subject: string;
  topics: string[];
  sub_topics: string[];
  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;
  difficulty: "easy" | "medium" | "difficult";
  total_time: number;
  total_marks: number;
  total_questions: number;
  status: "live" | "draft" | "scheduled" | null;
}

export interface TestDetails {
  id: string;
  name: string;
  type: "chapterwise" | "subjectwise" | "mock";
  subject: string;
  topics: string[];
  sub_topics: string[];
  questions: [] | null;
  correct_marks: number;
  unattempt_marks: number;
  wrong_marks: number;
  difficulty: "easy" | "medium" | "difficult";
  total_marks: number;
  total_time: number;
  total_questions: number;
  slot: string | null;
  hidden_from_moderator: boolean | null;
  created_by: number;
  created_at: string;
  updated_by: number | null;
  updated_at: string | null;
  paragraph_question: unknown | null;
  status: "draft" | "live" | "scheduled";
  scheduled_date: string | null;
  expiry_date: string | null;
  original_files: [];
}
