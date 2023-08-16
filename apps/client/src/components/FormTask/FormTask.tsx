import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { FormInitialTask, Task } from "../../interfaces/Task.interface";
import { ErrorParsed } from "../../interfaces/TaskErrors.interface";

import type { FORM_TYPES } from "../../types";

import { CONSTANTS_FORM_TYPES } from "../../constants";

import { createTask, deleteTask, updateTask } from "../../services/tasks";

import { TOAST_MESSAGES, TOAST_OPTIONS } from "../../utils/toastify";
import { showDeleteModal } from "../../utils/sweetAlert";

import FormErrorMessage from "./components/FormErrorMessage";

import "@sweetalert2/theme-dark/dark.css";
import styles from "./FormTask.module.css";
import CustomButton from "../CustomButton";

const TITLE = {
  New: "Create Task",
  Update: "Update Task",
};

const TEXT_BTN = {
  New: "Save",
  Update: "Update",
};

interface Props {
  type: FORM_TYPES;
  initialState: FormInitialTask | null;
}

const FormTask: React.FC<Props> = ({ type, initialState }) => {
  const navigate = useNavigate();

  const [task, setTask] = useState(initialState);
  const [errors, setErrors] = useState<ErrorParsed | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNewForm = type === CONSTANTS_FORM_TYPES.new;

    let data;
    if (isNewForm) data = await createTask(task!);
    else data = await updateTask((task as Task)._id, task!);

    if (data.error) return setErrors(data.error);

    const toastMessage = isNewForm
      ? TOAST_MESSAGES.taskCreated
      : TOAST_MESSAGES.taskUpdated;
    toast.success(toastMessage, TOAST_OPTIONS);

    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task!, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleDelete = async () => {
    const result = await showDeleteModal();
    if (result.isConfirmed) {
      const { _id: id } = task as Task;
      const { error } = await deleteTask(id);
      if (error) toast.error(error.global?.messages[0], TOAST_OPTIONS);
      else toast.success(TOAST_MESSAGES.taskDeleted, TOAST_OPTIONS);
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 2 }}
      className="container-centered-layout flex-col"
    >
      <form
        className="w-full md:w-[500px] flex flex-col gap-8 bg-gray-950 p-12 rounded-xl"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between">
          <h1 className="font-bold text-2xl md:text-3xl">{TITLE[type]}</h1>
          {type === CONSTANTS_FORM_TYPES.update && (
            <CustomButton
              variant="danger"
              text="Delete"
              type="button"
              onClick={handleDelete}
            />
          )}
        </header>
        <div className="relative">
          <input
            className={`${styles.input} ${
              errors && errors.title && styles.errorInput
            }`}
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={task?.title}
          />
          {errors?.title?.messages.map((errorMessage) => (
            <FormErrorMessage
              key={new Date().toISOString()}
              message={errorMessage}
            />
          ))}
        </div>
        <div className="relative">
          <textarea
            className={`${styles.input} ${
              errors && errors.description && styles.errorInput
            } resize-none`}
            name="description"
            placeholder="Description"
            rows={3}
            onChange={handleChange}
            value={task?.description}
          ></textarea>
          {errors?.description?.messages.map((errorMessage) => (
            <FormErrorMessage
              key={new Date().toISOString()}
              message={errorMessage}
            />
          ))}
        </div>
        <CustomButton text={TEXT_BTN[type]} variant="success" type="submit" />
      </form>
    </motion.div>
  );
};

export default FormTask;
