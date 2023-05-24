"use server"
import { Badge } from "@/components/ui/badge"
import { rooms } from "@/db/schema/rooms"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"

export default async function RoomPage({ params }: {
  params: {
    roomId: string
  }
}) {
  const [room] = await db.select().from(rooms).where(eq(rooms.id, params.roomId))

  return <section className="container  items-center gap-6 pb-8 pt-6 md:py-10">
    <h1 className="text-3xl font-bold">{room.name}</h1>

    <p className="text-lg font-medium">
      {room.description}
    </p>

    <Badge>
      {room.topic}
    </Badge>

  </section>
}
