import * as React from "react";
import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button.js";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "filled" | "outlined" | "text";
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ variant = "filled", children, ...props }, ref) => {
    const Tag =
      variant === "outlined"
        ? "md-outlined-button"
        : variant === "text"
        ? "md-text-button"
        : "md-filled-button";
    return React.createElement(Tag, { ref, ...props }, children);
  },
);
Button.displayName = "Button";

export { Button };
