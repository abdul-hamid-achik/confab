"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "../../../../components/icons"

interface ControlBarProps {
  devices: MediaDeviceInfo[]
  isMuted: boolean
  setMuted: (isMuted: boolean) => void
  isDeafened: boolean
  setDeafened: (isDeafened: boolean) => void
  isScreenSharing: boolean
  setScreenSharing: (isScreenSharing: boolean) => void
  isConnected: boolean
  setConnected: (isConnected: boolean) => void
}

function AudioControl(
  props: Pick<ControlBarProps, "isMuted" | "setMuted" | "devices">
) {
  return (
    <div>
      <Button
        onClick={() => {
          props.setMuted(!props.isMuted)
        }}
        variant="ghost"
      >
        {props.isMuted ? <Icons.micOff /> : <Icons.mic />}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icons.moreVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {props.devices.map((device) => (
            <DropdownMenuItem key={device.deviceId}>
              {device.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DisconnectControl(
  props: Pick<ControlBarProps, "isConnected" | "setConnected">
) {
  return (
    <div>
      <Button variant="destructive">
        <Icons.phone />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icons.moreVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Other options</DropdownMenuLabel>
          <DropdownMenuItem>Report</DropdownMenuItem>
          <DropdownMenuItem>Silence Everyone</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function ConnectControl(
  props: Pick<ControlBarProps, "isConnected" | "setConnected">
) {
  return (
    <div>
      <Button
        onClick={() => {
          props.setConnected(!props.isConnected)
        }}
      >
        Join <Icons.logIn />
      </Button>
    </div>
  )
}

export default function ControlBar(props: ControlBarProps) {
  return (
    <div className="fixed bottom-4 mb-2 flex w-full justify-evenly">
      {props.isConnected ? (
        <>
          <AudioControl
            devices={props.devices}
            isMuted={props.isMuted}
            setMuted={props.setMuted}
          />
          <DisconnectControl
            isConnected={props.isConnected}
            setConnected={props.setConnected}
          />
        </>
      ) : (
        <>
          <ConnectControl
            isConnected={props.isConnected}
            setConnected={props.setConnected}
          />
        </>
      )}
    </div>
  )
}
