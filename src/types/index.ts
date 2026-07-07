import type { ReactNode } from "react";

export interface LoginPayload {
  userId: string;
  password: string;
}

export interface User {
  id: string;
  userId: string;
  name: string;
  role: string;
  subrole: string;
  phone: string;
  joiningDate: string;
  endDate: string;
  lastActive: string;
  payment: boolean;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface TestTubeManProps {
  width?: number;
  height?: number;
  color?: string;
}

export interface Test {
  id: string;
  name: string;
  subject: string;
  topics: string[];
  status: "draft" | "published";
  created_at: string;
}

export interface TestState {
  tests: Test[];
  loading: boolean;
  error: string | null;
}

export interface Column<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  className?: string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
}

export interface StatusBadgeProps {
  status?: string | null;
}

export interface Subject {
  id: string;
  name: string;
}

export interface GetSubjectsResponse {
  success: boolean;
  data: Subject[];
}

export interface SubjectsState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

export interface Topic {
  id: string;
  subject_id: string;
  name: string;
}

export interface GetTopicsResponse {
  status: string;
  message: string;
  data: Topic[];
}

export interface TopicsState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

export interface subTopic {
  id: string;
  topic_id: string;
  name: string;
}

export interface GetSubTopicsResponse {
  status: string;
  message: string;
  data: subTopic[];
}

export interface SubTopicsState {
  subTopics: subTopic[];
  loading: boolean;
  error: string | null;
}

export interface OptionItem {
  id: number;
  label: "option1" | "option2" | "option3" | "option4";
  text: string;
}

interface CreateQuestion {
  type: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: "option1" | "option2" | "option3" | "option4";
  explanation: string;
  difficulty: "easy" | "medium" | "difficult";
  subject: string;
  test_id: string;
}

export interface CreateQuestionsPayload {
  questions: CreateQuestion[];
}

export type Difficulty = "easy" | "medium" | "difficult";

export interface TestDetails {
  id: string;
  name: string;
  type: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  questions: string[] | null;
  correct_marks: number;
  unattempt_marks: number;
  wrong_marks: number;
  difficulty: "easy" | "medium" | "difficult";
  total_marks: number;
  total_time: number;
  total_questions: number;
  slot: string | null;
  hidden_from_moderator: boolean | null;
  paragraph_question: string | null;
  status: string;
  scheduled_date: string | null;
  expiry_date: string | null;
  original_files: string[];
}

export type BottomActionBarProps = {
  onExit?: () => void;
  onAskToEdit?: () => void;
  onNext?: () => void;
};


export interface OptionItem {
  id: number;
  text: string;
}

export type OptionsSectionProps = {
  options: OptionItem[];
  correctOption: number | null;
  onOptionChange: (id: number, value: string) => void;
  onCorrectOptionChange: (id: number) => void;
  onDeleteOption?: (id: number) => void;
};