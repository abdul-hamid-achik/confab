import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container p-8">
      Loading...
      <Skeleton className="h-[50px] w-[200px]" />
      <Skeleton className="h-[50px] w-[200px]" />
      <Skeleton className="h-[50px] w-[200px]" />
    </div>
  )
}
