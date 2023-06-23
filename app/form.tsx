"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreateInvite, NewInvite } from "@/db/schema/invites"
import { CreateRoom, NewRoom } from "@/db/schema/rooms"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function CreateInviteForm() {
  const form = useForm<NewInvite>({
    resolver: zodResolver(CreateInvite),
    defaultValues: {
      roomId: "",
      email: "",
    },
  })

  const onSubmit = async (values: NewInvite) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>userId</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormDescription>This is your public userId</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>roomId</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormDescription>This is your public roomId</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export function CreateRoomForm() {
  const { userId, isSignedIn, getToken } = useAuth()
  const navigator = useRouter()
  const { toast } = useToast()
  const form = useForm<NewRoom>({
    resolver: zodResolver(CreateRoom),
    defaultValues: {
      name: "",
      topic: "",
      description: "",
      moderatorId: userId || "",
    },
  })

  const onSubmit = async (values: NewRoom) => {
    const token = await getToken()
    const response = await fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      const { id } = await response.json()
      toast({
        title: "Success.",
        description: "Your Room has been created.",
        action: (
          <ToastAction
            altText="Goto room"
            onClick={() => navigator.push(`/rooms/${id}`)}
          >
            Click here
          </ToastAction>
        ),
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Example Room"
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormDescription>The name of the room.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input
                  placeholder="Theraphy/Casual Chat/Debating"
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormDescription>The topic of the room.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This discussion is about..."
                  {...field}
                  value={field.value as string}
                />
              </FormControl>
              <FormDescription>
                The description of the room. this will be displayed on the room
                page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moderatorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moderator</FormLabel>
              <FormControl>
                <Input
                  placeholder="You will see your username if you sign in"
                  {...field}
                  value={field.value as string}
                  readOnly
                />
              </FormControl>
              <FormDescription>
                The username of the room&apos;s moderator.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSignedIn ? (
          <Button type="submit">Create</Button>
        ) : (
          <p className="max-w-[700px] text-sm text-muted-foreground sm:text-xl">
            <Button asChild className="mr-4">
              <Link href="/sign-up">Create an account</Link>
            </Button>
            or
            <Button asChild className="mx-4">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            to create a room
          </p>
        )}
      </form>
    </Form>
  )
}
