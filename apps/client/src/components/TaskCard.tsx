import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Task } from "../interfaces/Task.interface";
import parseTimeAgo from "../utils/parseTimeAgo";

interface Props {
  task: Task;
  initialPos: number;
}

const TaskCard: React.FC<Props> = ({ task, initialPos }) => {
  return (
    <motion.div
      key={task._id}
      initial={{ x: initialPos }}
      animate={{ x: 0 }}
      exit={{ x: initialPos }}
      transition={{ ease: "easeInOut", duration: 2 }}
      className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700"
    >
      <Link to={`/tasks/${task._id}`}>
        <h3 className="text-2xl font-bold">{task.title}</h3>
        <p className="text-slate-300">{task.description}</p>
        <p className="text-slate-400 my-2">
          <span className="mr-1">
            Created {parseTimeAgo(new Date(task.createdAt))}
          </span>
        </p>
        <p className="text-slate-400 my-2">
          <span className="mr-1">
            Updated {parseTimeAgo(new Date(task.updatedAt))}
          </span>
        </p>
      </Link>
    </motion.div>
  );
};

export default TaskCard;
