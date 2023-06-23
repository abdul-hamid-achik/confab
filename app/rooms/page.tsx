import { Room, rooms } from "@/db/schema/rooms"

import { db } from "@/lib/db"

import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Room[]> {
  return await db.select().from(rooms)
}

export default async function RoomsPage() {
  const data = await getData()

  return (
    <section className="container items-center pb-8 pt-6 md:py-10">
      <DataTable columns={columns} data={data} />
    </section>
  )
}
