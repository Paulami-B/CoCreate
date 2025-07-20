"use client"

import React, { useEffect, useRef, useState } from 'react'
import { initDraw, saveShapes } from '../../draw';
import Modal from '../../../components/Modal';
import { useAppSelector } from '@repo/common/hooks';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { WS_URL } from '../../config';
import Canvas from '../../../components/Canvas'
import RoomCanvas from '../../../components/RoomCanvas';

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

    // const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [showModal, setShowModal] = useState(false);

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
        }
    }, []);

    // const handleClose = () => {
    //     setShowModal(false);
    // }

    // useEffect(() => {
    //     const handleKeyDown = async(e: KeyboardEvent) => {
    //         if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    //             e.preventDefault();
    //             if(slug && slug!=="newroom"){
    //                 const res = await saveShapes(user, slug);
    //                 console.log("Response: ", res);
    //             }
    //             else {
    //                 setShowModal(true);
    //             }
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

    // useEffect(() => {
    //     if(canvasRef.current && slug){
    //         initDraw(canvasRef.current, slug, user);
    //     }
    // }, [canvasRef]);

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
