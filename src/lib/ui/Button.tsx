import React from "react";

import { cns } from "../../utils/classnames";

interface ButtonProps {
  variant?: "primary" | "error";
  outlined?: boolean;
  size?: "sm" | "xs";
  casing?: "uppercase" | "normal";
  loading?: boolean;

  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "primary",
  outlined = false,
  size,
  casing,
  loading = false,

  type = "button",
  disabled,
  onClick,
}) => {
  const classNames = cns([
    ["btn"],
    [`btn-${variant}`],
    ["btn-sm", size === "sm"],
    ["btn-xs", size === "xs"],
    ["btn-outline", outlined],
    ["normal-case", casing === "normal"],
    ["loading", loading],
  ]);

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
