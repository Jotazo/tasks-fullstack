import { ErrorParsed, TaskErrors } from "../interfaces/TaskErrors.interface";

export const handleError = (error: TaskErrors) => {
  const err: ErrorParsed = {};
  error.errors.forEach(({ path, messages }) => {
    err[path] = { messages };
  });
  return err;
};
