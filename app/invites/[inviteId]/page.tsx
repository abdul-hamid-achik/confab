import { invites } from "@/db/schema/invites"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"

import InviteForm from "./form"

export default async function InvitePage({
  params,
}: {
  params: { inviteId: string }
}) {
  // const invite = await db.query.invites.findFirst({
  //   where: eq(invites.id, params.inviteId)
  // })

  const [invite] = await db
    .select()
    .from(invites)
    .where(eq(invites.id, params.inviteId))
    .execute()

  return (
    <section className="container items-center ">
      <h1>Invite Page</h1>

      <p>Invite ID: {params.inviteId}</p>

      {invite.status === "pending" ? (
        <InviteForm
          id={params.inviteId}
          roomId={invite.roomId}
          email={invite.email}
        />
      ) : (
        <p>Invite has been accepted</p>
      )}
    </section>
  )
}
