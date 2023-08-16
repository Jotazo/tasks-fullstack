import { ErrorParsed } from "./TaskErrors.interface";

export interface Task {
  _id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTask = Pick<Task, "title" | "description">;

export type UpdateTask = Partial<CreateTask> & Partial<Pick<Task, "done">>;

export type FormInitialTask = Task | CreateTask;

export interface TaskResponse {
  error: ErrorParsed | null;
  task: Task | null;
}
