"use client"

import { useEffect, useState } from "react"
import { WS_URL } from "../app/config";
import { useAppSelector } from "@repo/common/hooks";
import Canvas from "./Canvas";

export default function RoomCanvas({slug}: {slug: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const user = useAppSelector((state) => state.currentUser);
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=${user}`);

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: 'join_room',
                slug
            });
            console.log(data);
            ws.send(data);
        }
    }, []);

    if(user && !socket){
        return(
            <div>
                Connecting to server...
            </div>
        )
    }
    return (
        <Canvas slug={slug} socket={socket} />
    )
}
