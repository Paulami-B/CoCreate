import Image from 'next/image'
import React from 'react'

export default function HomeLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex gap-4">
            <div className='fixed top-0 left-0 h-screen w-64 z-40 bg-lilac-light py-8 px-4'>
                <p className='my-10 w-full h-fit cursor-pointer rounded-full hover:bg-lilac/60 hover:font-bold hover:p-2'>
                    🖌️ Create New Room
                </p>
                <p className='my-10 w-full h-fit cursor-pointer rounded-full hover:bg-lilac/60 hover:font-bold hover:p-2'>
                    🏷️ Join Existing Room
                </p>
                <p className='my-10 w-full h-fit cursor-pointer rounded-full hover:bg-lilac/60 hover:font-bold hover:p-2'>
                    📝 Quick Start
                </p>
                <div className='absolute bottom-10 left-0 w-full'>
                    <div className="w-full h-fit flex px-5 py-2 items-center gap-2 rounded-full cursor-pointer hover:bg-lilac/60 hover:font-bold">
                        <Image src={'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740'}
                            height={50}
                            width={50}
                            alt='user'
                            className='rounded-full border-4 border-amber-200'
                        />
                        <p>User 1</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-screen ml-64">
                {children}
            </div>
        </div>
    )
}
