import * as React from 'react'
interface ButtonProps {
  size?: string;
  variant?: string;
  className?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

 const Button: React.FC<ButtonProps> = ({ className,  size, variant, onClick, children }) => {
  return (
    <button
      className={`${className} ${variant} ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;