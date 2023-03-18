import Link from "next/link";
import React from "react";

import { cns } from "../../utils/classnames";

interface ButtonProps {
  variant?: "primary" | "error";
  outlined?: boolean;
  size?: "sm" | "xs";
  casing?: "uppercase" | "normal";
  loading?: boolean;

  as?: "button" | "link" | "label";
  href?: string;
  htmlFor?: React.LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];

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
  as = "button",
  href,
  htmlFor,

  type = "button",
  disabled,
  onClick,
}) => {
  const classNames = cns([
    ["btn"],
    ["btn-primary", variant === "primary"],
    ["btn-error", variant === "error"],
    ["btn-sm", size === "sm"],
    ["btn-xs", size === "xs"],
    ["btn-outline", outlined],
    ["normal-case", casing === "normal"],
    ["loading", loading],
  ]);

  if (as === "label" && htmlFor) {
    return (
      <label htmlFor={htmlFor} className={classNames}>
        {children}
      </label>
    );
  }

  if (as === "link" && href) {
    return (
      <Link href={href} className={classNames}>
        {children}
      </Link>
    );
  }

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
