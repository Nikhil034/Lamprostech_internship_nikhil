interface Props {
  children: string;
  onClick: () => void;
}
const Button = ({ children, onClick }: Props) => {
  return (
    <>
      <button
        className="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
