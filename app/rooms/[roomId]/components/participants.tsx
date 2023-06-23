"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface ParticipantsProps {
  list: User[]
  roomId: string
}

const InviteParticipant = z.object({
  email: z.string().email(),
})

type TInviteParticipant = z.infer<typeof InviteParticipant>

function InviteParticipantForm({ roomId }: { roomId: string }) {
  const { getToken } = useAuth()
  const navigator = useRouter()
  const { toast } = useToast()
  const form = useForm<TInviteParticipant>({
    resolver: zodResolver(InviteParticipant),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: TInviteParticipant) => {
    const token = await getToken()
    const response = await fetch(`/api/rooms/${roomId}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      const data = await response.json()

      toast({
        title: "Success.",
        description: `You have invited ${values.email}.`,
      })
    } else {
      const error = await response.json()
      toast({
        title: "An error occurred.",
        description: `Unable to create room. ${error.message}`,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormDescription>
                The email of the person you want to invite
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Invit{form.formState.isSubmitting ? "ing" : "e"}
        </Button>
      </form>
    </Form>
  )
}

export default function Participants(props: ParticipantsProps) {
  return (
    <div className="fixed right-4 w-[200px]">
      <h2 className="text-md">Participants</h2>

      <InviteParticipantForm roomId={props.roomId} />

      <ul>
        {props.list.map((user) => (
          <li key={user.id} className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={user.profileImageUrl} />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
          </li>
        ))}
      </ul>
    </div>
  )
}
