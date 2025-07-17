"use client"

import React, { useEffect, useRef, useState } from 'react'
import { initDraw, saveShapes } from '../../draw';
import Modal from '../../../components/Modal';
import { useAppSelector } from '@repo/common/hooks';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function Canvas() {
    const user = useAppSelector((state) => state.currentUser);
    const router = useRouter();
    const params = useParams();
    const slug = Array.isArray(params.roomName) ? params.roomName[0] : params.roomName;

    if(!user){
        return router.push('/auth');
    }

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
                <Modal closeModal={handleClose} />
            )}
        </div>
    )
}
