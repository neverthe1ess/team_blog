interface MyButtonProps{
    label: string;
    color?: "blue" | "red";
    type?: "button" | "submit";
    onClick?: () => void;
    
}

export default function MyButton({label, color = "blue", onClick, type = "button"}: MyButtonProps){
    const colorClass = color === "blue" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600";
    const base = "text-white font-bold py-2 px-4 rounded m-2";

    return (
        <button className={`${colorClass} ${base}`} onClick={onClick} type={type}>
            {label}
        </button>
    );
}