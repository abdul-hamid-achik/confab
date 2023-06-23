"use client"

import { Badge } from "@/components/ui/badge"
import { Room } from "@/db/schema/rooms"
import { type User } from "@clerk/nextjs/server"
import { useEffect, useState } from "react"
import ControlBar from "./control-bar"
import Participants from "./participants"

interface RoomProps extends Room {
  participants: User[]
}


export default function Room(props: RoomProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [isMuted, setMuted] = useState<boolean>(true);
  const [isDeafened, setDeafened] = useState<boolean>(false);
  const [isScreenSharing, setScreenSharing] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);

  useEffect(() => {

  }, [])


  useEffect(() => {
    if (isConnected) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(() => {
        navigator.mediaDevices.enumerateDevices().then(
          devices => {
            setDevices(devices.filter(device => device.kind === "audioinput"))
          }
        )
      })
    } else {
      setDevices([] as MediaDeviceInfo[])
    }

  }, [isConnected])

  return <div className="-mt-16 h-screen w-full">
    <h1 className="mt-16 pt-4 text-3xl font-bold">{props.name}</h1>

    <p className="text-lg font-medium">
      {props.description}
    </p>

    <Badge>
      {props.topic}
    </Badge>

    <Participants list={props.participants} roomId={props.id} />
    <ControlBar
      devices={devices}
      isMuted={isMuted}
      setMuted={setMuted}
      isDeafened={isDeafened}
      setDeafened={setDeafened}
      isScreenSharing={isScreenSharing}
      setScreenSharing={setScreenSharing}
      isConnected={isConnected}
      setConnected={setConnected}
    />
  </div>
}
