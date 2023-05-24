import { CreateRoomForm } from "./form"

export default function IndexPage() {
  return (
    <section className="container grid grid-cols-2 items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="content">
        <h1 className="text-4xl font-bold">Create a room</h1>
        <p className="text-gray-500">
          Create a room to start a conversation with your friends.
        </p>
      </div>
      <CreateRoomForm />
    </section>
  )
}
