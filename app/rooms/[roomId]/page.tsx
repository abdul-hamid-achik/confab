"use server"

import { participants } from "@/db/schema/participants"
import { Room, rooms } from "@/db/schema/rooms"
import { clerkClient } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

import RoomComponent from "@/app/rooms/[roomId]/components"
import { db } from "@/lib/db"

async function getUsersList(userIds: string[]) {
  if (userIds.length === 0) return []

  return await clerkClient.users.getUserList({
    userId: userIds,
  })
}

export default async function RoomPage({
  params,
}: {
  params: {
    roomId: string
  }
}) {
  // const room = await db.query.rooms.findFirst({
  //   where: eq(rooms.id, params.roomId),
  //   with: {
  //     participants: true
  //   }
  // })

  const [room] = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, params.roomId))
    .limit(1)
  const roomParticipants = await db
    .select()
    .from(participants)
    .where(eq(participants.roomId, params.roomId))

  const users = await getUsersList(
    (roomParticipants.map((participant) => participant.userId) as string[]) ||
    []
  )

  const { id, name, topic, description, moderatorId } = room || ({} as Room)

  return (
    <section className="container items-center ">
      <RoomComponent
        id={id}
        name={name}
        topic={topic}
        description={description}
        moderatorId={moderatorId}
        participants={users}
      />
    </section>
  )
}
