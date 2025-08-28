import * as React from "react";

const variantMap = {
  default: "md-filled-button",
  secondary: "md-filled-tonal-button",
  outline: "md-outlined-button",
  ghost: "md-text-button",
  link: "md-text-button",
  destructive: "md-filled-button",
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLElement> {
  asChild?: boolean;
  variant?: keyof typeof variantMap;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ asChild = false, variant = "default", className, children, ...props }, ref) => {
    const Tag = variantMap[variant] as keyof JSX.IntrinsicElements;
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        {},
        React.createElement(Tag, { ref, className, ...props }, children.props.children)
      );
    }
    return React.createElement(Tag, { ref, className, ...props }, children);
  }
);
Button.displayName = "Button";

export { Button };
