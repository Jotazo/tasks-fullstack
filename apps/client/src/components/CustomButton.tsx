interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant: "success" | "danger";
}

const VARIANT_STYLES: Record<Props["variant"], string> = {
  success:
    "bg-green-600 hover:bg-green-700 duration-300 transition-colors text-white font-bold px-4 py-2 rounded-lg",
  danger: "bg-red-500 px-3 py-1 rounded-md",
};

const CustomButton: React.FC<Props> = ({ text, variant, ...props }) => {
  return (
    <button className={VARIANT_STYLES[variant]} {...props}>
      {text}
    </button>
  );
};

export default CustomButton;
