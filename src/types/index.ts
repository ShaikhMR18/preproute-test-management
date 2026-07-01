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
