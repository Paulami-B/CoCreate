"use client"

import React, { useEffect, useRef } from 'react'
import { initDraw } from '../../draw';

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current){
            initDraw(canvasRef.current);
        }
    }, [canvasRef]);
    return (
        <div>
            <canvas ref={canvasRef} width={document.documentElement.clientWidth} height={document.documentElement.clientHeight}></canvas>
        </div>
    )
}
