"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '@repo/common/hooks';
import { useParams, useRouter } from 'next/navigation';
import { WS_URL } from '../../config';
import RoomCanvas from '../../../components/canvas/RoomCanvas';

export default function Page() {
    const user = useAppSelector((state) => state.currentUser);
    const router = useRouter();
    const params = useParams();
    const slug = Array.isArray(params.roomName) ? params.roomName[0] : params.roomName;

    if(!user){
        return router.push('/auth');
    }

    if(!slug){
        return router.push('/canvas/newroom');
    }

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
        }
    }, []);

    if(!socket){
        return(
            <div>
                Connecting to server...
            </div>
        )
    }

    return (
        <div className="relative">
            <RoomCanvas slug={slug} />
        </div>
    )
}
