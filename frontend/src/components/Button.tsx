import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button className={`px-4 py-2 rounded-full font-semibold ${className}`} {...props}>
    {children}
  </button>
);

export default Button;