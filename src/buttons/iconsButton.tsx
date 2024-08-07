import React, { ReactNode, MouseEventHandler } from "react";
import "../css/iconStyles.css";

interface IconButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
