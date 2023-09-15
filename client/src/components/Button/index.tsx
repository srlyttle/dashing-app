import React from "react";
import "./styles.scss";
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({ children, variant = "primary", ...props }: Props) => {
  return (
    <button className={`button button--${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
