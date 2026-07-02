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
