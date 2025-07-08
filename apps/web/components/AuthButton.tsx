type AuthButtonProps = {
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function AuthButton({label, onClick}: AuthButtonProps) {
    return (
        <button className="w-full my-1 p-2 lg:my-3 lg:p-3 bg-lilac dark:bg-lilac-dark dark:text-lilac-light rounded-lg lg:text-xl font-bold cursor-pointer text-white" onClick={(e) => onClick(e)}>
                {label}
        </button>
    )
}