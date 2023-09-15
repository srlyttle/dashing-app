import React from "react";
import "./styles.scss";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...props }: Props) => {
  return <input className="input" {...props} />;
};

export default Input;
