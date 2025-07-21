import React from 'react'

type InputBoxProps = {
    type: 'text' | 'email',
    name: string,
    label: string,
    required?: boolean,
    value?: string
    error: boolean
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputBox({type, name, label, required, value, error, onChange}: InputBoxProps) {
    return (
        <div className="relative py-2">
            <input 
                name={name} 
                type={type} 
                required={required ? required : true} 
                value={value}
                className={`block p-2 pt-3 dark:text-gray-200 w-full bg-transparent rounded-lg border-1 appearance-none 
                focus:outline-none focus:ring-0 peer
                ${error ? "border-red-600 dark:border-red-400" : "border-gray-400 focus:border-lilac-dark dark:focus:border-lilac"}`}
                placeholder=" " 
                onChange={onChange} 
            />
            <label className={`absolute text-gray-500 dark:text-gray-300 duration-300 transform -translate-y-4 scale-75 bg-white 
            dark:bg-black top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 
            peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
            peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1
            ${error ? "peer-focus:text-red-600 peer-focus:dark:text-red-400" : "peer-focus:text-lilac-dark peer-focus:dark:text-lilac"}`}>
            {label}
            </label>
        </div>
    )
}
