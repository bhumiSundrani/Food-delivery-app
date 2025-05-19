import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary" | "danger" | "success";
}

export const Button : React.FC<ButtonProps> = ({
    children,
    type = "button",
    disabled = false,
    loading = false,
    onClick,
    className,
    variant = "primary"
}) => {

    let colorClasses = ""
    if(variant == "primary"){
        colorClasses = "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
    }else if(variant == "secondary"){
        colorClasses = "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
    }else if(colorClasses == "danger"){
        colorClasses = "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
    }else {
        colorClasses = "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
    }


    return (
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 text-sm sm:text-base ${colorClasses} ${disabled || loading && ("opacity-50 cursor-not-allowed")}  ${className}`}
        >
            {loading ? <div className="flex gap-x-1 justify-center items-center"><Loader2 size={18} className="animate-spin text-sm"/> {children ? children : "Loading...."}</div> : children}
        </button>
    )
}