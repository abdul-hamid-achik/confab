import { CreateRoom, rooms } from "@/db/schema/rooms"
import { currentUser } from "@clerk/nextjs"
import status from "http-status"
import superjson from "superjson"

import { db } from "@/lib/db"

export async function POST(request: Request) {
  const user = await currentUser()

  if (!user) {
    return new Response("Unauthorized", { status: status.UNAUTHORIZED })
  }

  try {
    const data = CreateRoom.parse(await request.json())

    const [result] = await db.insert(rooms).values(data).returning()

    if (!result) throw new Error("Failed to create room")

    return new Response(superjson.stringify(result), {
      status: status.CREATED,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    return new Response(
      superjson.stringify({
        error: {
          message: error.message,
        },
      }),
      {
        status: status.BAD_REQUEST,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
