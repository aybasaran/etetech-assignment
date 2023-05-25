import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { clsx, type ClassValue } from "clsx";
import { FC, HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ text, isLoading, className, ...props }) => {
  return (
    <button
      className={cn(
        "py-1 px-3 rounded shadow-lg text-lg font-semibold text-white transition-colors duration-300",
        {
          "cursor-not-allowed": isLoading,
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <ArrowPathIcon className="animate-spin h-5 w-5 mr-3 ..." />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
