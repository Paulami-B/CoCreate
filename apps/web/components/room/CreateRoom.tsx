import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { createRoom } from '../../app/draw';
import { useAppSelector } from '@repo/common/hooks';
import axios from 'axios';

type ModalProps = {
    closeModal: () => void
}

export default function CreateRoom({closeModal}: ModalProps) {
    
    const user = useAppSelector((state) => state.currentUser);
    const router = useRouter();
    const [roomName, setRoomName] = useState('');
    
    const [error, setError] = useState('');
    const handleSubmit = async() => {
        const slug = roomName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        if(slug==='newroom'){
            setError("Room exists.Choose a different name");
            return;
        }
        const res = await createRoom(user.token, roomName);
        if(!res){
            setError('');
            setRoomName('');
            closeModal();
            router.push(`/canvas/${slug}`);
        }
        else if(axios.isAxiosError(res)){
            setError(res.response?.data?.message);
        }
        else {
            setError("Error while saving room");
        }
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <input 
                    type='text' 
                    className={`text-xl p-2 w-full outline-4 rounded-lg my-6 ${error ? "outline-red-400" : ""}`} 
                    placeholder='Enter room name'
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <button className='bg-lilac w-full text-xl font-semibold text-white py-2 rounded-lg cursor-pointer'>
                    Save Room
                </button>
            </form>
            {error && (
                <p className='text-red-400 text-center font-bold'>{error}</p>
            )}
        </>
    )
}
