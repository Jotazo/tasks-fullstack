import { useEffect, useState } from "react";

import { Task } from "../interfaces/Task.interface";

import { getTasks } from "../services/tasks";

import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

const TasksNotFound = () => {
  return (
    <div className="container-centered-layout">
      <h2 className="text-5xl font-bold">No tasks founded. Create your own!</h2>
    </div>
  );
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Gestionar errores
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (tasks.length === 0) return <TasksNotFound />;

  let initialPos = -300;
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
      {tasks.map((task) => {
        initialPos = initialPos - 600;
        return <TaskCard key={task._id} task={task} initialPos={initialPos} />;
      })}
    </div>
  );
};

export default Home;
