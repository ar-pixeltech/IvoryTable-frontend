interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      // className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition ${className}`}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-md transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
