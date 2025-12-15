interface MyButtonProps{
    label: string;
    color?: "blue" | "red";
}

export default function MyButton({label, color = "blue"}: MyButtonProps){
    const colorClass = color === "blue" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600";
    
    return (
        <button className={`${colorClass} text-white font-bold py-2 px-4 rounded m-2`}>
            {label}
        </button>
    );
}