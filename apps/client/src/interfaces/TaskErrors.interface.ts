import { API_ERROR_PATHS } from "../types";

export interface TaskErrors {
  errors: ApiError[];
  statusCode: number;
}

export interface ApiError {
  path: API_ERROR_PATHS;
  messages: string[];
}

export interface ErrorParsed {
  [key: API_ERROR_PATHS]: { messages: string[] } | null;
}
