import { ToastOptions } from "react-toastify";

export const TOAST_MESSAGES = {
  taskDeleted: "Task deleted successfully",
  taskCreated: "Task created successfully",
  taskUpdated: "Task updated successfully",
};

export const TOAST_OPTIONS: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
