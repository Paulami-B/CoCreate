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

let existingShapes: Shape[] = [];
let newShapes: Shape[] = [];

export async function initDraw(canvas: HTMLCanvasElement, slug: string, user?: string) {
    const ctx = canvas.getContext("2d");
    if (!ctx || !slug) {
        return;
    }

    
    if(user){
        existingShapes = await getExistingShapes(slug, user);
        clearCanvas(canvas, ctx);
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
        newShapes.push({
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
            clearCanvas(canvas, ctx);
            ctx.strokeStyle = "rgba(211, 117, 218)";
            ctx.strokeRect(startX, startY, width, height);
        }
    });            
}

export function getShapes(){
    const shapes = newShapes.map((shape) => JSON.stringify(shape));
    return shapes;
}

function clearCanvas(canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        displayShape(shape, ctx);
    });

    newShapes.map((shape) => {
        displayShape(shape, ctx);
    })
}

function displayShape(shape: Shape, ctx: CanvasRenderingContext2D){
    if(shape.type==='rect'){
        ctx.strokeStyle = "rgba(211, 117, 218)";
        ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
    }
}

async function getExistingShapes(slug: string, user: string){
    const res = await axios.get(`${BACKEND_URL}/room/${slug}`, {
        headers: {
            Authorization: `Bearer ${user}`
        }
    });
    const shapes = res.data.shapes;
    const shapes_json = shapes.map((s: any) => JSON.parse(s.shape));
    return shapes_json;
}

export async function createRoom(user: string, roomName: string){
    try {
        const shapes = newShapes.map((shape) => JSON.stringify(shape));
        await axios.post(`${BACKEND_URL}/addRoom`, {
            name: roomName,
            shapes
        }, {
            headers: {
                Authorization: `Bearer ${user}`
            }
        });
        newShapes = [];
    } catch (error) {
        return error;
    }
}

export async function saveShapes(user: string, slug: string){
    try {
        const shapes = newShapes.map((shape) => JSON.stringify(shape));
        console.log("Shapes: ", shapes);
        await axios.post(`${BACKEND_URL}/addShapes/${slug}`, {
            shapes
        }, {
            headers: {
                Authorization: `Bearer ${user}`
            }
        });
        newShapes = [];
    } catch (error) {
        return error;
    }
}