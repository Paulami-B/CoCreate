import React from 'react';

type ModalProps = {
    closeModal: () => void,
    children: React.ReactNode
}

export default function Modal({closeModal, children}: ModalProps) {

    return (
        <div className='fixed inset-0 z-50 w-screen h-screen bg-gray-500/70 flex justify-center items-center'>
            <div className="w-min-100 w-fit h-fit max-h-3/5 max-w-1/2 overflow-auto bg-white rounded-lg px-12 py-6 text-xl">
                <div className="flex justify-end items-center">
                    <button className='cursor-pointer font-bold hover:text-2xl hover:text-red-400'
                        onClick={closeModal}
                    >
                        X
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}