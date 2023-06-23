"use client"

import Link from "next/link"
import { Room } from "@/db/schema/rooms"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "topic",
    header: "Topic",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const room = row.original

      return (
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Enter</Link>
        </Button>
      )
    },
  },
]
