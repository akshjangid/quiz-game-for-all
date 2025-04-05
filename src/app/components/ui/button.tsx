import { cn } from "@/app/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition",
        className
      )}
      {...props}
    />
  );
};
