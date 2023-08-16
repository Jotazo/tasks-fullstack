interface Props {
  messages: string[];
}

const Error: React.FC<Props> = ({ messages }) => {
  return (
    <div className="container-centered-layout">
      {messages.map((message) => (
        <h2 key={new Date().toISOString()} className="text-5xl font-bold">
          {message}
        </h2>
      ))}
    </div>
  );
};

export default Error;
