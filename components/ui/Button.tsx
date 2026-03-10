interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = '', role = 'vendor', ...props }: ButtonProps) {
  return (
    (role === 'admin') ? (
      <button
        className={`
          bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-md transition ${className}
          `}
        {...props}
      >
        {children}
      </button>
    ) : (
      <button
        className={`bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 ${className}`}
        {...props}
      >
        {children}
      </button>

    ))
}
