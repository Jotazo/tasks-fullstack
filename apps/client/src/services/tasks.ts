const API_URI = "/api/tasks";

import {
  CreateTask,
  Task,
  TaskResponse,
  UpdateTask,
} from "../interfaces/Task.interface";

import { handleError } from "../utils/errorHandler";

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URI}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export const getTaskById = async (id: string): Promise<TaskResponse> => {
  const res = await fetch(`${API_URI}/${id}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) return { error: handleError(data), task: null };
  return { error: null, task: data };
};

export const createTask = async (
  newTask: CreateTask
): Promise<TaskResponse> => {
  const res = await fetch(`${API_URI}`, {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) return { error: handleError(data), task: null };
  return { error: null, task: data };
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URI}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();
    return { error: handleError(data), response: null };
  }

  return { error: null, response: null };
};

export const updateTask = async (
  id: string,
  taskUpdates: UpdateTask
): Promise<TaskResponse> => {
  const res = await fetch(`${API_URI}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(taskUpdates),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) return { error: handleError(data), task: null };
  return { error: null, task: data };
};
