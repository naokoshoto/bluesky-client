import * as React from "react";
import "@material/web/textfield/filled-text-field.js";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLElement, InputProps>(
  ({ label, ...props }, ref) => (
    <md-filled-text-field ref={ref as any} label={label} {...(props as any)}></md-filled-text-field>
  ),
);
Input.displayName = "Input";

export { Input };
