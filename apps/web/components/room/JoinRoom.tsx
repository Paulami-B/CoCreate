import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createRoom } from '../../app/draw';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@repo/common/hooks';
import { BACKEND_URL } from '../../app/config';
import Link from 'next/link';

type RoomType = {
    id: number,
    slug: string,
    roomName: string,
    adminId: string,
    adminName: string,
    membersCount: number,
    createdAt: string,
    updatedAt: string,
    isMember: boolean
}

export default function JoinRoom() {

    const user = useAppSelector((state) => state.currentUser);
    const router = useRouter();
    const [roomName, setRoomName] = useState('');
    const [roomsData, setRoomsData] = useState<RoomType[] | null>(null);
    
    const [error, setError] = useState('');

    const getRoomsOverview = async() => {
        try {
            console.log(user.token);
            const res = await axios.get(`${BACKEND_URL}/rooms/`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setRoomsData(res.data);
        } catch (error) {
            console.log(error);
            setError("Error");
        }
    }

    useEffect(() => {
        getRoomsOverview();
    }, [])
    const handleSubmit = async() => {
        try {
            const slug = roomName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const res = await axios.get(`${BACKEND_URL}/rooms/${slug}/overview`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setRoomsData(res.data);
        } catch (error) {
            setError("Error");
            console.log(error);
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
                <div className='flex gap-2 items-center sticky top-0'>
                    <input 
                        type='text' 
                        className={`text-xl p-2 w-full outline-4 rounded-lg my-6 ${error ? "outline-red-400" : ""}`} 
                        placeholder='Enter room name'
                        onChange={(e) => {
                            const name = e.target.value;
                            setRoomName(name);
                            if(!name || name.length==0){
                                getRoomsOverview();
                            }
                        }} />
                    <button 
                        className='bg-lilac w-fit text-xl font-semibold h-fit p-2 text-white rounded-lg cursor-pointer'
                        disabled={roomName.length===0}
                    >
                        Search
                    </button>
                </div>
            </form>
            {!roomsData || roomsData?.length==0 ? (
                <p className='text-center'>No such room exists</p>
            ) : (
                roomsData?.map((room) => (
                    <div key={room.id} className="w-full h-fit p-2 hover:bg-lilac-light/60 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Link 
                                href={room.isMember ? `/canvas/${room.slug}`: '#'} 
                                onClick={(e) => !room.isMember && e.preventDefault()}
                                className='w-6/7'
                            >
                                <div className="flex justify-between items-start">
                                    <p className='text-lg'>{room.roomName}</p>
                                    <p className='text-xs text-gray-400'>{room.updatedAt}</p>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <p>{room.adminId===user.id ? "Me" : room.adminName}</p>
                                    <p>{room.membersCount} member{room.membersCount>1 ? "s" : ""}</p>
                                </div>
                            </Link>
                            {room.adminId!==user.id && (
                                <button className='relative group bg-lilac-light hover:bg-lilac text-white px-4 py-2 rounded scale-x-[-1] cursor-pointer'>
                                    🕊️
                                    <span className="absolute bottom-full scale-x-[-1] mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap max-w-xs">
                                        Send request
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
            {error && (
                <p className='text-red-400 text-center font-bold'>{error}</p>
            )}
        </>
    )
}
