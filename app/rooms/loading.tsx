import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container p-8">
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[50px] w-full" />
    </div>
  )
}
