import { newRoom, rooms } from '@/db/schema/rooms';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import status from "http-status";
import superjson from "superjson";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: status.UNAUTHORIZED });
  }

  try {
    const data = newRoom.parse(await request.json())

    const [result] = await db.insert(rooms).values(data).returning()

    if (!result) throw new Error('Failed to create room')

    return new Response(superjson.stringify({
      data: result,
      url: `/api/rooms/${result.id}`
    }), {
      status: status.CREATED,
      headers: {
        'Content-Type': 'application/json'
      }
    })

  } catch (error: any) {
    console.log(error)
    return new Response(superjson.stringify({
      error: {
        message: error.message,
      },
    }), {
      status: status.BAD_REQUEST,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
