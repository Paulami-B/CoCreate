"use client"

import { useAppSelector } from '@repo/common/hooks';
import Image from 'next/image'
import React, { useState } from 'react'
import Modal from '../../components/Modal';
import CreateRoom from '../../components/room/CreateRoom';
import JoinRoom from '../../components/room/JoinRoom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeLayout({children}: {children: React.ReactNode}) {
    const user = useAppSelector((state) => state.currentUser);
    const [showCreate, setShowCreate] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const router = useRouter();
    
    const handleClose = () => {
        setShowCreate(false);
        setShowSearch(false);
    }

    return (
        <div className="flex gap-4">
            <div className='fixed top-0 left-0 h-screen w-64 z-40 bg-lilac-light py-8 px-4'>
                <button 
                    className='my-10 w-full h-fit cursor-pointer rounded-full hover:bg-lilac/60 hover:font-bold hover:p-2'
                    onClick={() => {
                        setShowSearch(false);
                        setShowCreate(true);
                    }}
                >
                    🖌️ Create New Room
                </button>
                <button 
                    className='my-10 w-full h-fit cursor-pointer rounded-full hover:bg-lilac/60 hover:font-bold hover:p-2'
                    onClick={() => {
                        setShowCreate(false);
                        setShowSearch(true);
                    }}
                >
                    🏷️ Join Existing Room
                </button>
                <button
                    onClick={() => router.push('/canvas/newroom')}
                    className='my-10 w-full h-fit cursor-pointer rounded-full hover:bg-lilac/60 hover:font-bold hover:p-2'
                >
                    📝 Quick Start
                </button>
                {user && (
                    <div className='absolute bottom-10 left-0 w-full'>
                        <div className="w-full h-fit flex px-5 py-2 items-center gap-2 rounded-full cursor-pointer hover:bg-lilac/60 hover:font-bold">
                            <Image src={user.photo}
                                height={50}
                                width={50}
                                alt='user'
                                className='rounded-full border-4 border-amber-200'
                            />
                            <p>{user.name}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full h-screen ml-64">
                {children}
            </div>
            {showCreate && (
                <Modal closeModal={handleClose}>
                    <CreateRoom closeModal={handleClose} />
                </Modal>
            )}
            {showSearch && (
                <Modal closeModal={handleClose}>
                    <JoinRoom />
                </Modal>
            )}
        </div>
    )
}
