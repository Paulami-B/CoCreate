"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useAppSelector } from "@repo/common/hooks";
import Link from "next/link";

type RoomType = {
  id: number,
  slug: string,
  roomName: string,
  adminId: number,
  adminName: string,
  membersCount: number,
  createdAt: string,
  updatedAt: string,
  isMember: boolean
}

export default function Home() {

  const [rooms, setRooms] = useState<RoomType[] | null>(null);
  const user = useAppSelector((state) => state.currentUser);

  const getRoomsOverview = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setRooms(res.data);
    } catch (error) {
      console.log("ERROR fetching rooms data: ", error);
    }
  }

  useEffect(() => {
    getRoomsOverview();
  }, []);

  const handleDelete = async(slug: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/room/${slug}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if(!rooms){
        return;
      }
      setRooms(rooms?.filter((room: RoomType) => room.slug!==slug))
    } catch (error) {
      console.log("ERROR while deleting room: ", error);
    }
  }

  return (
    <div>
      {!rooms || rooms.length==0 ? (
        <div className="w-full h-screen flex justify-center items-center gap-4">
          <p className="text-5xl">🧐</p>
          <p className="text-2xl">No existig rooms</p>
        </div>
      ) : (
        <div className="mx-auto w-4/5 mt-10">
          <div className="items-end w-2/5 border-b-2 border-b-lilac-light rounded-md flex gap-1 py-1">
            <p className="text-xl">&#128269;</p>
            <input 
              className="w-full border-0 outline-0 text-lg"
              placeholder="Search room"
            />
          </div>
          <div className="overflow-auto max-h-[600px]">
            <table className="w-full mt-5 max-h-3/5 overflow-auto">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th className="w-3/5 text-left px-4 py-2">Name</th>
                  <th className="w-1/5 text-left px-4 py-2">Created By</th>
                  <th className="w-1/5 text-left px-4 py-2">Last Updated</th>
                  <th className="w-1/5 text-left px-4 py-2">Members</th>
                </tr>
              </thead>
              <tbody>
                {rooms?.map((room) => (
                  <tr key={room.id} className="cursor-pointer hover:bg-lilac-light/60 rounded-xl hover:font-bold">
                    <td className="w-3/5 px-4 py-2 break-words">
                      <Link href={`/canvas/${room.slug}`} className="block w-full h-full">
                        {room.roomName}
                      </Link>
                    </td>
                    <td className="w-1/5 px-4 py-2">{room.adminId==user.id ? "Me" : room.adminName}</td>
                    <td className="w-1/5 px-4 py-2">{room.updatedAt}</td>
                    <td className="w-1/5 px-4 py-2">{room.membersCount}</td>
                    {room.adminId===user.id && (
                      <td>
                        <button 
                          className="cursor-pointer mr-2"
                          onClick={() => handleDelete(room.slug)}
                        >
                          🗑️
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
