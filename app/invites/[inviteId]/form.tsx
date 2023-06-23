import { invites } from "@/db/schema/invites"
import { zodResolver } from "@hookform/resolvers/zod"
import { eq } from "drizzle-orm"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectItem } from "@/components/ui/select"

const UpdateInvitation = z.object({
  inviteId: z.string(),
  status: z.enum(["pending", "accepted"]),
  email: z.string().email(),
  roomId: z.string(),
})

type UpdateInvitation = z.infer<typeof UpdateInvitation>

export default function InviteForm({
  id,
  email,
  roomId,
}: {
  id: string
  email: string
  roomId: string
}) {
  const form = useForm<UpdateInvitation>({
    resolver: zodResolver(UpdateInvitation),
    defaultValues: {
      roomId,
      email,
      inviteId: id,
      status: "pending",
    },
  })

  const onSubmit = async (values: UpdateInvitation) => {
    await db.update(invites).set(values).where(eq(invites.id, id)).execute()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>userId</FormLabel>
              <FormControl>
                <Select {...field} disabled>
                  <SelectItem value="accepted">Accept</SelectItem>
                </Select>
              </FormControl>
              <FormDescription>This is your public userId</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
