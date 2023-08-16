import FormTask from "../components/FormTask/FormTask";

const initialState = {
  title: "",
  description: "",
};

const NewTask = () => {
  return <FormTask type="New" initialState={initialState} />;
};

export default NewTask;
