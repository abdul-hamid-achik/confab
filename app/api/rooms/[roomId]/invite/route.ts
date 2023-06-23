import { invites } from "@/db/schema/invites"
import { rooms } from "@/db/schema/rooms"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import status from "http-status"
import { Resend } from "resend"
import { CreateEmailResponse } from "resend/build/src/emails/interfaces"
import SuperJSON from "superjson"
import { z } from "zod"

import { db } from "@/lib/db"
import { getBaseURL } from "@/lib/utils"
import InviteTemplate from "@/components/emails/invite"

const resend = new Resend(env.RESEND_API_KEY)

const payload = z.object({
  email: z.string().email(),
})

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const user = await currentUser()

    if (!user) {
      return new Response("Unauthorized", { status: status.UNAUTHORIZED })
    }

    const { email } = payload.parse(await request.json())

    let data: CreateEmailResponse | string | any | null = null

    await db.insert(invites).values({
      email,
      roomId: params.roomId,
    })

    const [{ name: roomName }] = await db
      .select()
      .from(rooms)
      .where(eq(rooms.id, params.roomId))
      .limit(1)
    const template = InviteTemplate({
      email,
      invitedBy: user.firstName + " " + user.lastName,
      roomUrl: `${getBaseURL()}/rooms/${params.roomId}`,
      roomId: params.roomId,
      roomName: roomName || "Unnamed Room",
    }) as JSX.Element

    if (process.env.NODE_ENV === "production") {
      data = await resend.sendEmail({
        from: env.EMAIL_FROM || "",
        to: email,
        subject: `You've been invited to a room!`,
        react: template,
      })
    } else {
      // data = renderToString(template);
      console.log({
        from: env.EMAIL_FROM || "",
        to: email,
        subject: `You've been invited to a room!`,
      })
      data = { message: "Email sent in development mode" }
    }

    return new Response(SuperJSON.stringify(data), {
      headers: { "content-type": "application/json" },
      status: status.OK,
    })
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error?.message }), {
      headers: { "content-type": "application/json" },
      status: status.BAD_REQUEST,
    })
  }
}
