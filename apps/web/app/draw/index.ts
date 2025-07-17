import axios from "axios";
import { BACKEND_URL } from "../config";

type Shape = {
    type: "rect",
    startX: number,
    startY: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
}

export function initDraw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    const existingShapes: Shape[] = [];
    if (!ctx) {
        return
    }

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        existingShapes.push({
            'type': 'rect',
            startX,
            startY,
            width,
            height
        });
    });            

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(211, 117, 218)";
            ctx.strokeRect(startX, startY, width, height);
        }
    });            
}

function clearCanvas(existingShapes: Shape[], canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if(shape.type=='rect'){
            ctx.strokeStyle = "rgba(211, 117, 218)";
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
    })
}

async function getExistingShapes({roomName}: {roomName: string}){
    const res = await axios.get(`${BACKEND_URL}/room/${roomName}`);
    const data = res.data.room
}