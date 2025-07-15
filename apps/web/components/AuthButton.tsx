import { useAppSelector } from "@repo/common/hooks"

type AuthButtonProps = {
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function AuthButton({label, onClick}: AuthButtonProps) {

    const loading = useAppSelector((state) => state.loading);
    return (
        <button className="w-full my-1 p-2 lg:my-3 lg:p-3 bg-lilac dark:bg-lilac-dark dark:text-lilac-light 
        rounded-lg lg:text-xl font-bold cursor-pointer text-white flex justify-center items-center"
            onClick={(e) => onClick(e)}
            disabled = {loading}>
                {loading ? (
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858..."
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116..."
                            fill="currentFill"
                        />
                    </svg>
                ) : (
                    <>
                        {label}
                    </>
                )}
        </button>
    )
}