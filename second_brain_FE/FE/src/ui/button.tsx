import { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    StartIcon?: ReactElement;
    text: String;
    onclick?: () => void;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-indigo-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultstyles = "px-4 py-2 rounded-md font-light flex items-center"

export function Button({variant, StartIcon, text, onclick, loading}: ButtonProps){
    return <button onClick={onclick} className={variantStyles[variant] + " " + defaultstyles + '${loading ? "opacity-45" : ""}'} >
        <div className="pr-2">
        {StartIcon}
        </div>
        {text}
    </button>
} 