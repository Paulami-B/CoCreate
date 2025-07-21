"use client"

import React, { useEffect, useRef, useState } from 'react'
import Modal from '..//Modal'
import { initDraw, saveShapes } from '../../app/draw';
import { useAppSelector } from '@repo/common/hooks';
import CreateRoom from '../room/CreateRoom';

export default function Canvas({
    slug,
    socket
}: {
    slug: string,
    socket: WebSocket|null
}) {
    const user = useAppSelector((state) => state.currentUser);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showModal, setShowModal] = useState(false);


    const handleClose = () => {
        setShowModal(false);
    }
    
    
    useEffect(() => {
        const handleKeyDown = async(e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if(slug && slug!=="newroom"){
                    const res = await saveShapes(user, slug);
                    console.log("Response: ", res);
                }
                else {
                    setShowModal(true);
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    useEffect(() => {
        if(canvasRef.current && slug){
            initDraw(canvasRef.current, slug, user);
        }
    }, [canvasRef]);


    return (
        <div className={`relative`}>
            <canvas ref={canvasRef} width={document.documentElement.clientWidth} height={document.documentElement.clientHeight}></canvas>
            {showModal && (
                <Modal closeModal={handleClose}>
                    <CreateRoom closeModal={handleClose} />
                </Modal>
            )}
        </div>
    )
}
