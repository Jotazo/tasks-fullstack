import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Task } from "../interfaces/Task.interface";

import { getTaskById } from "../services/tasks";

import Loader from "../components/Loader";
import Error from "../components/Error";
import FormTask from "../components/FormTask/FormTask";

const UpdateTask = () => {
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTaskById(id)
        .then(({ error, task }) => {
          if (error && error.global) {
            return setError(error.global.messages);
          }
          setTaskToUpdate(task);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loader />;

  if (error.length > 0) return <Error messages={error} />;

  return <FormTask type="Update" initialState={taskToUpdate} />;
};

export default UpdateTask;
