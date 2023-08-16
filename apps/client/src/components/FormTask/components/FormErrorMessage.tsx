interface Props {
  message: string;
}

const FormErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <small className="absolute left-0 bottom-[-1.25rem] text-red-500 ">
      {message}
    </small>
  );
};

export default FormErrorMessage;
