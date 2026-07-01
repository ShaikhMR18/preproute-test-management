import type { LoginPayload, LoginResponse } from "../types";
import api from "./axios";
import ENDPOINTS from "./endpoints";

export const loginApi = async (
  payload: LoginPayload
) => {
  const response = await api.post<LoginResponse>(
    ENDPOINTS.LOGIN,
    payload
  );

  return response.data;
};